# JS Logger

Simple JS Logger. 

* No dependency
* 2 minutes setup
* Easy to use

Allow to manage logging in Javascript browser console.   

Inspired by Log4J. 

## Usage

You have can use logger with following logging level with associated method

1. trace (default level, if configuration not set)  
Provide full stack strace
> logger.trace("my message");
2. debug
3. info
4. warn
5. error / fatal


Logging messages will be displayed in differents colors, depends on the criticity level.  
It will provide details about message origin location.  


## Disclaimer

gkjs-log provide 


## Configuration

On applicaton bootstrap, you have to provide _config global variable with following properties


```javascript

var _config = {
  /* Debug mode activation. */
  debug: true, 

  logger: {
    /** Configure log level
     * 1 : Trace
     * 2 : Debug
     * 3 : Info
     * 4 : Warn
     * 5 : Error
    **/
 	level:2, 
 	/* Display console disclaimer */
 	disclaimer: true,
 	/* Optionnal */
 	messages: {
 		appTitle: "<my-title>",
 		consoleWarning: "MyWarning"
 	}
  }
}

```
>>


## Dynamic activation

You can activate logger in production environment just by typing following instruction

> logger.activeDebugMode()

Usefull for bug analysis in production environments.


## Browser compliancy

Based on console javascript object feature

* Does not work on old browsers
* Library does not trigger any exception with old browsers which not provide console JS object.  



## License 

Free to use.  
[Apache2 License](https://www.apache.org/licenses/LICENSE-2.0)