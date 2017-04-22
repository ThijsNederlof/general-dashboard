FROM java:8u111-jre-alpine

ADD https://github.com/ThijsNederlof/general-dashboard/releases/download/v1.0.1/general-dashboard-1.0.1.jar /root/

EXPOSE 8080

ENTRYPOINT cd /root && java -jar general-dashboard-1.0.jar