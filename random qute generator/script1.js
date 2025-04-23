const quotes = [
    "A rose by any other name would smell as sweet.	-William Shakespeare",
"All that glitters is not gold.	-William Shakespeare",
"All the world’s a stage, and all the men and women merely players.-William Shakespeare",
"Ask not what your country can do for you; ask what you can do for your country.	-John Kennedy",	
"Ask, and it shall be given you; seek, and you shall find.	-the Bible",	
"Eighty percent of success is showing up.	-Woody Allen",	
"Elementary, my dear Watson.	-Sherlock Holmes (character)",	
"For those to whom much is given, much is required.	-the Bible",	
"Frankly, my dear, I don't give a damn.	-Rhett Butler (character)",	
"Genius is one percent inspiration and ninety-nine percent perspiration.	-Thomas Edison",	
"Go ahead, make my day.	-Harry Callahan (character)",	
"He travels the fastest who travels alone.	-Rudyard Kipling",	
"Hell has no fury like a woman scorned.	-William Congreve",	
"Hell is other people.	-Jean-Paul Sartre",	
"Here's looking at you, kid.	-Rick Blaine (character)",	
"Houston, we have a problem.	-Jim Lovell (character)",	
"I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.	-Martin Luther King",	
"I have always depended on the kindness of strangers.	-Blanche Dubois (character)",	
"I love the smell of napalm in the morning.	-Lt. Kilgore (character)",	
"I think therefore I am.	-Rene Descartes	French",

];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

document.getElementById('new-quote').addEventListener('click', function() {
    const quote = getRandomQuote();
    document.getElementById('quote').innerText = quote;
});