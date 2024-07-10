function generateData(generateAverage)
{
    var inp = document.getElementById("get-files");
    const files = inp.files;

    let filesProcessed = 0; // How many files processed
    let filesLength = files.length; // Amount of files to process

    if (filesLength === 0) // If amount of files is equal to 0
    {
        console.log('No files selected');
        return;
    }

    let keys = -1;
    let save_object = {};

    for (let i = 0; i < filesLength; i++) // Iterate through all files
    {
        const file = files[i]; // Current file

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
                
                let name = file.name;

                if (!generateAverage) save_object[name] = {};        

                if (keys == -1)
                {
                    keys = Object.keys(data[0]);

                    if (generateAverage)
                    {
                        keys.forEach(str => {
                            // Add each string as a key with an empty array as its value
                            save_object[str] = [];
                        });
                    }

                    console.log("Keys initialized");
                }

                if (!generateAverage)
                {
                    keys.forEach(str => {
                        // Add each string as a key with an empty array as its value
                        save_object[name][str] = [];
                    });
                }

                // Process data here (calculate average, etc.)

                let dataLength = data.length;
                for (let j = 0; j < dataLength; j++)
                {
                    let level_data = data[j];

                    if (generateAverage) addAverages(keys, save_object, level_data);
                    else addAll(keys, save_object[name], level_data);
                }

                console.log(save_object)

                filesProcessed++;
                
                // if (filesProcessed === files.length)
                // {
                //     if (generateAverage) calculateAverages(save_object, files);

                //     // Convert JSON object to a Blob
                //     const blob = new Blob([JSON.stringify(save_object, null, 2)], { type: 'application/json' });

                //     // Create a URL for the Blob
                //     const url = URL.createObjectURL(blob);

                //     // Create a link element to trigger the download
                //     const a = document.createElement('a');
                //     a.href = url;
                //     if (generateAverage) a.download = 'data_average.json';
                //     else a.download = 'data_all.json';
                //     document.body.appendChild(a); // Append the link to the body
                //     a.click(); // Simulate a click to trigger the download

                //     // Clean up: remove the link and revoke the URL object
                //     document.body.removeChild(a);
                //     URL.revokeObjectURL(url);
                // }
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