FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Copy the JAR file from the build stage to the container
COPY --from=build /app/target/booking-doctor-api.jar booking-doctor-api.jar

# Expose the port your application runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "booking-doctor-api.jar"]
