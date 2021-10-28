status = "";
objects = [];
alert = "";

function preload()
{
    alert = loadSound('alert.mp3');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.position(300, 150);

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects....";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);

    objects = results;
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if (status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);

        for (no = 0; no < objects.length; no++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are - " + objects.length;

            fill(r, g, b);

            percent = floor(objects[no].confidence * 100);
            text(objects[no].label + " " + percent + "%", objects[no].x, objects[no].y);

            noFill();

            stroke(r, g, b);
            rect(objects[no].x, objects[no].y, objects[no].width, objects[no].height);

            if (objects[no].label == "person")
            {
                document.getElementById("number_of_objects").innerHTML = "BABY FOUND!";
                console.log("stop");
                alert.stop();
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML = "BABY NOT FOUND!";
                console.log("play");
                alert.play();
            }
        }
        if (objects.length == 0)
        {
            document.getElementById("number_of_objects").innerHTML = "BABY NOT FOUND!";
            console.log("play");
            alert.play();
        }
    }
}
