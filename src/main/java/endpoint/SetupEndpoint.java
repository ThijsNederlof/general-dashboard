package endpoint;

import com.google.gson.Gson;
import model.SetupModel;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Properties;

import static spark.Spark.post;

public class SetupEndpoint {

    public SetupEndpoint() {
        post("/setup", "application/json", (req, res) -> {

            SetupModel setupModel = fromJson(req.body(), SetupModel.class);

            PrintWriter writer = new PrintWriter("setup.properties", "UTF-8");
            Properties prop = new Properties();
            OutputStream output = null;

            output = new FileOutputStream("setup.properties");

            prop.setProperty("privatetoken", setupModel.getGitlabSetupPrivateToken());
            prop.setProperty("gitbaseurl", setupModel.getGitlabSetupUrl());
            prop.setProperty("api", "/api/v4/projects");
            prop.setProperty("setupcompleted", "true");

            prop.store(output, null);

            return "OK";
        });
    }

    private static <T> T  fromJson(String json, Class<T> classe) {
        return new Gson().fromJson(json, classe);
    }
}
