#include <stdio.h>

#include "periph_conf.h"
#include "periph/i2c.h"
#include "xtimer.h"
#include "thread.h"
#include "mutex.h"

//define I2C parameters
#define I2C_INTERFACE I2C_DEV(0)
#define ARDUINO_ADDRESS (0x04)

//define command number and buffer size
#define TEMP_BUFFER_SIZE 24
#define TEMP_CMD 1


//define mutex to protect i2c access
mutex_t mutex;



void I2CCommunication(int cmd,void*buffer,int len,char* service)
{
		
		while(i2c_acquire(I2C_INTERFACE)<0)
			printf("[%s]ERROR ACQUIRING \n",service);
		if(i2c_write_byte(I2C_INTERFACE,ARDUINO_ADDRESS,cmd,0)<0)
			printf("[%s] ERROR WRTITING \n",service);
		if(i2c_read_bytes(I2C_INTERFACE,ARDUINO_ADDRESS,buffer,len,0)<0)
			printf("[%s] READING \n",service);
		i2c_release(I2C_INTERFACE);
		
		
}



int main(void){
	printf("Welcome to test\n");

    // initialize the i2c protocol
    i2c_init(I2C_INTERFACE);
	
	char buffer[TEMP_BUFFER_SIZE]={0};
	while(1){
		I2CCommunication(TEMP_CMD,buffer,TEMP_BUFFER_SIZE,"TEMPERATURE");
		printf("[TEMPERATURE] %s\n",buffer);
		xtimer_sleep(5000);
	}
    
	return 0;
    
}