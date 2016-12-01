# About
Bias in Linked open Data (BLinD) is a prototype from the REVEAL project http://revealproject.eu/ created by the University of Southampton IT Innovation Centre http://www.it-innovation.soton.ac.uk/

It is a dashboard with which the users (specifically journalists) can quickly gauge the bias of any resource in Wikipedia.
It contains D3.js visualisations and very simple markup and styling.
The data sources are [DBpedia](https://wiki.dbpedia.org/)'s and [Wikidata](https://www.wikidata.org/)'s SPARQL endpoints.

![BLinD screenshot](/images/screenshots/overview.png)
The overview uses a word cloud to visualise terms related to the entity, using a "heat scale" colour coding, i.e. red terms occur more often while blue terms don't.

# Usage
(1) Unzip package into a folder <install-dir> 
(2) Open Chrome (Linux or Mac supported, others configurations may work but are untested)
(3) Open URI file:///<install-dir>/index.html
(4) Enter a name and click 'find bias' (e.g. 'Donald Trump') - note that it's case-sensitive
- you can find an entity's URI through Wikipedia. Names are typically are capitalized and use an underscores rather than spaces, e.g. Bernie_Sanders
- hover on tag cloud words to see the DBpedia linked data that connects this word to the selected person
- click on tag cloud words to open DBpedia linked data in the web browser as a separate tab
- you can filter the results based on their origin:
  * "select everything" will show you all data
  * "self" will show you information directly associated with this entity
  * "list" wil give you all the Wikipedia categories that this entity appears in
  * "network" will give you information retrieved via other entities that this entity is connected to
- There are various visualisation options to choose from
  * The bar chart sorts all discovered terms by frequency ![BLinD bar chart](/images/screenshots/bar.png)
  * The pie chart is an alternative to the bar chart ![BLinD pie chart](/images/screenshots/pie.png)
  * The graph view shows how this entity is connected to religious or political views via other entities. You can expand the graph bit by bit to discover connections you were previously unaware of.![BLinD graph view](/images/screenshots/graph.png)

(5) Read the DBpedia evidence and come to your own informed decision about the selected persons potential biases








# License
BSD (included in release archive)
