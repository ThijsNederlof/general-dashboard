package endpoint;

import com.google.gson.Gson;
import model.ServerInformationModel;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Objects;
import java.util.Properties;

import static spark.Spark.get;

public class ServerInformationEndpoint {

    public ServerInformationEndpoint() {
        get("/serverinformation", "application/json", (req, res) -> {
            Properties prop = new Properties();
            InputStream input = null;

            input = new FileInputStream("setup.properties");
            prop.load(input);

            ServerInformationModel serverInformationModel = null;
            if(Objects.equals(prop.getProperty("setupcompleted"), "false")) {
                serverInformationModel = new ServerInformationModel("", "", "", false);
            } else {
                serverInformationModel = new ServerInformationModel(prop.getProperty("privatetoken"), prop.getProperty("gitbaseurl"), prop.getProperty("api"), true);

            }

            String jsonResponse;
            return jsonResponse = new Gson().toJson(serverInformationModel);
        });
    }
}
