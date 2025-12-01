# Build stage
FROM eclipse-temurin:17-jdk as build
WORKDIR /app

# Install Maven manually (best practice since maven:3.8.5-openjdk-17 is deprecated)
RUN apt-get update && apt-get install -y maven

COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
