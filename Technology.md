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


### Ground Server

**Ground Server** acts as a local server that aggregates streams of sensor datas from
multiple **Water Quality Monitoring Systems** and sends it to the **AWS cloud server** via **MQTT** for
further data processing. Each Water monitoring system will have a unique id for
identification.

### Dashboard

It is the highest level client side component of the project. The **Dashboard** would be
hosted on remote server **(AWS)** with **Node.js** for the server side backend runtime
environment. Backend server side runs using **Express framework** and the frontend is
written using **HTML, Bootstrap, Javascript and EJS View Engine**. All the data
collected from the sensors would be stored in **MongoDB database**. And finally the
processed data is displayed on **Dashboard** (or possibly on a **mobile app**).

### IoT Architecture

![Arch](https://user-images.githubusercontent.com/30042823/114012356-83c8e780-9866-11eb-9456-55ee240b39e2.png)


### System Architechture

![systemArchitecture](https://user-images.githubusercontent.com/30042823/114012452-a0651f80-9866-11eb-8e6b-e027067ec300.png)

The main purpose of this IoT device is to monitor three important parameters of water i.e.
pH scale, Turbidity and Temperature. The pH and Turbidity sensors monitors the impurity
of the water. The sensor data on comparison with the old data if found impure a water
pump will be activated to add pure water in the artificial pond. From the temperature sensor
data if the temperature data is high and not moderate a signal would be sent to the
operator side which will will turn on the red LED light as a Feedback to notify the rising temperature. With the
LED turned on the operator can send a signal to the water pump to add cold water in the
artificial pond to maintain the moderate temperature. A buzzer on the operator side will be turned on in case of rise in the water impurity level.
All the data will be presented in visual form through a web based dashboard which will be hosted on the cloud platform.



### SENSORS
All the sensors are chosen according to the suitability of the project.

### DS18B20 Temperature Sensor

DS18B20 digital temperature sensor is used for measuring temperature of the water. To
keep the water in moderate temperature, old temperature data is used for calibration to
achieve moderate water temperature.

![bs18b20_temp_sensor](https://user-images.githubusercontent.com/30042823/118660716-4af42a80-b7a3-11eb-8afc-3263def674dc.jpeg)

* Stainless steel tube 6mm diameter by 30mm long
* Cable is 36" long / 91cm, 4mm diameter
* Contains DS18B20-compatible temperature sensor
* Usable temperature range: -55 to 125°C (-67°F to +257°F)
* 9 to 12 bit selectable resolution
* Uses 1-Wire interface- requires only one digital pin for communication
* Unique 64 bit ID burned into chip
* Multiple sensors can share one pin
* ±0.5°C Accuracy from -10°C to +85°C
* Temperature-limit alarm system
* Query time is less than 750ms
* Usable with 3.0V to 5.5V power/data

### Analog Turbidity Sensor

Analog Turbidity sensor is used for monitoring water impurity. An LED is used to for passing light in the water. The amount of light scattering data is used for the detection of
water impurity level. Impurity of the water is also monitored by detecting the ionised
charged present in the water.

![analog_turbidity_sensor](https://user-images.githubusercontent.com/30042823/118661220-c6ee7280-b7a3-11eb-839f-58077394a3bc.jpeg)

* Operating Voltage: 5V DC
* Operating Current: 40mA (MAX)
* Response Time: <500ms
* Insulation Resistance: 100M (Min)
* Output Method
    * Analog output: 0-4.5V
    * Digital Output: High/Low level signal (you can adjust the threshold value by adjusting the potentiometer
* Operating Temperature: 5℃~90℃
* Storage Temperature: -10℃~90℃
* Weight: 30
* Adapter Dimensions: 38mm*28mm*10mm/1.5inches *1.1inches*0.4inche

### Analog pH Sensor

User for measuring pH scale of the water.

![analog_ph_sensor](https://user-images.githubusercontent.com/30042823/118661870-614eb600-b7a4-11eb-9b3a-a313d6c5f607.jpeg)

* Module Power: 5.00V
* Module Size: 43 X 32mm (1.69x1.26”)
* Measuring Range: 0 - 14 pH
* Measuring Temperature: 0 - 60℃
* Accuracy: -+0.1pH(25℃)
* Response Time: <= 1min
* pH Sensor with BNC connector
* ph2.0 Interface (3-foot patch)
* Gain Adjustment Potentiometer
* Power LED

### ACTUATORS

### 2-Channel 5V Relay Module

Used for triggering water pump.

![2channel_relay](https://user-images.githubusercontent.com/30042823/118662929-3dd83b00-b7a5-11eb-8ba8-00f4e477054c.jpg)


* Supply voltage – 3.75V to 6V.
* Trigger current – 5mA.
* Current when relay is active - ~70mA (single), ~140mA (both)
* Relay maximum contact voltage – 250VAC, 30VDC.
* Relay maximum current – 10A.


### Submersible Water Pump DC 3V - 5V

Based on the value of Turbidity and pH sensors data, we have the knowledge about the impurity level of the water. And also with Temperature sensor we have the
temperature data. Water pump will be turned on to add pure water to maintain the
water purity and also water is also used to pump in cold water if water temperature rises.

![dc-5v-mini-submersible-water-pump](https://user-images.githubusercontent.com/30042823/118664089-074ef000-b7a6-11eb-84f5-ac1fcc432f7f.jpeg)


* Input Voltage: DC 3V-5V.
* Flow Rate: 1.2-1.6 L/min.
* Operation Temperature: 80℃.
* Operating Current: 0.1-0.2A.
* Suction Distance: 0.8 meter (Max)
* Outside diameter of water outlet: 7.5mm.
* Inside diameter of water outlet: 5.0 mm.
* Diameter of water Inlet : 5.0 mm.

### Active Buzzer 

Used as a feedback on the client side to inform the rise in the water impurity level.

![active_buzzer](https://user-images.githubusercontent.com/30042823/118664596-74628580-b7a6-11eb-99c5-72aba9e2277b.jpg)

* Rated Voltege: 5V
* Height: 9.16mm
* Diameter: 11.78mm
* Weight: 1.6g
* Operating Voltage: 4-8V
* Max Rated Current: <= 32mA
* Min. Sound Output at 10cm: 85dB
* Resonant Frequency: 2300 +- 300Hz
* Operating Temperature: -20℃ to 45℃

### LED indicator

An LED indicator will be used to provide the end user as a feedback for the rise in water
Temperature.

![red_led](https://user-images.githubusercontent.com/30042823/118665855-84c73000-b7a7-11eb-9dc1-919638343cc8.jpg)

* 1.8-2.2VDC forward drop.
* Max current: 20mA.
* Suggested using current: 16-18mA.
* Luminous Intensity: 150-200mcd.


### COMMUNICATION

### Wifi Module (ESP-01S ESP8266)

Used as communication module to get access to the internet.

![esp8266_wifi_module](https://user-images.githubusercontent.com/30042823/118666415-061ec280-b7a8-11eb-9eb1-dd00c05bd0ce.jpg)



* Processor: L106 32-bit RISC microprocessor core based on the Tensilica Xtensa Diamond Standard 106Micro running at 80 MHz.
* Memory:
    * 32 KiB instruction RAM
    * 32 KiB instruction cache RAM
    * 80 KiB user-data RAM
    * 16 KiB ETS system-data RAM
* External QSPI flash: up to 16 MiB is supported (512 KiB to 4 MiB typically included)
* IEEE 802.11 b/g/n Wi-Fi.
    * Integrated TR switch, balun, LNA, power ampli er and matching network
    * WEP or WPA/WPA2 authentication, or open network
* 17 GPIO pins.
* SPI.
* I²C (software implementation)

### MQTT Broker (AWS Core IOT)

Sensor datas are transmitted through a message broker to the IoT core through publish
method for data preprocessing.



### DEVELPOMENT BOARD


STM3 And Arduino Uno
The development board will housed upon Microcontroller STM32 and Arduino Uno for
connecting the sensor and Wi module(ESP32).

### STM32 Nucleo F401RE
Used as master node to house the Ardiuno slave nodes.

![nucleo-f401re](https://user-images.githubusercontent.com/30042823/118667634-07042400-b7a9-11eb-8978-88a8a793ff17.jpg)

* Microcontroller: STM32F401RET6 (32-bit)
* Architecture: ARM Cortex M4 CPU with FPU
* Power consumption: 2.4uA at standby without RTC
* CPU Frequency: 84 MHz
* Crystal Oscillator Range: 4 to 26 MHz
* MCU Operating Voltage (VDD): 1.7V to 3.6V
* Board Operating Voltage (VIN): 7V to 15V
* Flash Memory: 512KB
* SRAM: 96 KB
* GPIO Pins: 50
* ADC: 12-bit 16Channel
* RTC: In-built 32kHz with calibration
* Timers :
    * 16-bit (6)
    * 32-bit (2)
* Watchdog Timers: 2
* USART/UART Communication: 4
* I2C Communication: 3
* SPI Communication: 3
* USB2.0 Support: Yes
* Internal Crystal Oscillator: Yes, 16MHz
* On Board Debugger: Yes, Serial Wire and JTAG

### Arduinoi Uno R3

Used for connecting multiple sensors.

![arduino_uno_r3](https://user-images.githubusercontent.com/30042823/118669210-6b73b300-b7aa-11eb-8c57-c6e3dfde843d.jpg)

* Microcontroller: ATmega328P
* Operating Voltage: 5V
* Input Voltage (recommended): 7-12V
* Input Voltage (limit): 6-20V
* Digital I/O Pins: 14 (of which 6 provide PWM output)
* PWM Digital I/O Pins: 6
* Analog Input Pins: 6
* DC Current per I/O Pin: 20 mA
* DC Current for 3.3V Pin: 50 mA
* Flash Memory: 32 KB (ATmega328P) of which 0.5 KB used by bootloader
* SRAM: 2 KB (ATmega328P)
* EEPROM: 1 KB (ATmega328P)
* Clock Speed 	16 MHz
* LED_BUILTIN: 13
* Length: 68.6 mm
* Width: 53.4 mm
* Weight: 25 g


### UBUNTU Server

An Ubuntu server will be hosted on the AWS cloud to run the MQTT broker service and
along with Node js Server for data visualisation.

### JSON rest API

JSON rest API is used as processed dataset for visual representation.

### Web Dashboard

Web dashboard is used as platform to display the dataset in visual form. With Web
dashboard the end user can also send command back to actuators whether to take
action or not.
