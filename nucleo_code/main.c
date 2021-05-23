#include <stdio.h>
#include <inttypes.h>

#include "board.h"
#include "ds18.h"
#include "ds18_params.h"
#include "xtimer.h"
#include "thread.h"
#include "periph/adc.h"
#include "periph/gpio.h"
#include "analog_util.h"

// define global variables
#define SAMPLING_PERIOD 			0.100
#define ADC_IN_USE                  ADC_LINE(1)
#define ADC_RES                     ADC_RES_12BIT

#define DELAY                       (100LU * US_PER_MS) /* 100 ms */

int main(void)
{
    ds18_t dev;
    int result;

    puts("RIOT Water Quality Measuring Application\n"
		 "-Measure Teperature of the water with DS18B20 Temperature sensor\n"
		 "-Measure pH Scale of the water with Analog pH Sensor\n"
		 "-Measure Turbidity of the water with Analog Turbidity Sensor\n"
		 "-All the sensors are connected to the Analog input of STM32 Nucleo-64 board\n"
		 "The sensor is sampled through the ADC lines once every 100ms\n"
        "with a 12-bit resolution and print the sampled results to STDIO\n");

	
	

    printf("+------------Initializing------------+\n");
    result = ds18_init(&dev, &ds18_params[0]);
    if (result == DS18_ERROR) {
        puts("[Error] The sensor pin could not be initialized");
        return 1;
    }

	/* initialize the ADC line */
    if (adc_init(ADC_IN_USE) < 0) {
        printf("Initialization of ADC_LINE(%u) failed\n", ADC_IN_USE);
        return 1;
    }
    else {
        printf("Successfully initialized ADC_LINE(%u)\n", ADC_IN_USE);
    }


	xtimer_ticks32_t last = xtimer_now();
    int sensorValue = 0;
    float phValue = 0;

    printf("\n+--------Starting Measurements--------+\n");
    while (1) {

		int16_t temperature;
		sensorValue = adc_sample(ADC_IN_USE, ADC_RES);
        phValue = adc_util_mapf(sensorValue, ADC_RES, 0, 14);


		// ########## Temperature Data Section ##############
        

        /* Get temperature in centidegrees celsius */
        if (ds18_get_temperature(&dev, &temperature) == DS18_OK) {
            bool negative = (temperature < 0);
            if (negative) {
                temperature = -temperature;
            }

            printf("Temperature [ºC]: %c%d.%02d"
                   "\n+-------------------------------------+\n",
                   negative ? '-': ' ',
                   temperature / 100,
                   temperature % 100);
        }
        else {
            puts("[Error] Could not read temperature");
        }

        xtimer_sleep(SAMPLING_PERIOD);
		

		// ########### pH Data Section ##############
		if (sensorValue < 0) {
            printf("ADC_LINE(%u): selected resolution not applicable\n",
                   ADC_IN_USE);
        }
        else {
            // printf("ph Reading: %f\n",phValue);
            printf("ADC_LINE(%u): pH Reading: %f\n", ADC_IN_USE, phValue);
        }

        xtimer_periodic_wakeup(&last, DELAY);
		
    }

    return 0;
}