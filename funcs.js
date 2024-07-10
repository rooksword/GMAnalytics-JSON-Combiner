function addAll(keys, save_object, level_data)
{
    Object.keys(level_data).forEach(key => {
        // Check if the key exists in myStruct
        if (save_object.hasOwnProperty(key)) {
            // Push the number into the array in myStruct
            save_object[key].push(level_data[key]);
        }
    });
}

function addAverages(save_object, level_data)
{
    console.log(save_object);

    Object.keys(level_data).forEach(key => {
        // Check if the key exists in myStruct
        if (save_object.hasOwnProperty(key)) {
            // Push the number into the array in myStruct

            let level_array = save_object[key];
            
            let val = data[key];

            save_object[key].push(val);
        }
    });
}

function calculateAverages(save_object, files)
{
    Object.keys(save_object).forEach(key => {
        // Divide the value by the length to get the average
        save_object[key] = save_object[key] / files.length;
    });
}