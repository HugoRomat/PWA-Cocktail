#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

const char *ssid = "AC-ESP8266";
const char *password = "987654321";

IPAddress local_IP(192,168,1,1);
IPAddress gateway(192,168,1,1);
IPAddress subnet(255,255,255,0);
ESP8266WebServer server(80);


void setup()
{
  Serial.begin(115200);
  Serial.println();

  Serial.print("Setting soft-AP configuration ... ");
  Serial.println(WiFi.softAPConfig(local_IP, gateway, subnet) ? "Ready" : "Failed!");

  Serial.print("Setting soft-AP ... ");
  Serial.println(WiFi.softAP(ssid,password) ? "Ready" : "Failed!");
  //WiFi.softAP(ssid);
  //WiFi.softAP(ssid, password, channel, hidden, max_connection)
  
  Serial.print("Soft-AP IP address = ");
  Serial.println(WiFi.softAPIP());

  server.on("/", handle_OnConnect);
  
  server.on("/cocktail", HTTP_GET, [](AsyncWebServerRequest *request){
      if (request->args() == 0) // no arguments attached -> STATUS_BAD_REQUEST
          return request->send(400, "text/plain", F("ERROR: Bad or no arguments"));
     uint8_t dhtSensor = request->arg("cocktailName").toInt(); 
     request->send(200, "text/plain", readDSTemperature(dhtSensor).c_str());
 });

  server.begin();
}

void loop() {
  Serial.print("[Server Connected] ");
  Serial.println(WiFi.softAPIP());
  server.handleClient();
  delay(500);
}

void readDSTemperature(uint8_t sensorNumber){

  Serial.println(sensorNumber);
//  switch(sensorNumber){
//      case 1:
//          Serial.println("Someonte has connected");
//          break;
//      ....        
//      }
   }

void handle_OnConnect() {
  Serial.println("Someonte has connected");
  server.send(200, "text/plain", "OK"); 
}
