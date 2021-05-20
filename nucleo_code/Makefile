# name of the application
APPLICATION = water-quality-monitoring-system

# if no board is specified in the environment, use this default
BOARD ?= nucleo-f401re

# absolute path to the RIOT base directory
RIOTBASE ?= $(CURDIR)/../../../../RIOT

# development process
DEVELHELP ?= 1

# Change this to 0 show compiler invocation lines by default:
QUIET ?= 1

# modules to include
USEMODULE += xtimer
USEMODULE += analog_util
USEMODULE += periph_gpio
FEATURES_REQUIRED += periph_i2c


include $(RIOTBASE)/Makefile.include

FEATURES_OPTIONAL += periph_rtc









