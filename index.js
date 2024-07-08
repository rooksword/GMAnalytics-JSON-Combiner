function processFiles()
{
    var inp = document.getElementById("get-files");
    const files = inp.files;

    let time_to_beat = [];
    let deaths = [];

    let filesProcessed = 0;
    let filesLength = files.length;

    if (filesLength === 0)
    {
        console.log('No files selected');
        return;
    }

    for (let i = 0; i < filesLength; i++)
    {
        const file = files[i];
        console.log(`File name: ${file.name}, Size: ${file.size} bytes`);

        // Example: Read file content (assuming it's JSON)
        const reader = new FileReader();
        reader.onload = function(event)
        {
            let content = event.target.result;
            if (content.endsWith('\0')) {
                content = content.slice(0, -1);
            }
            try {
                const data = JSON.parse(content);
                // Process data here (calculate average, etc.)

                let dataLength = data.length;
                for (let j = 0; j < dataLength; j++)
                {
                    if (time_to_beat.length < data.length)
                    {
                        time_to_beat.push(data[j].time_to_beat);
                        deaths.push(data[j].deaths);
                    }
                    else
                    {
                        time_to_beat[j] += data[j].time_to_beat;
                        deaths[j] += data[j].deaths;
                    }
                }

                filesProcessed++;
                
                if (filesProcessed === files.length)
                {
                    let time_to_beatLength = time_to_beat.length;
                    for (let i = 0; i < time_to_beatLength; i++)
                    {
                        time_to_beat[i] /= files.length;
                        deaths[i] /= files.length;
                    }

                    console.log(time_to_beat);
                    console.log(deaths);

                    // Create a JSON object with the average
                    const averageObject = { time_to_beat, deaths };

                    // Convert JSON object to a Blob
                    const blob = new Blob([JSON.stringify(averageObject, null, 2)], { type: 'application/json' });

                    // Create a URL for the Blob
                    const url = URL.createObjectURL(blob);

                    // Create a link element to trigger the download
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'average.json';
                    document.body.appendChild(a); // Append the link to the body
                    a.click(); // Simulate a click to trigger the download

                    // Clean up: remove the link and revoke the URL object
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }
            }
            catch (error)
            {
                console.error(`Error parsing JSON from ${file.name}:`, error);
                filesProcessed++;
            }
        };
        reader.readAsText(file);
    }
}