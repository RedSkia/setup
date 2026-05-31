// ==========================================
// CONFIGURATION OBJECT
// Tags: "User Interface", "Administrator", "Danger", "Privacy", "Performance", "Software", "Feature", "Store", "Bundle"
// Variables: [VAR:Prompt Text]
// ==========================================
const CONFIG = {
    software: [
        { 
            title: "Proton Suite", 
            tags: ["Software", "Bundle"], 
            desc: "Encrypted ecosystem. Direct download is required as these are full desktop agents.",
            subItems: [
                { title: "Proton VPN", desc: "System-wide network encryption.", links: { direct: "https://protonvpn.com/download" } },
                { title: "Proton Mail", desc: "Encrypted desktop mail client.", links: { direct: "https://proton.me/mail/download" } },
                { title: "Proton Drive", desc: "File synchronization agent.", links: { direct: "https://proton.me/drive/download" } },
                { title: "Proton Pass", desc: "Password manager client.", links: { direct: "https://proton.me/pass/download" } }
            ]
        },
        { 
            title: "PowerToys", 
            links: { direct: "https://github.com/microsoft/PowerToys/releases", store: "ms-windows-store://pdp/?ProductId=XP89DCGQ3K6VLD" }, 
            tags: ["Software", "Feature", "Store"], 
            desc: "Microsoft System Utilities (FancyZones, Awake, Keyboard Manager).",
            restriction: "MS STORE LIMITATION: None. The MS Store version is actually preferred here because it handles deep background updates automatically without interrupting your workflow.",
            configs: [
                {
                    title: "Force Restart FancyZones",
                    apply: `taskkill /f /im PowerToys.FancyZones.exe\nstart "" "C:\\Program Files\\PowerToys\\PowerToys.FancyZones.exe"`,
                    revert: `echo No revert necessary.`
                },
                {
                    title: "Backup PowerToys Settings",
                    apply: `mkdir "%USERPROFILE%\\Desktop\\PowerToys_Backup"\nxcopy "%LOCALAPPDATA%\\Microsoft\\PowerToys" "%USERPROFILE%\\Desktop\\PowerToys_Backup" /E /I /Y`,
                    revert: `rmdir /s /q "%USERPROFILE%\\Desktop\\PowerToys_Backup"`
                }
            ]
        },
        { 
            title: "Brave Browser", 
            links: { direct: "https://brave.com" }, 
            tags: ["Software", "Administrator"],
            desc: "Primary Web Browser. Overrides Microsoft Edge aggressively.", 
            configs: [{
                title: "Force Brave as Default Handler",
                apply: `reg add "HKCU\\Software\\Classes\\http\\shell\\open\\command" /ve /d "\\"C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe\\" --single-argument %%1" /f\nreg add "HKCU\\Software\\Classes\\https\\shell\\open\\command" /ve /d "\\"C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe\\" --single-argument %%1" /f\nreg add "HKCU\\Software\\Classes\\microsoft-edge\\shell\\open\\command" /ve /d "\\"C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe\\" --single-argument %%1" /f\nreg add "HKCU\\Software\\Classes\\.htm\\OpenWithProgids" /v "BraveHTML" /t REG_SZ /d "" /f\nreg add "HKCU\\Software\\Classes\\.html\\OpenWithProgids" /v "BraveHTML" /t REG_SZ /d "" /f`,
                revert: `:: Reverting requires setting defaults manually via ms-settings:defaultapps`
            }]
        },
        { 
            title: "AntiGravity Context Integration", 
            tags: ["Software", "User Interface"],
            desc: "Custom Application: Integrates into the Windows right-click context menu.",
            configs: [{
                title: "Inject Context Menu Paths",
                apply: `reg add "HKCR\\*\\shell\\OpenWithAntigravity" /ve /d "Open with AntiGravity" /f\nreg add "HKCR\\*\\shell\\OpenWithAntigravity" /v "Icon" /d "[VAR:Full Path to AntiGravity.exe],0" /f\nreg add "HKCR\\*\\shell\\OpenWithAntigravity\\command" /ve /d "\\"[VAR:Full Path to AntiGravity.exe]\\" \\"%1\\"" /f\nreg add "HKCR\\Directory\\shell\\OpenWithAntigravity" /ve /d "Open with AntiGravity" /f\nreg add "HKCR\\Directory\\shell\\OpenWithAntigravity" /v "Icon" /d "[VAR:Full Path to AntiGravity.exe],0" /f\nreg add "HKCR\\Directory\\shell\\OpenWithAntigravity\\command" /ve /d "\\"[VAR:Full Path to AntiGravity.exe]\\" \\"%1\\"" /f\nreg add "HKCR\\Directory\\Background\\shell\\OpenWithAntigravity" /ve /d "Open with AntiGravity" /f\nreg add "HKCR\\Directory\\Background\\shell\\OpenWithAntigravity" /v "Icon" /d "[VAR:Full Path to AntiGravity.exe],0" /f\nreg add "HKCR\\Directory\\Background\\shell\\OpenWithAntigravity\\command" /ve /d "\\"[VAR:Full Path to AntiGravity.exe]\\" \\"%V\\"" /f`,
                revert: `reg delete "HKCR\\*\\shell\\OpenWithAntigravity" /f\nreg delete "HKCR\\Directory\\shell\\OpenWithAntigravity" /f\nreg delete "HKCR\\Directory\\Background\\shell\\OpenWithAntigravity" /f`
            }]
        },
        { 
            title: "GIMP", 
            links: { direct: "https://www.gimp.org/downloads/", store: "ms-windows-store://pdp/?ProductId=9PTRFFLLMJ38" }, 
            tags: ["Software"], 
            desc: "Open-source Image Editor.",
            restriction: "MS STORE LIMITATION: GIMP requires access to the standard AppData folder for third-party Python scripts and plugins. The MS Store version isolates the AppData folder, which breaks many popular community plugins. Direct download is recommended for power users."
        },
        { 
            title: "Grammarly", 
            links: { direct: "https://www.grammarly.com/desktop", store: "ms-windows-store://pdp/?ProductId=9NZ7M8B891B0" }, 
            tags: ["Software"], 
            desc: "System-wide Writing Assistant.",
            restriction: "MS STORE LIMITATION: The sandboxed Store version occasionally fails to inject its overlay into legacy win32 applications (like old versions of Microsoft Word). The Direct download installs deep COM Add-ins to ensure 100% compatibility."
        },
        { 
            title: "Visual Studio 2022 Community", 
            links: { direct: "https://visualstudio.microsoft.com/vs/community/" }, 
            tags: ["Software", "Feature", "Administrator"], 
            desc: "Full IDE for C++, .NET, and Windows development.",
            restriction: "MS STORE LIMITATION: Visual Studio Community CANNOT exist on the Microsoft Store. It requires kernel-level installation of MSBuild SDKs, C++ Redistributables, and deep system variables. Only the lightweight 'VS Code' is available on the Store."
        },
        { 
            title: "Docker Desktop", 
            links: { direct: "https://www.docker.com/" }, 
            tags: ["Software", "Feature", "Administrator"], 
            desc: "Containerization tool engine.",
            restriction: "MS STORE LIMITATION: Docker requires Ring-0 Kernel access to interact with Windows Hyper-V and WSL2 virtual network adapters. It is physically impossible for Docker to be hosted on the Microsoft Store."
        },
        { 
            title: "Discord", 
            links: { direct: "https://discord.com/download", store: "ms-windows-store://pdp/?ProductId=9N59UIXPSSQQ" }, 
            tags: ["Software"], 
            desc: "Communications & VoIP.",
            restriction: "MS STORE LIMITATION: The Store version runs in a secure sandbox. It cannot hook into games for the in-game overlay, and often struggles with Full-Screen Game Capture in OBS. Direct download (.exe) is strongly recommended for gamers and streamers."
        },
        { 
            title: "Telegram", 
            links: { direct: "https://desktop.telegram.org/", store: "ms-windows-store://pdp/?ProductId=9NZTWSQNTD0S" }, 
            tags: ["Software"], 
            desc: "Encrypted Messaging.",
            restriction: "MS STORE LIMITATION: Microsoft enforces strict content filtering. The Store version will block servers and chats flagged as sensitive or NSFW. The Direct (.exe) version has no such restrictions and allows custom installation paths."
        },
        { 
            title: "TreeSize", 
            links: { direct: "https://www.jam-software.com/treesize_free", store: "ms-windows-store://pdp/?ProductId=9N8L44D1H14W" }, 
            tags: ["Software"], 
            desc: "Storage Analyzer.",
            restriction: "MS STORE LIMITATION: Due to strict file-system sandboxing, the MS Store version can struggle to access highly protected NTFS system directories, leading to inaccurate disk usage calculations. Direct download provides proper Administrator system hooks."
        },
        { 
            title: "WhatsApp", 
            links: { direct: "https://www.whatsapp.com/download", store: "ms-windows-store://pdp/?ProductId=9NKSQCEZVDYX" }, 
            tags: ["Software", "Store"], 
            desc: "Native messaging client.",
            restriction: "MS STORE LIMITATION: The Store version is incredibly clean and updates silently, but because it is an isolated UWP app, third-party broadcast software (like OBS) cannot 'Window Capture' it easily without workarounds. Use Direct if you stream."
        },
        { 
            title: "ILSpy", 
            links: { direct: "https://github.com/icsharpcode/ILSpy", store: "ms-windows-store://pdp/?ProductId=9NTR1PMMR1TW" }, 
            tags: ["Software", "Store"], 
            desc: "Open-source .NET Decompiler.",
            restriction: "MS STORE LIMITATION: None. ILSpy runs flawlessly in the sandbox and is actually preferred via the MS Store for seamless background updates without messing with your PATH variables."
        },
        { 
            title: "Windows Sandbox", 
            tags: ["Feature", "Administrator"],
            desc: "Native Windows Feature: Secure, disposable desktop environment. Requires Restart.",
            configs: [{
                title: "Enable / Disable Sandbox",
                apply: `dism /online /Enable-Feature /FeatureName:"Containers-DisposableClientVM" /All /NoRestart`,
                revert: `dism /online /Disable-Feature /FeatureName:"Containers-DisposableClientVM" /NoRestart`
            }]
        },
        { 
            title: "Hyper-V Virtualization", 
            tags: ["Feature", "Administrator"],
            desc: "Native Windows Feature: Hardware virtualization services. Requires Restart.",
            configs: [{
                title: "Enable / Disable Hyper-V",
                apply: `dism /online /Enable-Feature /FeatureName:Microsoft-Hyper-V-All /All /NoRestart`,
                revert: `dism /online /Disable-Feature /FeatureName:Microsoft-Hyper-V-All /NoRestart`
            }]
        },
        
        // Single-Link Software (No Dropdowns needed)
        { title: "Phone Link", links: { store: "ms-windows-store://pdp/?ProductId=9NMPJ99VJBWV" }, tags: ["Software", "Store"], desc: "Microsoft Store: Connect your Android/iPhone to Windows natively." },
        { title: "AMD Adrenaline", links: { direct: "https://www.amd.com/en/support" }, tags: ["Software"], desc: "Display Drivers & GPU Control." },
        { title: "Armoury Crate", links: { direct: "https://rog.asus.com/us/armoury-crate/" }, tags: ["Software"], desc: "Asus Hardware Control." },
        { title: "BlueStacks", links: { direct: "https://www.bluestacks.com" }, tags: ["Software"], desc: "Android Emulator." },
        { title: "Cloudflare Warp", links: { direct: "https://1.1.1.1/" }, tags: ["Software"], desc: "DNS Privacy & 1.1.1.1 Routing." },
        { title: "GitHub Desktop", links: { direct: "https://desktop.github.com/" }, tags: ["Software"], desc: "Visual Version Control." },
        { title: "PowerShell 7", links: { direct: "https://learn.microsoft.com/en-us/powershell", store: "ms-windows-store://pdp/?ProductId=9MZ1SNWT0N5D" }, tags: ["Software", "Feature"], desc: "Modern cross-platform shell." },
        { title: "Steam", links: { direct: "https://store.steampowered.com/about/" }, tags: ["Software"], desc: "Gaming Platform." },
        { title: "WinRAR", links: { direct: "https://www.rarlab.com/download.htm" }, tags: ["Software"], desc: "Archive Manager." }
    ],
    system: [
        {
            title: "System UI Dark Mode",
            tags: ["User Interface"],
            desc: "Forces the Taskbar, Start Menu, and System UI to consistently render in Dark Theme.",
            configs: [{
                title: "Apply System Dark Mode",
                apply: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "SystemUsesLightTheme" /t REG_DWORD /d "0" /f',
                revert: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "SystemUsesLightTheme" /t REG_DWORD /d "1" /f'
            }]
        },
        {
            title: "App Dark Mode",
            tags: ["User Interface"],
            desc: "Forces all native Windows Store applications and settings menus to render in Dark Theme.",
            configs: [{
                title: "Apply App Dark Mode",
                apply: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d "0" /f',
                revert: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d "1" /f'
            }]
        },
        {
            title: "Solid Black Wallpaper",
            tags: ["User Interface", "Performance"],
            desc: "Removes the default desktop background image and replaces it with a solid black color to save memory.",
            configs: [{
                title: "Remove Wallpaper",
                apply: 'reg add "HKCU\\Control Panel\\Desktop" /v "Wallpaper" /t REG_SZ /d "" /f\nreg add "HKCU\\Control Panel\\Colors" /v "Background" /t REG_SZ /d "0 0 0" /f',
                revert: 'reg delete "HKCU\\Control Panel\\Desktop" /v "Wallpaper" /f\nreg add "HKCU\\Control Panel\\Colors" /v "Background" /t REG_SZ /d "0 0 0" /f'
            }]
        },
        {
            title: "Disable Transparency Effects",
            tags: ["User Interface", "Performance"],
            desc: "Turns off the Acrylic and Mica frosted-glass blur effects across the OS for better GPU performance.",
            configs: [{
                title: "Disable Transparency",
                apply: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d "0" /f',
                revert: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d "1" /f'
            }]
        },
        {
            title: "Disable Window Animations",
            tags: ["User Interface", "Performance"],
            desc: "Disables the minimize and maximize animations, making window snapping feel instantly responsive.",
            configs: [{
                title: "Disable Animations",
                apply: 'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v "MinAnimate" /t REG_SZ /d "0" /f',
                revert: 'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v "MinAnimate" /t REG_SZ /d "1" /f'
            }]
        },
        {
            title: "Classic Context Menu",
            tags: ["User Interface"],
            desc: "Bypasses the Windows 11 'Show More Options' menu and forces the classic Windows 10 right-click menu.",
            configs: [{
                title: "Restore Win10 Context Menu",
                apply: 'reg add "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32" /f /ve && taskkill /f /im explorer.exe && start explorer',
                revert: 'reg delete "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f && taskkill /f /im explorer.exe && start explorer'
            }]
        },
        {
            title: "Show File Extensions & Hidden Files",
            tags: ["User Interface"],
            desc: "Forces File Explorer to permanently display file extensions (e.g., .exe, .json) and reveals hidden system files.",
            configs: [{
                title: "Show Extensions & Hidden",
                apply: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "HideFileExt" /t REG_DWORD /d "0" /f\nreg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Hidden" /t REG_DWORD /d "1" /f',
                revert: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "HideFileExt" /t REG_DWORD /d "1" /f\nreg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Hidden" /t REG_DWORD /d "2" /f'
            }]
        },
        {
            title: "Clean Taskbar Elements",
            tags: ["User Interface"],
            desc: "Declutters the Taskbar by permanently hiding the Widgets board, Teams Chat icon, and Task View buttons.",
            configs: [{
                title: "Hide Widgets & Chat",
                apply: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarDa" /t REG_DWORD /d "0" /f\nreg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarMn" /t REG_DWORD /d "0" /f\nreg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowTaskViewButton" /t REG_DWORD /d "0" /f',
                revert: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarDa" /t REG_DWORD /d "1" /f\nreg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarMn" /t REG_DWORD /d "1" /f\nreg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "ShowTaskViewButton" /t REG_DWORD /d "1" /f'
            }]
        },
        {
            title: "Remove '- Shortcut' Suffix",
            tags: ["User Interface"],
            desc: "Stops Windows from automatically appending the annoying '- Shortcut' text to newly created desktop icons.",
            configs: [{
                title: "Remove Suffix",
                apply: 'reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "link" /t REG_BINARY /d "00000000" /f',
                revert: 'reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "link" /t REG_BINARY /d "16000000" /f'
            }]
        },
        {
            title: "Add 'Take Ownership' Right-Click",
            tags: ["User Interface", "Administrator", "Danger"],
            desc: "Adds a context menu option to instantly bypass 'TrustedInstaller' and force admin ownership over stubborn system files.",
            configs: [{
                title: "Inject Take Ownership",
                apply: 'reg add "HKCR\\*\\shell\\runas" /ve /d "Take Ownership" /f\nreg add "HKCR\\*\\shell\\runas\\command" /ve /d "cmd.exe /c takeown /f \\"%1\\" && icacls \\"%1\\" /grant administrators:F" /f\nreg add "HKCR\\Directory\\shell\\runas" /ve /d "Take Ownership" /f\nreg add "HKCR\\Directory\\shell\\runas\\command" /ve /d "cmd.exe /c takeown /f \\"%1\\" /r /d y && icacls \\"%1\\" /grant administrators:F /t" /f',
                revert: 'reg delete "HKCR\\*\\shell\\runas" /f\nreg delete "HKCR\\Directory\\shell\\runas" /f'
            }]
        },
        {
            title: "Disable Telemetry & Tracking",
            tags: ["Privacy", "Administrator"],
            desc: "Sets OS diagnostic data collection to absolute minimum and disables your unique Advertising ID.",
            configs: [{
                title: "Kill Telemetry",
                apply: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d "0" /f\nreg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d "0" /f\nreg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Start_TrackProgs" /t REG_DWORD /d "0" /f',
                revert: 'reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /f\nreg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t
