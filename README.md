# About
Bias in Linked open Data (BLinD) is a prototype from the REVEAL project http://revealproject.eu/ created by the University of Southampton IT Innovation Centre http://www.it-innovation.soton.ac.uk/

It is a dashboard with which the users (specifically journalists) can quickly gauge the bias of any resource in Wikipedia.
It contains D3.js visualisations and very simple markup and styling.
The data sources are [DBpedia](https://wiki.dbpedia.org/)'s and [Wikidata](https://www.wikidata.org/)'s SPARQL endpoints.

![BLinD screenshot](/images/screenshots/overview.png)
The overview uses a word cloud to visualise terms related to the entity, using a "heat scale" colour coding, i.e. red terms occur more often while blue terms don't.

# Usage
(1) Download the archive (click the green github "Clone or download" and then select "Download ZIP"). Unzip the package into any folder.

(2) Double click the index.html file after unzipping to open it in a browser (Chrome or Firefox on Linux or Mac supported, others configurations may work but are untested)

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

Copyright (c) 2016, University of Southampton IT Innovation Centre
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.

3. All advertising and publication materials containing results from the use of this dataset
   must acknowledge the University of Southampton IT Innovation Centre

4. Neither the name of the University of Southampton IT Innovation Centre nor the
   names of its contributors may be used to endorse or promote products
   derived from this dataset without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY University of Southampton IT Innovation Centre ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL University of Southampton IT Innovation Centre BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
