package Initilization;

import java.io.*;
import java.util.Properties;

import static spark.Spark.*;

public class InitializeServer {

    public InitializeServer() {
        setPort(8080);
        setStaticFileLocation("/public");
        setEndpointPermissions();
        checkFirstTimeRunning();
    }

    private void setPort(int portNumber) {
        port(portNumber);
    }

    private void setStaticFileLocation(String location) {
        staticFiles.location(location);
    }

    private void setEndpointPermissions() {
        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            response.type("application/json");

            return "OK";
        });

        before("/*", (request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Request-Method", "*");
            response.header("Access-Control-Allow-Headers", "*");

            response.type("application/json");
        });
    }

    private void checkFirstTimeRunning() {


        File f = new File("setup.properties");
        if(!f.exists() && !f.isDirectory()) {
            System.out.println("First time running: creating setup file");

            try {
                PrintWriter writer = new PrintWriter("setup.properties", "UTF-8");
                Properties prop = new Properties();
                OutputStream output = null;

                output = new FileOutputStream("setup.properties");

                prop.setProperty("privatetoken", "");
                prop.setProperty("gitBaseurl", "");
                prop.setProperty("api", "");
                prop.setProperty("setupcompleted", "false");

                prop.store(output, null);

            } catch (IOException e) {
                System.out.println(e);
            }

        }
    }
}
