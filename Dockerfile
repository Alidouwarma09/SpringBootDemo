# ====== ÉTAPE 1 : build ======
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copier les fichiers Maven
COPY pom.xml .
COPY src ./src

# Compiler l'application
RUN mvn clean package -DskipTests

# ====== ÉTAPE 2 : runtime ======
FROM eclipse-temurin:17-jdk-focal
WORKDIR /app

# Copier le jar depuis l'étape de build
COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
