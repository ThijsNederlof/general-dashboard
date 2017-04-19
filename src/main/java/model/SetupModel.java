package model;

public class SetupModel {

    private String gitlabSetupPrivateToken;
    private String gitlabSetupUrl;
    private String api;
    private boolean setupCompleted;

    public SetupModel(String gitlabSetupPrivateToken, String gitlabSetupUrl, String api, boolean setupCompleted) {
        this.gitlabSetupPrivateToken = gitlabSetupPrivateToken;
        this.gitlabSetupUrl = gitlabSetupUrl;
        this.api = api;
        this.setupCompleted = setupCompleted;
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

    public String getGitlabSetupPrivateToken() {
        return gitlabSetupPrivateToken;
    }

    public void setGitlabSetupPrivateToken(String gitlabSetupPrivateToken) {
        this.gitlabSetupPrivateToken = gitlabSetupPrivateToken;
    }

    public String getGitlabSetupUrl() {
        return gitlabSetupUrl;
    }

    public void setGitlabSetupUrl(String gitlabSetupUrl) {
        this.gitlabSetupUrl = gitlabSetupUrl;
    }
}
