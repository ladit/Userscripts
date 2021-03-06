// ==UserScript==
// @name                GithubDashboardEnhance
// @description         Show the latest 30 starred repos in new Github dashboard and shortcuts in header navigation.
// @description:zh-CN   在 Github 新首页显示最近 30 个 star 项目，在头部导航栏中显示快捷方式
// @description:zh-TW   在 Github 新首頁顯示最近 30 個 star 項目，在頭部導航欄中顯示快捷方式
// @author              ladit
// @version             1.1.1
// @namespace           https://greasyfork.org/zh-CN/scripts/33511
// @homepageURL         https://github.com/ladit/Userscripts
// @supportURL          https://github.com/ladit/Userscripts
// @note                Partial reference from https://greasyfork.org/zh-CN/scripts/25101 by zhihaofans
// @note                Opt in new dashboard before using this script
// @grant               GM_xmlhttpRequest
// @grant               GM_setValue
// @grant               GM_getValue
// @run-at              document-idle
// @include             https://github.com/*
// @connect             api.github.com
// ==/UserScript==

function run() {
    var userName = document.querySelector('meta[name="user-login"]').content;
    if (userName === '') {
        return;
    }
    document.querySelector('nav[aria-label="Global"] a[href="/explore"]').insertAdjacentHTML('afterend', '<a class="js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade-15" href="/' + userName + '">Profile</a><a class="js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade-15" href="/' + userName + '?tab=repositories">Repositories</a><a class="js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade-15" href="/' + userName + '?tab=stars">Stars</a><a class="js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade-15" href="https://gist.github.com/">Gists</a>');
    var rightColumn = document.querySelector('aside[aria-label="Explore"]');
    if (rightColumn == null) {
        return;
    }
    if (GM_getValue('lastStoreStarredReposTime', 0) + 86400000 < Date.now()) {
        GM_xmlhttpRequest({
            url: 'https://api.github.com/users/' + userName + '/starred',
            method: 'GET',
            timeout: 45e3,
            onload: function (response) {
                var starredReposBlock = '<h2 class="f5 text-bold mb-1">Recent starred repos</h2>';
                var languageColor = { "1C Enterprise": "#814CCC", "ABAP": "#E8274B", "ActionScript": "#882B0F", "Ada": "#02f88c", "Agda": "#315665", "AGS Script": "#B9D9FF", "AL Code": "#3AA2B5", "Alloy": "#64C800", "AMPL": "#E6EFBB", "AngelScript": "#C7D7DC", "ANTLR": "#9DC3FF", "Apex": "#1797c0", "API Blueprint": "#2ACCA8", "APL": "#5A8164", "AppleScript": "#101F1F", "Arc": "#aa2afe", "ASP.NET": "#9400ff", "AspectJ": "#a957b0", "Assembly": "#6E4C13", "Asymptote": "#ff0000", "ATS": "#1ac620", "AutoHotkey": "#6594b9", "AutoIt": "#1C3552", "Ballerina": "#FF5000", "Batchfile": "#C1F12E", "Blade": "#f7523f", "BlitzMax": "#cd6400", "Boo": "#d4bec1", "Brainfuck": "#2F2530", "C": "#555555", "C#": "#178600", "C++": "#f34b7d", "Ceylon": "#dfa535", "Chapel": "#8dc63f", "Cirru": "#ccccff", "Clarion": "#db901e", "Classic ASP": "#6a40fd", "Clean": "#3F85AF", "Click": "#E4E6F3", "Clojure": "#db5855", "CoffeeScript": "#244776", "ColdFusion": "#ed2cd6", "Common Lisp": "#3fb68b", "Common Workflow Language": "#B5314C", "Component Pascal": "#B0CE4E", "Crystal": "#000100", "CSON": "#244776", "CSS": "#563d7c", "Cuda": "#3A4E3A", "D": "#ba595e", "Dafny": "#FFEC25", "Dart": "#00B4AB", "DataWeave": "#003a52", "Dhall": "#dfafff", "DM": "#447265", "Dockerfile": "#384d54", "Dogescript": "#cca760", "Dylan": "#6c616e", "E": "#ccce35", "eC": "#913960", "ECL": "#8a1267", "Eiffel": "#4d6977", "Elixir": "#6e4a7e", "Elm": "#60B5CC", "Emacs Lisp": "#c065db", "EmberScript": "#FFF4F3", "EQ": "#a78649", "Erlang": "#B83998", "F#": "#b845fc", "F*": "#572e30", "Factor": "#636746", "Fancy": "#7b9db4", "Fantom": "#14253c", "Faust": "#c37240", "FLUX": "#88ccff", "Forth": "#341708", "Fortran": "#4d41b1", "FreeMarker": "#0050b2", "Frege": "#00cafe", "Futhark": "#5f021f", "G-code": "#D08CF2", "Game Maker Language": "#71b417", "GAML": "#FFC766", "GDScript": "#355570", "Genie": "#fb855d", "Gherkin": "#5B2063", "Glyph": "#c1ac7f", "Gnuplot": "#f0a9f0", "Go": "#00ADD8", "Golo": "#88562A", "Gosu": "#82937f", "Grammatical Framework": "#ff0000", "Groovy": "#e69f56", "Hack": "#878787", "Haml": "#ece2a9", "Handlebars": "#f7931e", "Harbour": "#0e60e3", "Haskell": "#5e5086", "Haxe": "#df7900", "HiveQL": "#dce200", "HolyC": "#ffefaf", "HTML": "#e34c26", "Hy": "#7790B2", "IDL": "#a3522f", "Idris": "#b30000", "IGOR Pro": "#0000cc", "Io": "#a9188d", "Ioke": "#078193", "Isabelle": "#FEFE00", "J": "#9EEDFF", "Java": "#b07219", "JavaScript": "#f1e05a", "Jolie": "#843179", "JSONiq": "#40d47e", "Jsonnet": "#0064bd", "Julia": "#a270ba", "Jupyter Notebook": "#DA5B0B", "Kaitai Struct": "#773b37", "Kotlin": "#F18E33", "KRL": "#28430A", "Lasso": "#999999", "Latte": "#f2a542", "Less": "#1d365d", "Lex": "#DBCA00", "LFE": "#4C3023", "LiveScript": "#499886", "LLVM": "#185619", "LOLCODE": "#cc9900", "LookML": "#652B81", "LSL": "#3d9970", "Lua": "#000080", "Macaulay2": "#d8ffff", "Makefile": "#427819", "Markdown": "#083fa1", "Marko": "#42bff2", "Mask": "#f97732", "MATLAB": "#e16737", "Max": "#c4a79c", "MAXScript": "#00a6a6", "mcfunction": "#E22837", "Mercury": "#ff2b2b", "Meson": "#007800", "Metal": "#8f14e9", "Mirah": "#c7a938", "mIRC Script": "#3d57c3", "MLIR": "#5EC8DB", "Modula-3": "#223388", "MQL4": "#62A8D6", "MQL5": "#4A76B8", "MTML": "#b7e1f4", "NCL": "#28431f", "Nearley": "#990000", "Nemerle": "#3d3c6e", "nesC": "#94B0C7", "NetLinx": "#0aa0ff", "NetLinx+ERB": "#747faa", "NetLogo": "#ff6375", "NewLisp": "#87AED7", "Nextflow": "#3ac486", "Nim": "#ffc200", "Nit": "#009917", "Nix": "#7e7eff", "Nu": "#c9df40", "Objective-C": "#438eff", "Objective-C++": "#6866fb", "Objective-J": "#ff0c5a", "ObjectScript": "#424893", "OCaml": "#3be133", "Odin": "#60AFFE", "Omgrofl": "#cabbff", "ooc": "#b0b77e", "Opal": "#f7ede0", "OpenQASM": "#AA70FF", "Oxygene": "#cdd0e3", "Oz": "#fab738", "P4": "#7055b5", "Pan": "#cc0000", "Papyrus": "#6600cc", "Parrot": "#f3ca0a", "Pascal": "#E3F171", "Pawn": "#dbb284", "Pep8": "#C76F5B", "Perl": "#0298c3", "PHP": "#4F5D95", "PigLatin": "#fcd7de", "Pike": "#005390", "PLSQL": "#dad8d8", "PogoScript": "#d80074", "PostScript": "#da291c", "PowerBuilder": "#8f0f8d", "PowerShell": "#012456", "Prisma": "#0c344b", "Processing": "#0096D8", "Prolog": "#74283c", "Propeller Spin": "#7fa2a7", "Pug": "#a86454", "Puppet": "#302B6D", "PureBasic": "#5a6986", "PureScript": "#1D222D", "Python": "#3572A5", "q": "#0040cd", "Q#": "#fed659", "QML": "#44a51c", "Qt Script": "#00b841", "Quake": "#882233", "R": "#198CE7", "Racket": "#3c5caa", "Ragel": "#9d5200", "Raku": "#0000fb", "RAML": "#77d9fb", "Rascal": "#fffaa0", "Reason": "#ff5847", "Rebol": "#358a5b", "Red": "#f50000", "Ren'Py": "#ff7f7f", "Ring": "#2D54CB", "Riot": "#A71E49", "Roff": "#ecdebe", "Rouge": "#cc0088", "Ruby": "#701516", "RUNOFF": "#665a4e", "Rust": "#dea584", "SaltStack": "#646464", "SAS": "#B34936", "Sass": "#a53b70", "Scala": "#c22d40", "Scheme": "#1e4aec", "SCSS": "#c6538c", "sed": "#64b970", "Self": "#0579aa", "Shell": "#89e051", "Shen": "#120F14", "Slash": "#007eff", "Slice": "#003fa2", "Slim": "#2b2b2b", "Smalltalk": "#596706", "SmPL": "#c94949", "Solidity": "#AA6746", "SourcePawn": "#f69e1d", "SQF": "#3F3F3F", "Squirrel": "#800000", "SRecode Template": "#348a34", "Stan": "#b2011d", "Standard ML": "#dc566d", "Starlark": "#76d275", "Stylus": "#ff6347", "SuperCollider": "#46390b", "Svelte": "#ff3e00", "SVG": "#ff9900", "Swift": "#ffac45", "SystemVerilog": "#DAE1C2", "Tcl": "#e4cc98", "Terra": "#00004c", "TeX": "#3D6117", "TI Program": "#A0AA87", "Turing": "#cf142b", "Twig": "#c1d026", "TypeScript": "#2b7489", "Uno": "#9933cc", "UnrealScript": "#a54c4d", "V": "#4f87c4", "Vala": "#fbe5cd", "VBA": "#867db1", "VBScript": "#15dcdc", "VCL": "#148AA8", "Verilog": "#b2b7f8", "VHDL": "#adb2cb", "Vim script": "#199f4b", "Visual Basic .NET": "#945db7", "Volt": "#1F1F1F", "Vue": "#2c3e50", "wdl": "#42f1f4", "WebAssembly": "#04133b", "wisp": "#7582D1", "Wollok": "#a23738", "X10": "#4B6BEF", "xBase": "#403a40", "XC": "#99DA07", "XQuery": "#5232e7", "XSLT": "#EB8CEB", "Yacc": "#4B6C4B", "YAML": "#cb171e", "YARA": "#220000", "YASnippet": "#32AB90", "ZAP": "#0d665e", "ZenScript": "#00BCD1", "Zephir": "#118f9e", "Zig": "#ec915c", "ZIL": "#dc75e5" };
                var starredRepos = JSON.parse(response.responseText);
                starredRepos.forEach(function (starredRepo) {
                    starredReposBlock += '<div class="py-2 my-2 border-bottom"><a class="f6 text-bold link-gray-dark d-flex no-underline wb-break-all d-inline-block" href="' + starredRepo.html_url + '">' + starredRepo.full_name + '</a><p class="f6 text-gray mb-2" itemprop="description">' + starredRepo.description + '</p>' + (starredRepo.language == null ? '' : '<span class="mr-2 f6 text-gray text-normal"><span class=""><span class="repo-language-color" style="background-color:' + languageColor[starredRepo.language] + '"></span><span itemprop="programmingLanguage"> ' + starredRepo.language + '</span></span></span>') + '<span class="f6 text-gray text-normal"><svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg> ' + (starredRepo.stargazers_count > 1000 ? (starredRepo.stargazers_count / 1000).toFixed(1) + 'k' : starredRepo.stargazers_count) + '</span></div>';
                });
                GM_setValue('starredReposBlock', starredReposBlock);
                GM_setValue('lastStoreStarredReposTime', Date.now());
                rightColumn.insertAdjacentHTML('beforeend', starredReposBlock);
            },
            onerror: function () {
                GM_log('[GithubDashboardEnhance]: There was a problem with the request.');
            },
            ontimeout: function () {
                GM_log('[GithubDashboardEnhance]: Request timeout.');
            },
        });
    } else {
        rightColumn.insertAdjacentHTML('beforeend', GM_getValue('starredReposBlock', ''));
    }
}

run();
