ProjectScreenshots folder contains video and photos
ProjectReport contains .pdf report


How to run?

1. Open frontend folder in IDEA like WebStorm or in terminal. Write npm install or yarn install.

2. Open backend and install all maven dependencies.

3. Now run .sql script to create database in folder DB. 

4. Open backend/src/main/resources/application.properties and adjust data to your DB.
   Namely those fields: datasource.url, datasource.username, datasource.password

5. Now you if you connected and installed everything correclty you already may try to run
project, as I included target files. Run it in IDEA or in 
terminal java -jar backend/target/backend-1.0.0-SNAPSHOT.jar

6. If it does not run, then unfortunately you have to build project.
6.1 Go to 'cd parent' folder in terminal and write 'mvn clean install'
6.2 If you do not have mvn command, then install it here https://maven.apache.org/install.html

