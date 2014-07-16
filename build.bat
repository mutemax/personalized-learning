echo off

rem config: output path
SET output="..\Adaptive-build"

rem clean and copy directory
echo y| rmdir /s %output%

rem copying everything except of develop-files
robocopy %cd% %output% /S /XD .idea .git js app css /XF *.sln *.suo *.bat .gitignore build.bat build.js r.js

rem copying all files except of css-files: images, fonts etc
robocopy %cd%\css %output%\css /S /XF *.css

rem vendor-libs
xcopy %cd%\js\vendor.min.js %output%\js\ /I
xcopy %cd%\js\require\require.js %output%\js\require\ /I
xcopy %cd%\js\settings\settings.js %output%\js\settings\ /I

rem css minification
node r.js -o cssIn=css\main.css out=%output%\css\main.css
node r.js -o cssIn=css\settings.css out=%output%\css\settings.css

rem js minification
node r.js -o build.js out=%output%\app\main.js

echo Build output folder: %output%