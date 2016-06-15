piFile = file('pi.txt' , 'r')
pi = piFile.read()
piFile.close()

print 'Read Pi'

#get rid of non number digits
junk = '{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf360{\fonttbl\f0\fmodern\fcharset0 Courier;}{\colortbl;\red255\green255\blue255;}\margl1440\margr1440\vieww9000\viewh8400\viewkind0\deftab720\pard\pardeftab720\ql\qnatural\f0\fs24 \cf0 '
delete = len(junk)+20
pi = pi[delete:]
numbers = ['1','2','3','4','5','6','7','8','9','0']
n = 1
piSplit = [pi[i:i+n] for i in range(0, len(pi), n)]
for item in piSplit:
	if item not in numbers:
		piSplit.pop(piSplit.index(str(item)))
	else:
		pass

print 'Cleaned Pi From Nonsense'

#reset pi and then add it back together with only numbers
pi = ''
for item in piSplit:
	pi += item

print 'Reset Pi into string'

#split every 6 digits of pi
n = 6
piSplit = [pi[i:i+n] for i in range(0, len(pi), n)]

print 'Divided Pi into six'

#cut array to make file smaller to the number of pixels
pixels = 8000
piSplit[pixels:len(piSplit)] = []

print 'Cut Pi Array to Size'

#write text to HTML file "w" means erase contents
piHTML = open("divs.html", "w")
for item in piSplit:
	piHTML.write('<div style="background:#'+str(item)+'" onmouseover="colorNumber(\''+str(item)+'\')"></div>')
piHTML.close()

print 'Saved HTML File'
