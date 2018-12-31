const jsonfile = require("jsonfile");
var fs = require("fs");
const file = "./package.json";
var exec = require("child_process").exec;

function getValueByKey(text, key) {
  var regex = new RegExp("^" + key + "=(.*)$", "m");
  var match = regex.exec(text);
  if (match) return match[1];
  else return null;
}

function handleErrors(err) {
  console.error(err);
}

jsonfile
  .readFile(file)
  .then(obj => {
    console.log("Current Build Number - ", obj.build);
    const newBuildNumber = ++obj.build;
    console.log("Updating package.json");
    jsonfile
      .writeFile(file, obj)
      .then(res => {
        fs.readFile("./android/gradle.properties", function(err, buf) {
          if (err) handleErrors(err);
          else {
            let gradleProps = buf.toString();
            const oldBuildNumber = getValueByKey(gradleProps, "VERSION_CODE");
            gradleProps = gradleProps.replace(
              `VERSION_CODE=${oldBuildNumber}`,
              `VERSION_CODE=${newBuildNumber}`
            );
            console.log("Updating gradle.properties");
            fs.writeFile("./android/gradle.properties", gradleProps, function(
              err,
              data
            ) {
              if (err) handleErrors(err);
              else {
                console.log("Updating iOS build numbers");
                const dir = exec(
                  `fastlane ios increaseBuildNumber build_number:${newBuildNumber}`,
                  function(err, stdout, stderr) {
                    if (err) handleErrors(err);
                    else {
                      console.log(stdout);
                      console.log("New build number - ", newBuildNumber);
                    }
                  }
                );
                dir.on("exit", function(code) {
                  console.log("Fastlane exit code - ", code);
                });
              }
            });
          }
        });
      })
      .catch(handleErrors);
  })
  .catch(handleErrors);
