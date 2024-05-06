# Use a Maven image for building
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JDK image for runtime
FROM openjdk:17.0.1-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build stage to the container
COPY --from=build /app/target/booking-doctor-api.jar booking-doctor-api.jar

# Expose the port your application runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "booking-doctor-api.jar"]
