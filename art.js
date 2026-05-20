const paintings = {
  easy: [
    {
      title: "Lotus Moon",
      viewBox: "0 0 360 480",
      colors: {
        1: { name: "Moon Cream", value: "#fff4c7" },
        2: { name: "Lotus Pink", value: "#ff8fcf" },
        3: { name: "Soft Aqua", value: "#79f2ec" },
        4: { name: "Leaf Mint", value: "#a8ef75" },
        5: { name: "Night Violet", value: "#6d3bd9" },
      },
      regions: [
        { id: "bg1", number: 5, label: "sky", d: "M0 0 H360 V480 H0 Z", text: [310, 32] },
        { id: "moon", number: 1, label: "moon", d: "M248 32 C306 42 342 88 334 142 C326 196 276 226 224 208 C255 190 273 158 268 122 C263 86 241 58 202 40 C216 33 231 30 248 32 Z", text: [292, 118] },
        { id: "petal1", number: 4, label: "flower petal", d: "M164 42 C196 4 233 1 242 19 C222 50 194 69 164 42 Z", text: [205, 30] },
        { id: "petal2", number: 4, label: "flower petal", d: "M154 50 C148 6 170 -8 202 10 C199 46 178 67 154 50 Z", text: [172, 28] },
        { id: "petal3", number: 4, label: "flower petal", d: "M150 62 C119 30 127 2 158 0 C177 28 174 54 150 62 Z", text: [149, 26] },
        { id: "petal4", number: 4, label: "flower petal", d: "M160 70 C194 64 225 78 228 104 C194 113 169 100 160 70 Z", text: [197, 91] },
        { id: "petal5", number: 4, label: "flower petal", d: "M146 70 C134 108 105 127 83 110 C96 77 119 61 146 70 Z", text: [113, 94] },
        { id: "face", number: 1, label: "face", d: "M83 146 C120 92 194 90 232 143 C261 184 243 258 185 288 C135 314 76 285 58 228 C48 194 59 166 83 146 Z", text: [157, 212] },
        { id: "hair1", number: 5, label: "hair", d: "M68 144 C26 174 8 224 15 284 C24 358 82 428 159 459 C124 392 119 331 143 286 C75 271 42 206 68 144 Z", text: [58, 312] },
        { id: "hair2", number: 3, label: "hair glow", d: "M32 252 C56 300 94 324 142 322 C122 356 122 398 147 448 C88 419 43 373 25 316 C17 290 19 268 32 252 Z", text: [82, 372] },
        { id: "hair3", number: 2, label: "hair streak", d: "M31 202 C47 244 84 273 135 281 C119 296 104 301 84 296 C45 286 24 250 31 202 Z", text: [71, 258] },
        { id: "neck", number: 1, label: "neck", d: "M147 282 C168 293 190 291 209 276 L214 348 C187 369 154 367 132 345 Z", text: [173, 329] },
        { id: "dress", number: 3, label: "dress", d: "M94 480 C106 403 130 353 172 343 C214 356 241 404 254 480 Z", text: [175, 421] },
        { id: "flowerSmall1", number: 2, label: "flower", d: "M46 116 C24 100 25 76 44 74 C52 48 79 48 78 76 C102 75 111 101 85 116 C95 140 70 154 59 130 C38 150 22 133 46 116 Z", text: [62, 108] },
        { id: "flowerSmall2", number: 2, label: "flower", d: "M43 320 C26 308 29 288 45 289 C50 268 72 270 70 291 C91 287 98 309 78 319 C88 337 67 350 58 331 C42 347 27 335 43 320 Z", text: [61, 315] },
        { id: "flowerSmall3", number: 2, label: "flower", d: "M91 346 C75 336 78 318 92 318 C98 300 117 303 115 320 C134 318 140 337 121 346 C130 363 111 374 103 357 C88 371 74 359 91 346 Z", text: [106, 342] },
      ],
    },
    {
      title: "Dream Butterfly",
      viewBox: "0 0 360 480",
      colors: {
        1: { name: "Pearl", value: "#f7f4ff" },
        2: { name: "Butterfly Blue", value: "#5fe7ff" },
        3: { name: "Rose", value: "#ff7ab6" },
        4: { name: "Sun Yellow", value: "#ffe477" },
        5: { name: "Deep Violet", value: "#5b36c9" },
      },
      regions: [
        { id: "bg", number: 5, label: "background", d: "M0 0 H360 V480 H0 Z", text: [308, 35] },
        { id: "wingL1", number: 2, label: "wing", d: "M176 218 C70 188 35 86 112 38 C163 55 190 118 176 218 Z", text: [119, 111] },
        { id: "wingR1", number: 3, label: "wing", d: "M184 218 C290 188 325 86 248 38 C197 55 170 118 184 218 Z", text: [242, 111] },
        { id: "wingL2", number: 3, label: "wing", d: "M172 234 C68 246 43 354 126 417 C176 373 191 304 172 234 Z", text: [116, 321] },
        { id: "wingR2", number: 2, label: "wing", d: "M188 234 C292 246 317 354 234 417 C184 373 169 304 188 234 Z", text: [246, 321] },
        { id: "body", number: 1, label: "body", d: "M166 96 C187 96 199 126 194 234 C189 342 181 397 170 397 C159 397 151 342 146 234 C141 126 145 96 166 96 Z", text: [171, 239] },
        { id: "spot1", number: 4, label: "spot", d: "M89 110 C116 84 148 104 139 139 C109 151 86 139 89 110 Z", text: [116, 121] },
        { id: "spot2", number: 4, label: "spot", d: "M221 110 C248 84 280 104 271 139 C241 151 218 139 221 110 Z", text: [249, 121] },
        { id: "spot3", number: 4, label: "spot", d: "M91 305 C119 274 153 295 142 332 C111 347 87 333 91 305 Z", text: [119, 315] },
        { id: "spot4", number: 4, label: "spot", d: "M218 305 C246 274 280 295 269 332 C238 347 214 333 218 305 Z", text: [247, 315] },
      ],
    },
  ],
  medium: [
    {
      title: "Flower Muse",
      viewBox: "0 0 360 520",
      colors: {
        1: { name: "Skin Glow", value: "#ffd7ca" },
        2: { name: "Ocean Hair", value: "#38d6ee" },
        3: { name: "Violet Shadow", value: "#6b36d8" },
        4: { name: "Leaf Lime", value: "#b7ee58" },
        5: { name: "Blossom Pink", value: "#ff70b8" },
        6: { name: "Ink White", value: "#f9f8ff" },
      },
      regions: [
        { id: "bg", number: 3, label: "background", d: "M0 0 H360 V520 H0 Z", text: [312, 40] },
        { id: "hairA", number: 3, label: "hair", d: "M88 118 C25 160 4 236 28 318 C52 402 122 476 211 510 C149 413 146 333 191 269 C116 258 67 191 88 118 Z", text: [66, 311] },
        { id: "hairB", number: 2, label: "hair", d: "M30 244 C65 309 119 339 190 327 C164 376 165 435 205 504 C117 464 57 406 31 333 C20 299 20 269 30 244 Z", text: [95, 392] },
        { id: "hairC", number: 5, label: "hair streak", d: "M52 176 C70 227 117 262 185 271 C160 293 124 297 91 276 C59 255 45 222 52 176 Z", text: [104, 242] },
        { id: "face", number: 1, label: "face", d: "M103 132 C152 78 226 92 249 158 C271 221 229 294 164 302 C106 309 67 266 66 210 C65 176 79 150 103 132 Z", text: [159, 205] },
        { id: "neck", number: 1, label: "neck", d: "M146 296 C168 307 194 302 213 282 L219 356 C195 378 151 377 128 352 Z", text: [171, 339] },
        { id: "dress", number: 6, label: "dress", d: "M74 520 C91 425 123 362 174 350 C229 367 259 428 277 520 Z", text: [176, 447] },
        { id: "leaf1", number: 4, label: "leaf", d: "M176 41 C204 3 244 -3 258 20 C237 58 205 78 176 41 Z", text: [219, 32] },
        { id: "leaf2", number: 4, label: "leaf", d: "M159 48 C149 8 170 -9 207 5 C204 44 182 69 159 48 Z", text: [181, 27] },
        { id: "leaf3", number: 4, label: "leaf", d: "M154 62 C119 33 126 5 157 0 C178 27 178 55 154 62 Z", text: [150, 29] },
        { id: "leaf4", number: 4, label: "leaf", d: "M168 70 C203 63 240 83 244 111 C207 123 178 104 168 70 Z", text: [210, 96] },
        { id: "leaf5", number: 4, label: "leaf", d: "M148 72 C130 112 95 133 72 111 C89 77 119 61 148 72 Z", text: [109, 97] },
        { id: "flower1", number: 5, label: "flower", d: "M37 120 C14 103 17 78 40 78 C48 50 78 52 75 79 C102 76 111 104 86 118 C98 144 69 158 58 132 C36 152 16 134 37 120 Z", text: [60, 112] },
        { id: "flower2", number: 5, label: "flower", d: "M49 344 C27 328 31 303 52 305 C59 278 88 280 84 306 C111 304 119 331 94 344 C106 368 78 382 67 357 C46 376 27 358 49 344 Z", text: [70, 340] },
        { id: "eyeL", number: 6, label: "eye", d: "M111 192 C130 180 151 182 166 195 C147 207 126 208 111 192 Z", text: [138, 196] },
        { id: "eyeR", number: 6, label: "eye", d: "M194 190 C211 178 232 181 246 194 C228 207 207 206 194 190 Z", text: [220, 196] },
      ],
    },
    {
      title: "Cosmic Garden",
      viewBox: "0 0 360 520",
      colors: {
        1: { name: "Petal Cream", value: "#fff2bf" },
        2: { name: "Aqua Stream", value: "#66f3ef" },
        3: { name: "Orchid", value: "#c875ff" },
        4: { name: "Leaf Green", value: "#98eb70" },
        5: { name: "Rose Glow", value: "#ff78ba" },
        6: { name: "Space Blue", value: "#162148" },
      },
      regions: [
        { id: "bg", number: 6, label: "sky", d: "M0 0 H360 V520 H0 Z", text: [314, 42] },
        { id: "river", number: 2, label: "river", d: "M119 520 C147 432 130 359 173 293 C213 231 250 159 223 72 C277 145 275 248 230 324 C189 394 193 455 234 520 Z", text: [186, 410] },
        { id: "hillL", number: 3, label: "hill", d: "M0 520 C22 404 72 342 151 324 C115 386 114 448 143 520 Z", text: [75, 447] },
        { id: "hillR", number: 4, label: "hill", d: "M216 520 C223 421 265 354 360 321 V520 Z", text: [297, 438] },
        { id: "flowerTop1", number: 1, label: "petal", d: "M118 97 C143 45 195 42 205 78 C182 119 145 132 118 97 Z", text: [166, 86] },
        { id: "flowerTop2", number: 1, label: "petal", d: "M107 104 C69 70 76 29 116 27 C141 62 137 91 107 104 Z", text: [109, 70] },
        { id: "flowerTop3", number: 1, label: "petal", d: "M123 119 C159 113 198 132 203 165 C164 183 133 161 123 119 Z", text: [164, 153] },
        { id: "flowerTop4", number: 5, label: "center", d: "M109 101 C130 86 157 94 164 119 C144 138 116 130 109 101 Z", text: [137, 113] },
        { id: "leafA", number: 4, label: "leaf", d: "M72 236 C92 184 139 170 158 199 C130 239 96 252 72 236 Z", text: [119, 214] },
        { id: "leafB", number: 4, label: "leaf", d: "M214 241 C237 190 286 179 303 211 C272 250 239 260 214 241 Z", text: [261, 224] },
        { id: "orb1", number: 5, label: "orb", d: "M43 300 C66 275 104 286 110 319 C87 346 49 333 43 300 Z", text: [77, 315] },
        { id: "orb2", number: 3, label: "orb", d: "M244 92 C265 67 303 79 307 111 C284 137 248 125 244 92 Z", text: [277, 106] },
      ],
    },
  ],
  tough: [
    {
      title: "Aurora Muse",
      viewBox: "0 0 390 560",
      colors: {
        1: { name: "Skin Pearl", value: "#ffd8cd" },
        2: { name: "Turquoise Hair", value: "#26d9e8" },
        3: { name: "Royal Purple", value: "#6132cc" },
        4: { name: "Lime Petal", value: "#c8ef5d" },
        5: { name: "Cherry Flower", value: "#ff579f" },
        6: { name: "Paper White", value: "#f9f8ff" },
        7: { name: "Deep Ink", value: "#11172e" },
      },
      regions: [
        { id: "bg", number: 7, label: "background", d: "M0 0 H390 V560 H0 Z", text: [342, 38] },
        { id: "whiteSide", number: 6, label: "line-art side", d: "M251 0 H390 V560 H251 C310 476 320 368 289 275 C258 183 245 83 251 0 Z", text: [326, 161] },
        { id: "hairMain", number: 3, label: "hair", d: "M95 100 C26 145 -5 236 21 329 C51 435 135 522 244 556 C174 448 168 357 220 286 C139 277 77 193 95 100 Z", text: [72, 324] },
        { id: "hairBlue", number: 2, label: "hair", d: "M29 244 C68 318 133 354 216 337 C184 393 189 465 238 552 C130 510 59 440 29 356 C16 314 15 276 29 244 Z", text: [103, 431] },
        { id: "hairPink", number: 5, label: "hair streak", d: "M44 182 C65 243 123 285 209 295 C180 326 129 331 90 305 C52 279 36 235 44 182 Z", text: [112, 265] },
        { id: "face", number: 1, label: "face", d: "M116 124 C170 62 250 81 273 153 C296 225 248 309 176 318 C110 326 66 276 67 211 C68 174 88 145 116 124 Z", text: [176, 214] },
        { id: "neck", number: 1, label: "neck", d: "M153 313 C179 327 209 321 231 298 L238 381 C210 407 160 405 134 377 Z", text: [184, 360] },
        { id: "hands", number: 6, label: "hands", d: "M241 356 C285 365 325 410 336 480 C293 473 261 450 238 412 Z", text: [292, 431] },
        { id: "dress", number: 6, label: "dress", d: "M72 560 C92 454 128 386 187 373 C249 392 282 462 303 560 Z", text: [189, 489] },
        { id: "leaf1", number: 4, label: "top flower", d: "M184 38 C218 -5 264 -4 278 21 C251 63 215 84 184 38 Z", text: [231, 31] },
        { id: "leaf2", number: 4, label: "top flower", d: "M165 47 C152 1 177 -16 218 4 C212 47 189 73 165 47 Z", text: [189, 25] },
        { id: "leaf3", number: 4, label: "top flower", d: "M159 64 C119 30 129 -5 165 0 C188 31 188 60 159 64 Z", text: [157, 29] },
        { id: "leaf4", number: 4, label: "top flower", d: "M178 75 C218 65 260 87 266 120 C222 137 190 112 178 75 Z", text: [226, 103] },
        { id: "leaf5", number: 4, label: "top flower", d: "M152 78 C131 124 92 145 67 119 C86 81 119 62 152 78 Z", text: [112, 104] },
        { id: "flowerLeft", number: 5, label: "flower", d: "M41 128 C16 109 19 80 43 81 C53 48 87 51 82 82 C114 78 124 111 94 128 C109 157 75 174 62 144 C38 168 14 147 41 128 Z", text: [64, 123] },
        { id: "flowerHair1", number: 5, label: "flower", d: "M50 351 C26 333 31 306 54 307 C63 277 96 280 91 309 C122 306 131 337 103 351 C116 379 84 394 72 365 C49 388 27 367 50 351 Z", text: [75, 347] },
        { id: "flowerHair2", number: 5, label: "flower", d: "M103 382 C82 367 86 342 106 343 C115 316 143 320 139 345 C166 343 174 371 148 383 C160 408 132 422 121 397 C101 417 82 400 103 382 Z", text: [126, 378] },
        { id: "eyeL", number: 2, label: "eye", d: "M123 202 C145 188 170 190 187 205 C164 220 140 219 123 202 Z", text: [155, 208] },
        { id: "eyeR", number: 4, label: "eye", d: "M215 199 C236 186 260 190 276 204 C254 219 230 216 215 199 Z", text: [245, 206] },
        { id: "lips", number: 5, label: "lips", d: "M164 260 C184 251 205 252 224 260 C205 274 183 274 164 260 Z", text: [195, 265] },
      ],
    },
    {
      title: "Celestial Hands",
      viewBox: "0 0 390 560",
      colors: {
        1: { name: "Skin Pearl", value: "#ffe0d3" },
        2: { name: "Moon Aqua", value: "#6ff7ef" },
        3: { name: "Violet Wave", value: "#7e4dff" },
        4: { name: "Petal Lime", value: "#c8ef5d" },
        5: { name: "Flower Rose", value: "#ff6eb6" },
        6: { name: "Paper White", value: "#faf9ff" },
        7: { name: "Deep Night", value: "#12172e" },
      },
      regions: [
        { id: "bg", number: 7, label: "background", d: "M0 0 H390 V560 H0 Z", text: [342, 40] },
        { id: "moon", number: 6, label: "moon", d: "M266 29 C333 37 379 91 371 157 C363 225 302 264 240 239 C279 218 302 178 296 133 C290 88 261 55 214 35 C232 29 249 27 266 29 Z", text: [321, 133] },
        { id: "hair", number: 3, label: "hair", d: "M100 110 C34 155 12 239 38 326 C71 434 148 514 242 552 C177 447 174 360 224 289 C143 279 79 197 100 110 Z", text: [84, 337] },
        { id: "hairAqua", number: 2, label: "hair", d: "M47 260 C89 327 145 358 220 344 C192 403 196 471 238 552 C144 515 73 448 43 366 C30 328 31 291 47 260 Z", text: [114, 435] },
        { id: "face", number: 1, label: "face", d: "M122 139 C171 86 243 94 272 156 C300 219 263 299 196 316 C132 332 76 292 72 227 C70 190 91 160 122 139 Z", text: [177, 219] },
        { id: "hand1", number: 1, label: "hand", d: "M223 318 C282 315 338 369 356 452 C315 454 268 426 232 378 Z", text: [295, 390] },
        { id: "hand2", number: 6, label: "hand outline", d: "M255 279 C314 291 370 342 390 423 V560 H334 C326 459 289 371 244 339 Z", text: [343, 348] },
        { id: "dress", number: 6, label: "dress", d: "M82 560 C100 456 136 390 190 377 C251 393 284 463 305 560 Z", text: [194, 491] },
        { id: "leafTop1", number: 4, label: "flower", d: "M180 48 C214 4 260 2 274 27 C247 70 210 91 180 48 Z", text: [230, 41] },
        { id: "leafTop2", number: 4, label: "flower", d: "M158 58 C143 13 168 -8 211 12 C206 54 183 82 158 58 Z", text: [184, 35] },
        { id: "leafTop3", number: 4, label: "flower", d: "M152 77 C112 46 120 9 158 10 C182 41 182 72 152 77 Z", text: [150, 48] },
        { id: "leafTop4", number: 4, label: "flower", d: "M174 87 C215 76 257 99 264 131 C220 149 187 123 174 87 Z", text: [224, 117] },
        { id: "flower1", number: 5, label: "flower", d: "M48 149 C24 131 27 103 50 104 C58 75 90 77 87 105 C116 102 125 132 98 148 C111 174 81 189 69 162 C47 184 25 167 48 149 Z", text: [70, 145] },
        { id: "flower2", number: 5, label: "flower", d: "M59 367 C35 349 40 322 63 323 C72 293 105 296 100 325 C131 322 140 353 112 367 C125 395 93 410 81 381 C58 404 36 383 59 367 Z", text: [84, 363] },
        { id: "heart", number: 4, label: "heart", d: "M161 390 C176 363 210 368 210 397 C210 422 178 443 161 458 C144 443 112 422 112 397 C112 368 146 363 161 390 Z", text: [161, 413] },
        { id: "eyeL", number: 2, label: "eye", d: "M129 211 C149 198 173 200 188 213 C168 226 145 225 129 211 Z", text: [158, 217] },
        { id: "eyeR", number: 4, label: "eye", d: "M216 208 C235 196 259 199 273 212 C253 225 230 223 216 208 Z", text: [244, 215] },
      ],
    },
  ],
};

const levelButtons = document.querySelectorAll(".level-button");
const canvasList = document.querySelector("#canvasList");
const palette = document.querySelector("#palette");
const legend = document.querySelector("#legend");
const paintBoard = document.querySelector("#paintBoard");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const canvasTitle = document.querySelector("#canvasTitle");
const levelLabel = document.querySelector("#levelLabel");
const message = document.querySelector("#message");
const hintButton = document.querySelector("#hintButton");
const checkButton = document.querySelector("#checkButton");
const resetButton = document.querySelector("#resetButton");

let currentLevel = "easy";
let currentCanvasIndex = 0;
let selectedColor = "1";
let filledRegions = {};
let completedAwarded = false;
let artXp = Number(localStorage.getItem("selestiaArtXP") || 0);
let completedPaintings = [];
try { completedPaintings = JSON.parse(localStorage.getItem("selestiaArtCompleted") || "[]") || []; } catch { completedPaintings = []; }

const getPaintingKey = () => currentLevel + ":" + getCurrentPainting().title;

const renderArtXp = () => {
  const level = Math.floor(artXp / 100) + 1;
  const artXpText = document.querySelector("#artXpText");
  const artLevelText = document.querySelector("#artLevelText");
  if (artXpText) artXpText.textContent = artXp + " XP";
  if (artLevelText) artLevelText.textContent = "Level " + level + " creator";
};

const renderCompleted = () => {
  const completedList = document.querySelector("#completedList");
  if (!completedList) return;
  completedList.innerHTML = completedPaintings.length
    ? completedPaintings.map((item) => '<span class="completed-item">' + item.title + ' - ' + item.level + '</span>').join("")
    : '<p class="intro">Completed canvases will appear here.</p>';
};

const awardCompletion = () => {
  const painting = getCurrentPainting();
  const key = getPaintingKey();
  if (completedAwarded || completedPaintings.some((item) => item.key === key)) return;
  completedAwarded = true;
  const reward = currentLevel === "easy" ? 25 : currentLevel === "medium" ? 40 : 60;
  artXp += reward;
  localStorage.setItem("selestiaArtXP", String(artXp));
  completedPaintings.unshift({ key, title: painting.title, level: currentLevel, completedAt: new Date().toISOString() });
  completedPaintings = completedPaintings.slice(0, 12);
  localStorage.setItem("selestiaArtCompleted", JSON.stringify(completedPaintings));
  message.textContent = "Painting complete. Beautiful work. +" + reward + " Art XP.";
  renderArtXp();
  renderCompleted();
};

const getCurrentPainting = () => paintings[currentLevel][currentCanvasIndex];

const getCorrectCount = () => {
  const painting = getCurrentPainting();
  return painting.regions.filter((region) => String(filledRegions[region.id]) === String(region.number)).length;
};

const updateProgress = () => {
  const painting = getCurrentPainting();
  const percent = Math.round((getCorrectCount() / painting.regions.length) * 100);

  progressText.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  if (percent === 100) {
    awardCompletion();
  }
};

const renderCanvasList = () => {
  canvasList.innerHTML = "";

  paintings[currentLevel].forEach((painting, index) => {
    const button = document.createElement("button");
    button.className = `canvas-button ${index === currentCanvasIndex ? "is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="canvas-thumb" aria-hidden="true">
        <svg viewBox="${painting.viewBox}">
          ${painting.regions
            .filter((region) => region.id !== "bg")
            .map((region) => `<path d="${region.d}"></path>`)
            .join("")}
        </svg>
      </span>
      <span class="canvas-name">${painting.title}</span>
    `;
    button.addEventListener("click", () => {
      currentCanvasIndex = index;
      renderArtXp();
renderCompleted();
loadPainting();
    });
    canvasList.append(button);
  });
};

const renderPalette = () => {
  const painting = getCurrentPainting();
  palette.innerHTML = "";
  legend.innerHTML = "";

  Object.entries(painting.colors).forEach(([number, color]) => {
    const button = document.createElement("button");
    button.className = `color-button ${number === selectedColor ? "is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `<span class="swatch" style="background:${color.value}; color:${color.value}"></span><span>${color.name}</span><strong>${number}</strong>`;
    button.addEventListener("click", () => {
      selectedColor = number;
      renderPalette();
      message.textContent = `Color ${number} selected. Fill every ${number}.`;
    });
    palette.append(button);

    const item = document.createElement("span");
    item.className = "legend-item";
    item.innerHTML = `<span class="swatch" style="background:${color.value}; color:${color.value}"></span>${number} ${color.name}`;
    legend.append(item);
  });
};

const renderBoard = () => {
  const painting = getCurrentPainting();
  paintBoard.innerHTML = "";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", painting.viewBox);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${painting.title} paint by number canvas`);

  painting.regions.forEach((region) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const filledNumber = filledRegions[region.id];
    path.setAttribute("d", region.d);
    path.setAttribute("class", `paint-region ${filledNumber ? "is-filled" : ""}`);
    path.setAttribute("data-id", region.id);
    path.setAttribute("data-number", region.number);
    path.setAttribute("aria-label", `${region.label}, number ${region.number}`);
    path.style.fill = filledNumber ? painting.colors[filledNumber].value : "";
    path.addEventListener("click", () => {
      filledRegions[region.id] = selectedColor;
      renderBoard();
      updateProgress();
    });
    svg.append(path);
  });

  painting.regions.forEach((region) => {
    if (filledRegions[region.id]) return;

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", region.text[0]);
    text.setAttribute("y", region.text[1]);
    text.setAttribute("class", "region-number");
    text.textContent = region.number;
    svg.append(text);
  });

  paintBoard.append(svg);
};

const loadPainting = () => {
  const painting = getCurrentPainting();
  selectedColor = "1";
  filledRegions = {};
  completedAwarded = completedPaintings.some((item) => item.key === getPaintingKey());
  canvasTitle.textContent = painting.title;
  levelLabel.textContent = `${currentLevel} level`;
  message.textContent = "Pick a color and fill the matching numbered shapes.";
  renderCanvasList();
  renderPalette();
  renderBoard();
  updateProgress();
};

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLevel = button.dataset.level;
    currentCanvasIndex = 0;
    levelButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    loadPainting();
  });
});

hintButton.addEventListener("click", () => {
  const painting = getCurrentPainting();
  const target = painting.regions.find((region) => String(region.number) === selectedColor && filledRegions[region.id] !== selectedColor);

  document.querySelectorAll(".paint-region").forEach((region) => region.classList.remove("is-hint"));

  if (!target) {
    message.textContent = `No more empty shapes for color ${selectedColor}.`;
    return;
  }

  document.querySelector(`[data-id="${target.id}"]`).classList.add("is-hint");
  message.textContent = `Hint: place color ${selectedColor} on the glowing shape.`;
});

checkButton.addEventListener("click", () => {
  const painting = getCurrentPainting();
  let mistakes = 0;

  painting.regions.forEach((region) => {
    const path = document.querySelector(`[data-id="${region.id}"]`);
    const isWrong = filledRegions[region.id] && String(filledRegions[region.id]) !== String(region.number);
    path.classList.toggle("is-wrong", Boolean(isWrong));
    if (isWrong) mistakes += 1;
  });

  message.textContent = mistakes ? `${mistakes} shape${mistakes === 1 ? "" : "s"} need a different color.` : "Everything painted so far is correct.";
});

resetButton.addEventListener("click", loadPainting);

loadPainting();


const freeCanvas = document.querySelector("#freeCanvas");
const brushColor = document.querySelector("#brushColor");
const brushSize = document.querySelector("#brushSize");
const clearCanvas = document.querySelector("#clearCanvas");
const saveCanvas = document.querySelector("#saveCanvas");
const drawMessage = document.querySelector("#drawMessage");
let drawing = false;

const setupFreeCanvas = () => {
  if (!freeCanvas) return;
  const ctx = freeCanvas.getContext("2d");
  const saved = localStorage.getItem("selestiaArtFreeCanvas");
  ctx.fillStyle = "#fbfbff";
  ctx.fillRect(0, 0, freeCanvas.width, freeCanvas.height);
  if (saved) {
    const image = new Image();
    image.onload = () => ctx.drawImage(image, 0, 0);
    image.src = saved;
  }
  const point = (event) => {
    const rect = freeCanvas.getBoundingClientRect();
    const source = event.touches ? event.touches[0] : event;
    return { x: (source.clientX - rect.left) * (freeCanvas.width / rect.width), y: (source.clientY - rect.top) * (freeCanvas.height / rect.height) };
  };
  const start = (event) => {
    drawing = true;
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    event.preventDefault();
  };
  const move = (event) => {
    if (!drawing) return;
    const p = point(event);
    ctx.lineWidth = Number(brushSize.value);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor.value;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    event.preventDefault();
  };
  const stop = () => { drawing = false; };
  freeCanvas.addEventListener("mousedown", start);
  freeCanvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", stop);
  freeCanvas.addEventListener("touchstart", start, { passive: false });
  freeCanvas.addEventListener("touchmove", move, { passive: false });
  window.addEventListener("touchend", stop);
  clearCanvas.addEventListener("click", () => {
    ctx.fillStyle = "#fbfbff";
    ctx.fillRect(0, 0, freeCanvas.width, freeCanvas.height);
    localStorage.removeItem("selestiaArtFreeCanvas");
    drawMessage.textContent = "Canvas cleared. Start a fresh sketch.";
  });
  saveCanvas.addEventListener("click", () => {
    localStorage.setItem("selestiaArtFreeCanvas", freeCanvas.toDataURL("image/png"));
    artXp += 10;
    localStorage.setItem("selestiaArtXP", String(artXp));
    renderArtXp();
    drawMessage.textContent = "Sketch saved. +10 Art XP.";
  });
};

setupFreeCanvas();
