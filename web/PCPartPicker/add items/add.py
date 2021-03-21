#Manufactor webpages:
#https://www.intel.com/content/www/us/en/products/processors/xeon/scalable/platinum-processors/platinum-8180.html
#https://www.intel.com/content/www/us/en/products/processors/core/i7-processors/i7-8700.html

url = "https://www.intel.com/content/www/us/en/products/processors/core/i7-processors/i7-8700.html"

#MANUFACTURER
# if url contains then:


{
"MANUFACTURER"                  :   ["AMD" if "amd.com" in url else "Intel" if "intel.com" in url else None][0],
"PART #"                        :
"DATA WIDTH"                    :
"SOCKET"                        :
"OPERATING FREQUENCY"           :
"MAX TURBO FREQUENCY"           :
"CORES"                         :
"L1 CACHE"                      :
"L2 CACHE"                      :
"L3 CACHE"                      :
"LITHOGRAPHY"                   :       
"THERMAL DESIGN POWER"          :
"INCLUDES CPU COOLER"           :
"SIMULTANEOUS MULTITHREADING"   :
"MAXIMUM SUPPORTED MEMORY"      :
"INTEGRATED GRAPHICS"           :
}
