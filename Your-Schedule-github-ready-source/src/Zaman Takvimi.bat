@echo off
cd /d "%~dp0"
if not exist "node_modules\electron\dist\electron.exe" (
  echo Ilk kurulum eksik. Lutfen bu klasorde pnpm install komutunu calistirin.
  pause
  exit /b 1
)
"%~dp0node_modules\electron\dist\electron.exe" "%~dp0"
