echo off

rem config: output path
SET output="..\Adaptive-build"

rem clean and copy directory
echo y| rmdir /s %output%

rem copying everything except of develop-files
robocopy %cd% %output% /S /XD .idea .git js app css /XF *.md *.sln *.suo *.bat .gitignore build.bat build.js r.js

rem copying all files except of css-files: images, fonts etc
robocopy %cd%\css %output%\css /S /XF *.css

rem vendor-libs
xcopy %cd%\js\vendor.min.js %output%\js\ /I
xcopy %cd%\js\require\require.js %output%\js\require\ /I

rem css minification
node r.js -o cssIn=css\main.css out=%output%\css\main.css


rem js minification
node r.js -o build.js out=%output%\app\main.js

rem settings

xcopy %cd%\settings\js\vendor.min.js %output%\settings\js\ /I
xcopy %cd%\settings\js\settings.js %output%\settings\js\ /I
robocopy %cd%\settings\css\fonts %output%\settings\css\fonts
robocopy %cd%\settings\img %output%\settings\img
node r.js -o cssIn=settings\css\settings.css out=%output%\settings\css\settings.css

echo Build output folder: %output%