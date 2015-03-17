# Wappbot
If you feel alone and sad, Wappbot is the solution, he will be your best friend just need to add him to your whatsapp.
 ```sh
Wappbot-public: 573174712237 (add me <WhatsApp contact>, I am hot)
```
##How does this shit work?
Wappbot is a cleverbot connecting with whatsapp through of [yowsup][1].
[1]:https://github.com/tgalal/yowsup
<img src="http://2.bp.blogspot.com/-dxX69Nuak4A/VQed01vEELI/AAAAAAAAAO8/jCVJKubSIJ4/s1600/Screen%2BShot%2B2015-03-16%2Bat%2B10.22.05%2BPM.png" />

## Do you want to run this in your toaster?
#####1. Requires
 - python2.6+, or python3.0+
 - nodejs 0.10+
 -  2 beers.
 
 

#####2. Install
```sh
$ git clone https://github.com/JavaGarcia/Wappbot.git
$ cd Wappbot
$ sudo python setup.py install
$ npm install
```
#####3. Register number
```sh
$ yowsup-cli registration --requestcode sms --phone [codeCountryNumberphone] --cc [codeCountry] --mcc [mobileCountryCode] --mnc [networkCountryCode]
$ yowsup-cli registration --register [xxx-xxx] --phone [codeCountryNumberphone] --cc [codeCountry]
```
#####4. Edit file config and put the values such: code country, number and password (look the example)
```sh
nano config
```
#####5. Let's go!
```sh
node app.js
```



### Made with love in Colombia.
# License:

Wappbot is licensed under the GPLv3: http://www.gnu.org/licenses/gpl-3.0.html. 

