package main

import (
    "encoding/json"
    "fmt"
    "net/http"

    "github.com/gorilla/handlers"
    "github.com/gorilla/mux"
    "github.com/dgrijalva/jwt-go"
)

// JWTの署名キー
var jwtKey = []byte("secret_key")

// User 構造体
type User struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

// JWTのペイロードに含まれる情報を定義する構造体
type Claims struct {
    Username string `json:"username"`
    jwt.StandardClaims
}

// ユーザ情報を保存するためのマップ
var users = map[string]string{
    "user1": "password1",
    "user2": "password2",
}

// ユーザ登録API
func registerHandler(w http.ResponseWriter, r *http.Request) {
    var user User
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    users[user.Username] = user.Password
    fmt.Fprintf(w, "Registered successfully")
}

// ログインAPI
func loginHandler(w http.ResponseWriter, r *http.Request) {
    var user User
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    password, ok := users[user.Username]
    if !ok || password != user.Password {
        http.Error(w, "Invalid username or password", http.StatusUnauthorized)
        return
    }
    claims := &Claims{
        Username: user.Username,
        StandardClaims: jwt.StandardClaims{},
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        http.Error(w, "Failed to generate token", http.StatusInternalServerError)
        return
    }
    fmt.Fprintf(w, tokenString)
}

// ログアウトAPI
func logoutHandler(w http.ResponseWriter, r *http.Request) {
    // 何もしない
    fmt.Fprintf(w, "Logged out successfully")
}

// JWT認証を行うミドルウェア
func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            http.Error(w, "Authorization header is required", http.StatusUnauthorized)
            return
        }
        tokenString := authHeader[len("Bearer "):]
        claims := &Claims{}
        token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fmt.Errorf("unexpected signing method")
            }
            return jwtKey, nil
        })
        if err != nil || !token.Valid {
            http.Error(w, "Invalid token", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    }
}

func main() {
    r := mux.NewRouter()

    corsMiddleware := handlers.CORS(
        handlers.AllowedOrigins([]string{"http://localhost:3000"}),
        handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
        handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
    )

    r.HandleFunc("/register", registerHandler).Methods("POST")
		// ログインAPIには認証が不要
		r.HandleFunc("/login", loginHandler).Methods("POST")
		// ログアウトAPIには認証が必要
		r.HandleFunc("/logout", authMiddleware(logoutHandler)).Methods("POST")

		// サーバーを起動
		http.ListenAndServe(":8000", corsMiddleware(r))
}
