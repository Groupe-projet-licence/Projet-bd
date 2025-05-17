@echo off
title Lancement des microservices Spring Boot

echo Lancement de Eureka Server...
start "" cmd /k "cd eureka-server && call mvnw spring-boot:run"

timeout /t 5
echo Lancement de API Gateway...
start "" cmd /k "cd api-gateway && call mvnw spring-boot:run"

timeout /t 5
echo Lancement de User Service...
start "" cmd /k "cd user-service && call mvnw spring-boot:run"

timeout /t 5
echo Lancement de Todo Service...
start "" cmd /k "cd todo-service && call mvnw spring-boot:run"

timeout /t 5
echo Lancement de Notification Service...
start "" cmd /k "cd notification-service && call mvnw spring-boot:run"