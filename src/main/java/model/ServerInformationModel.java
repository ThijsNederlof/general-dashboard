package model;

public class ServerInformationModel {

    private String privateToken;
    private String gitBaseUrl;
    private String api;
    private boolean setupCompleted;

    public ServerInformationModel(String privateToken, String gitBaseUrl, String api, boolean setupCompleted) {
        this.privateToken = privateToken;
        this.gitBaseUrl = gitBaseUrl;
        this.api = api;
        this.setupCompleted = setupCompleted;
    }

    public String getPrivateToken() {
        return privateToken;
    }

    public void setPrivateToken(String privateToken) {
        this.privateToken = privateToken;
    }

    public String getGitBaseUrl() {
        return gitBaseUrl;
    }

    public void setGitBaseUrl(String gitBaseUrl) {
        this.gitBaseUrl = gitBaseUrl;
    }

    public String getApi() {
        return api;
    }

    public void setApi(String api) {
        this.api = api;
    }

    public boolean isSetupCompleted() {
        return setupCompleted;
    }

    public void setSetupCompleted(boolean setupCompleted) {
        this.setupCompleted = setupCompleted;
    }
}
