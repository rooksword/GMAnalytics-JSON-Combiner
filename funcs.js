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