# Microservices
## Purpose
Illustrate the use of the strangler pattern in moving behaviour from a monolith to a microservice architecture

## Setup instructions
1. Install docker
2. Run `docker-compose up`

## Using the app
Navigate to http://localhost/{users/products/catalog}

## Modifying reverse proxy
Modify nginx.conf to stangle monolith services and redirect traffic to individual microservices
```
http {
  server {
    server_name localhost;

    # Microservices
...
    location /products {
      proxy_pass http://serviceb:4000;
    }
...

    # Monolith
...
    # location /products {
    #   proxy_pass http://monolith:4000;
    # }

  }
}
```
