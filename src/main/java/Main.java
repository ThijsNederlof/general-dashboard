import Initilization.InitializeServer;
import endpoint.ServerInformationEndpoint;
import endpoint.SetupEndpoint;

public class Main {

    public static void main(String[] args) {
        initializeServer();
        setUpEndpoints();
    }

    private static void initializeServer() {
        InitializeServer serverInitializer = new InitializeServer();
    }

    private static void setUpEndpoints() {
        ServerInformationEndpoint serverInformationEndpoint = new ServerInformationEndpoint();
        SetupEndpoint setupEndpoint = new SetupEndpoint();
    }

}
