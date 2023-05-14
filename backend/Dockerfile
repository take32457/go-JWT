FROM golang:1.20

WORKDIR /app

COPY . .

ENV CGO_ENABLED=0
RUN go build -o main -ldflags="-s -w" ./main.go

EXPOSE 8000
CMD ["go", "run", "./main.go"]