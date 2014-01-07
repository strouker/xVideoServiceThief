echo xVideoServiceThief MinGW automated compiler script
echo Note: Configure your envirotment variables before execute this Bat
echo Copyright Xesc and Technolgy 2010-2014

set QtVersion=5.0.2
set QtDir=C:\ProgramacioLibs\Qt\Qt%QtVersion%-mingw\%QtVersion%\mingw47_32\bin
set UPXApp=C:\Documents and Settings\Administrador\Escritorio\upx.exe
set MAKE=mingw32-make.exe

if not exist "%QtDir%" (
  echo ------------------------------------------------------------------
  echo FATAL ERROR: The Qt directory "%QtDir%" is missing...
  echo Please configure your "qt-mingw.bat"
  echo ------------------------------------------------------------------
  pause
  exit
)

if not exist "%UPXApp%" (
  echo ------------------------------------------------------------------
  echo WARNING: The UPX application is missing ["%UPXApp%"]
  echo Please configure your "qt-vc++.bat"
  echo ------------------------------------------------------------------
  pause
)

call "%QtDir%\qtenv2.bat"