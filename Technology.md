# Technology

## Main Core Parts
* Water Quality Monitoring System
* Ground Server
* Dashboard

### Water Quality Monitoring System

**Water Quality Monitoring System** is the main component of the project. The main purpose of
this system is to collect data from the sensors placed in the remotely placed artificial
pond and send it through the **Ground Server** to the cloud server and then take actions by
sending commands to the actuators. A **Temperature sensor (DS18B20 sensor)** is used for
collecting water temperature data. An **Analog Turbidity Sensor** is used for monitoring
water impurity. An LED is used for passing light in the water. The amount of light
scattering data is used for the detection of water impurity level. Impurity of the water is
also monitored by detecting the ionised charged present in the water. **An Analog pH Sensor** is also used for measuring acidity level of the water. Two water pumps are used in
this system, one for pumping in cold water when the water temperature rises above
optimal temperature and the other one for pumping out impure water to maintain an
optimal water quality. For testing purpose a **Wifi module (ESP8266)** would be used for
transmitting data but in real life scenario **LoraWan module** to be used instead. The
sensors are controlled by **Nucleo Board (nucleo-f401re)** with **RIOT OS**, and
measurements are made using **Arduino Uno R3** board as the integration of sensors are
much easier with Arduino uno board. The communication between the boards is done
through **I2C protocol**: the Nucleo board is the **master**, it periodically asks for sensor data
to the Arduino Uno, which is the **slave**.
## Architecture

![Arch](https://user-images.githubusercontent.com/30042823/114012356-83c8e780-9866-11eb-9456-55ee240b39e2.png)

The main purpose of the device is to monitor three important parameters of water i.e.
pH scale, Turbidity and Temperature. The pH and Turbidity sensors monitors the impurity
of the water. The sensor data on comparison with the old data if found impure a water
pump will be activated to add pure water in the sh cage. From the temperature sensor
data if the temperature data is high and not moderate a signal would be sent to the
operator side which will will turn on the LED light to notify the rising temperature. With the
LED turned on the operator can send a signal to the water pump to add cold water in the
sh cage to maintain the moderate temperature. All the datas will be presented in visual
form through a web based dashboard which will hosted on the cloud platform.

## System Architechture

![systemArchitecture](https://user-images.githubusercontent.com/30042823/114012452-a0651f80-9866-11eb-8e6b-e027067ec300.png)

### MQTT Broker (AWS Core IOT)

Sensor datas are transmitted through a message broker to the IoT core through publish
method for data preprocessing.

### Lambda Function

AWS lambda function allows us to write functions (e.g. in python) to process the data
without setting up a server.

### AWS S3 Bucket

S3 bucket is used for storing data. The data is either stored in raw format or json format.

### DEVELPOMENT BOARD

STM3 And Arduino Uno
The development board will housed upon Microcontroller STM32 and Arduino Uno for
connecting the sensor and Wi module(ESP32).

## SENSORS

### Waterproof DS18B20 Digital temperature Sensor

DS18B20 digital temperature sensor is used for measuring temperature of the water. To
keep the water in moderate temperature, old temperature data is used for calibration to
achieve moderate water temperature.
Analog data - CelsiusAnalog Turbidity Sensor

### Analog Turbidity sensor is used for monitoring water impurity. An LED is used to for

passing light in the water. The amount of light scattering data is used for the detection of
water impurity level. Impurity of the water is also monitored by detecting the ionised
charged present in the water.

### Analog pH Sensor

With analog pH sensor the acidity level of the water is measured.

## ACTUATORS

### Water pump

Based on the value of Turbidity and pH sensors data, we have the knowledge to nd out
whether the water is polluted or not. And also with Temperature sensor we have the
temperature data. Water pump will be turned o /on to add pure water to maintain the
water purity and also water is also used to pump in cold water if water temperature rises.

### LED indicator

An LED indicator will be used to provide the end user as a feedback for the water
characteristic whether to take actions of not.

## CLOUD SERVICE

### UBUNTU Server

An Ubuntu server will be hosted on the AWS cloud to run the MQTT broker service and
along with Node js Server for data visualisation.

### JSON rest API

JSON rest API is used as processed dataset for visual representation.

### Web Dashboard

Web dashboard is used as platform to display the dataset in visual form. With Web
dashboard the end user can also send command back to actuators whether to take
action or not.
