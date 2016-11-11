# About
Bias in Linked open Data (BLinD) is a prototype from the REVEAL project http://revealproject.eu/ created by the University of Southampton IT Innovation Centre http://www.it-innovation.soton.ac.uk/

It is a dashboard with which the users (specifically journalists) can quickly gauge the bias of any resource in Wikipedia.
It contains D3.js visualisations and very simple markup and styling.
The data sources are DBPedia's and Wikidata's SPARQL endpoints.

# Usage
(1) Unzip package into a folder <install-dir> 
(2) Open Chrome (Linux or Mac supported, others configurations may work but are untested)
(3) Open URI file:///<install-dir>/index.html
(4) Enter a name and click 'find bias' (e.g. 'Donald Trump')
- names should appear in Wikipedia. You can Google a name to find the Wikipedoa version of it. Names typically are capitalized and use an underscores rather than spaces, e.g. Bernie_Sanders
- select everything, , graph, list or network
- hover on tag cloud words to see the DBpedia linked data that connects this word to the selected person
- click on tag cloud words to open DBpedia linked data in the web browser as a separate tab
(5) Read the DBpedia evidence and come to your own informed decision about the selected persons potential biases

# License
BSD (included in release archive)
