
FROM openjdk:17  AS builder4backend
WORKDIR /opt/app/backend
COPY ./toolbox-backend/.mvn/ .mvn
COPY ./toolbox-backend/mvnw ./toolbox-backend/pom.xml ./
RUN ./mvnw dependency:go-offline
COPY ./toolbox-backend/src ./src
RUN ./mvnw clean install


FROM node:20 AS builder4frontend
WORKDIR /opt/app/frontend
COPY ./toolbox-frontend/ ./
# RUN npm install
RUN npm run build


FROM openjdk:17  AS final
WORKDIR /opt/app
RUN mkdir ./upload
COPY --from=builder4backend /opt/app/backend/target/*.jar ./*.jar
COPY --from=builder4frontend /opt/app/frontend/dist/ /opt/app/web/

ENTRYPOINT ["java", "-jar", "/opt/app/*.jar"]
