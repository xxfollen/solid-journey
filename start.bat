@echo off
title Streak Web - Rastreador de Tarefas e Habitos
echo ========================================================
echo         INICIANDO STREAK WEB (ESTILO INLITX)
echo ========================================================
echo.
echo Abrindo servidor de desenvolvimento local na porta 5173...
echo.
cd /d "%~dp0"
call npm.cmd run dev -- --open
pause
