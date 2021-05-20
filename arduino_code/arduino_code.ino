/********************************************************************/
// First we include the libraries
#include <OneWire.h> 
#include <DallasTemperature.h>
#include <Wire.h>
/********************************************************************/
// Data wire is plugged into pin 2 on the Arduino 
#define ONE_WIRE_BUS 2 

/********************************************************************/
// Setup a oneWire instance to communicate with any OneWire devices  
// (not just Maxim/Dallas temperature ICs) 
OneWire oneWire(ONE_WIRE_BUS); 
/********************************************************************/
// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);
/********************************************************************/ 
void setup(void) 
{ 
  Wire.begin(0x04); 
 // start serial port 
 Serial.begin(9600);
 Serial.println("Dallas Temperature IC Control Library Demo"); 
 // Start up the library 
 sensors.begin(); 
 Wire.onRequest(requestEvent);
} 
void loop(void) 
{ 
 // call sensors.requestTemperatures() to issue a global temperature 
 // request to all devices on the bus 
/********************************************************************/
 Serial.print(" Requesting temperatures..."); 
 sensors.requestTemperatures(); // Send the command to get temperature readings 
 Serial.println("DONE"); 
/********************************************************************/
 Serial.print("Temperature is: "); 
 Serial.print(sensors.getTempCByIndex(0)); // Why "byIndex"?  
   // You can have more than one DS18B20 on the same bus.  
   // 0 refers to the first IC on the wire
 Serial.print(" deg C"); 
   delay(100); 
} 

// function to convert float to string
String floatToString(float val, int precision){
  String buf;
  buf += String(val, precision);

  return buf;
}

// function that executes whenever data is requested by the master
// this function is registered as an event, see setup()
void requestEvent(){

String tem = "";
tem += "Temperature is : ";
tem += floatToString(sensors.getTempCByIndex(0),2);
tem += " deg C";
  
//Wire.write(floatToString(sensors.getTempCByIndex(0),2).c_str());
//Serial.print(floatToString(sensors.getTempCByIndex(0),2).c_str());
Wire.write(tem.c_str());

}
