const e = React.createElement;
class Component extends DCLogic {
  C = { paper:'#FBF6EC', sumi:'#382C24', kinari:'#F2E8D5', sora:'#8FB3C8', tsuchi:'#CB9C8B', matcha:'#7C8A5E', yuhi:'#EC7F5E', peri:'#EFE3D0', mut:'#9a8a76', body:'#6b5d50', line:'rgba(56,44,36,.10)', card:'#ffffff' };
  slots = ['Breakfast','Snack','Lunch','Dinner'];
  days = [{k:'Wed',sub:'Start fresh'},{k:'Thu',sub:'Midweek fuel'},{k:'Fri',sub:'Finish strong'}];
  slotColor = { Breakfast:'#7C8A5E', Snack:'#8FB3C8', Lunch:'#CB9C8B', Dinner:'#C8754E' };
  // Short, intentional rest-of-week prep for Cynthia and Gabriel. Every slot uses the selected inbox recipes or their shared ingredients.
  options = {
    Breakfast:['Pumpkin Chia Seed Pudding','Pumpkin Chia Seed Pudding','Pumpkin Chia Seed Pudding'],
    Snack:['Apple & Yogurt','Apple & Yogurt','Apple & Yogurt'],
    Lunch:['Honey Garlic Chicken & Miso Sesame Bean Salad','Honey Garlic Chicken & Miso Sesame Bean Salad','Honey Garlic Chicken & Miso Sesame Bean Salad'],
    Dinner:['Ginger-Scallion Tofu & Enoki Soba','Ginger-Scallion Tofu & Enoki Soba','Ginger-Scallion Tofu & Enoki Soba'],
  };
  kcal = {'Pumpkin Chia Seed Pudding':260,'Apple & Yogurt':210,'Honey Garlic Chicken & Miso Sesame Bean Salad':560,'Ginger-Scallion Tofu & Enoki Soba':570};
  recipes = {
    'Berry Protein Overnight Oats': { cuisine:'Breakfast · Prep ahead', time:'10 min + overnight', kcal:450, base:2, fixedPlan:true, protein:58, fiber:18, slug:'berry-protein-oats', portions:{Cynthia:{kcal:430,protein:28},Gabriel:{kcal:610,protein:36}}, ingredients:[{n:'Greek yogurt',q:400,u:'g',cat:'protein',prot:40},{n:'Rolled oats',q:140,u:'g',cat:'carb',prot:16},{n:'Protein powder',q:2,u:'scoops',cat:'protein',prot:48},{n:'Mixed berries',q:300,u:'g',cat:'veg',prot:3},{n:'Chia seeds',q:30,u:'g',cat:'carb',prot:5},{n:'Milk',q:400,u:'ml',cat:'sauce',prot:12}], method:['Stir the oats, chia, protein powder and milk until smooth.','Fold through half the berries, then refrigerate in two jars overnight.','Top with Greek yogurt and the remaining berries before eating.'] },
    'Egg & Bean Breakfast Wraps': { cuisine:'Breakfast · Prep ahead', time:'20 min', kcal:465, base:2, fixedPlan:true, protein:56, fiber:16, slug:'egg-bean-wraps', ingredients:[{n:'Eggs',q:4,u:'',cat:'protein',prot:24},{n:'Black beans',q:240,u:'g',cat:'protein',prot:18},{n:'Wholemeal wraps',q:2,u:'',cat:'carb',prot:12},{n:'Baby spinach',q:100,u:'g',cat:'veg',prot:3},{n:'Salsa',q:100,u:'g',cat:'sauce',prot:1},{n:'Cheddar',q:40,u:'g',cat:'protein',prot:10}], method:['Warm the beans with salsa until thick.','Scramble the eggs and wilt in the spinach.','Fill each wrap with bean mixture, eggs and cheese; roll tightly and toast seam-side down.'] },
    'Apple & Yogurt': { cuisine:'Snack', time:'3 min', kcal:210, base:2, fixedPlan:true, protein:22, fiber:8, slug:'apple-yogurt', ingredients:[{n:'Apples',q:2,u:'',cat:'veg',prot:0},{n:'Greek yogurt',q:300,u:'g',cat:'protein',prot:30},{n:'Cinnamon',q:1,u:'tsp',cat:'sauce',prot:0}], method:['Slice the apples.','Divide yogurt between two pots and dust with cinnamon.','Pack the apples separately so they stay crisp.'] },
    'Crunchy Veg & Hummus': { cuisine:'Snack', time:'5 min', kcal:220, base:2, fixedPlan:true, protein:12, fiber:12, slug:'veg-hummus', ingredients:[{n:'Hummus',q:160,u:'g',cat:'protein',prot:10},{n:'Carrots',q:250,u:'g',cat:'veg',prot:2},{n:'Cucumber',q:1,u:'',cat:'veg',prot:1},{n:'Red pepper',q:1,u:'',cat:'veg',prot:1}], method:['Cut the vegetables into batons.','Divide hummus into two pots.','Keep chilled until snack time.'] },
    'Cottage Cheese Berry Cup': { cuisine:'Snack', time:'3 min', kcal:240, base:2, fixedPlan:true, protein:34, fiber:7, slug:'cottage-cheese-berries', ingredients:[{n:'Cottage cheese',q:400,u:'g',cat:'protein',prot:48},{n:'Mixed berries',q:250,u:'g',cat:'veg',prot:3},{n:'Pumpkin seeds',q:30,u:'g',cat:'protein',prot:9}], method:['Divide cottage cheese and berries between two pots.','Scatter with pumpkin seeds just before eating.'] },
    'Banana Protein Yogurt': { cuisine:'Snack', time:'3 min', kcal:260, base:2, fixedPlan:true, protein:34, fiber:6, slug:'banana-protein-yogurt', ingredients:[{n:'Greek yogurt',q:350,u:'g',cat:'protein',prot:35},{n:'Bananas',q:2,u:'',cat:'veg',prot:2},{n:'Peanut butter',q:30,u:'g',cat:'protein',prot:8}], method:['Slice bananas over the yogurt.','Swirl through peanut butter and divide between two pots.'] },
    'Apple, Yogurt & Nuts': { cuisine:'Snack', time:'3 min', kcal:285, base:2, fixedPlan:true, protein:28, fiber:9, slug:'apple-yogurt-nuts', ingredients:[{n:'Apples',q:2,u:'',cat:'veg',prot:0},{n:'Greek yogurt',q:350,u:'g',cat:'protein',prot:35},{n:'Mixed nuts',q:40,u:'g',cat:'protein',prot:8}], method:['Slice apples.','Divide yogurt and nuts between two pots and pack apples alongside.'] },
    'Lemon Parsley Chicken Lentil Rice Bowls': { cuisine:'Mediterranean-inspired · Lunch', time:'10 min with prep', kcal:570, base:2, fixedPlan:true, protein:76, fiber:18, slug:'lemon-parsley-chicken-lentil-rice', portions:{Cynthia:{kcal:520,protein:34},Gabriel:{kcal:720,protein:48}}, ingredients:[{n:'Prepped chicken',q:400,u:'g',cat:'protein',prot:92,short:'Chicken'},{n:'Cooked lentils',q:300,u:'g',cat:'protein',prot:27},{n:'Cooked brown rice',q:300,u:'g',cat:'carb',prot:8},{n:'Cucumber',q:1,u:'',cat:'veg',prot:1},{n:'Parsley',q:30,u:'g',cat:'veg',prot:1},{n:'Lemon',q:1,u:'',cat:'sauce',prot:0},{n:'Olive oil',q:1,u:'tbsp',cat:'sauce',prot:0}], method:['Reheat one 400 g portion of prepped chicken until piping hot.','Toss lentils, rice, cucumber, parsley, lemon juice and olive oil.','Divide into bowls and top with the prepped chicken.'] },
    'Turkey Bean Vegetable Pasta': { cuisine:'Weeknight · Lunch', time:'25 min', kcal:590, base:2, fixedPlan:true, protein:70, fiber:17, slug:'turkey-bean-pasta', ingredients:[{n:'Turkey mince',q:300,u:'g',cat:'protein',prot:66,short:'Turkey'},{n:'Wholewheat pasta',q:180,u:'g',cat:'carb',prot:23},{n:'Cannellini beans',q:240,u:'g',cat:'protein',prot:16},{n:'Courgette',q:1,u:'',cat:'veg',prot:2},{n:'Cherry tomatoes',q:250,u:'g',cat:'veg',prot:3},{n:'Tomato passata',q:300,u:'g',cat:'sauce',prot:4}], method:['Cook pasta until just tender.','Brown turkey mince, then cook courgette and tomatoes until softened.','Add passata and beans, simmer 8 minutes, then toss with pasta.'] },
    'Crispy Tofu Red Cabbage Noodle Bowls': { cuisine:'Asian-inspired · Dinner', time:'25 min', kcal:570, base:2, fixedPlan:true, protein:58, fiber:15, slug:'crispy-tofu-red-cabbage-noodles', portions:{Cynthia:{kcal:520,protein:26},Gabriel:{kcal:720,protein:38}}, ingredients:[{n:'Firm tofu',q:400,u:'g',cat:'protein',prot:48,short:'Tofu'},{n:'Wholewheat noodles',q:180,u:'g',cat:'carb',prot:22},{n:'Red cabbage',q:300,u:'g',cat:'veg',prot:4},{n:'Spring onions',q:4,u:'',cat:'veg',prot:1},{n:'Coriander',q:20,u:'g',cat:'veg',prot:1},{n:'Light soy sauce',q:2,u:'tbsp',cat:'sauce',prot:2},{n:'Lime',q:1,u:'',cat:'sauce',prot:0}], method:['Press and cube tofu, then pan-fry until crisp.','Cook noodles and shred the cabbage.','Toss noodles with soy, lime, cabbage and spring onions; top with tofu and coriander.'] },
    'Chicken Chickpea Potato Traybake': { cuisine:'Traybake · Dinner', time:'30 min with prep', kcal:600, base:2, fixedPlan:true, protein:76, fiber:17, slug:'chicken-chickpea-potato-traybake', ingredients:[{n:'Prepped chicken',q:600,u:'g',cat:'protein',prot:138,short:'Chicken'},{n:'Chickpeas',q:400,u:'g',cat:'protein',prot:28},{n:'Potatoes',q:600,u:'g',cat:'carb',prot:12},{n:'Red onion',q:1,u:'',cat:'veg',prot:1},{n:'Spinach',q:120,u:'g',cat:'veg',prot:4},{n:'Lemon',q:1,u:'',cat:'sauce',prot:0}], method:['Roast potatoes, chickpeas and onion at 210°C for 25 minutes.','Add the 600 g portion of prepped chicken and roast 5–7 minutes until piping hot.','Fold through spinach to wilt and finish with lemon.'] },
    'Red Lentil Spinach Curry': { cuisine:'Indian-inspired · Dinner', time:'30 min', kcal:560, base:2, fixedPlan:true, protein:38, fiber:24, slug:'red-lentil-spinach-curry', ingredients:[{n:'Red lentils',q:250,u:'g',cat:'protein',prot:63},{n:'Light coconut milk',q:400,u:'ml',cat:'sauce',prot:6},{n:'Chopped tomatoes',q:400,u:'g',cat:'veg',prot:6},{n:'Spinach',q:250,u:'g',cat:'veg',prot:8},{n:'Brown rice',q:160,u:'g',cat:'carb',prot:12},{n:'Curry powder',q:2,u:'tbsp',cat:'sauce',prot:0}], method:['Toast curry powder briefly, then add lentils, tomatoes and coconut milk.','Simmer 20 minutes until lentils are tender.','Wilt in spinach and serve with cooked brown rice.'] },
    'Turkey Chilli Loaded Potatoes': { cuisine:'Comfort food · Dinner', time:'40 min', kcal:620, base:2, fixedPlan:true, protein:78, fiber:19, slug:'turkey-chilli-potatoes', ingredients:[{n:'Turkey mince',q:450,u:'g',cat:'protein',prot:99,short:'Turkey'},{n:'Potatoes',q:700,u:'g',cat:'carb',prot:14},{n:'Kidney beans',q:400,u:'g',cat:'protein',prot:28},{n:'Chopped tomatoes',q:400,u:'g',cat:'veg',prot:6},{n:'Red pepper',q:1,u:'',cat:'veg',prot:1},{n:'Greek yogurt',q:120,u:'g',cat:'protein',prot:12}], method:['Bake potatoes at 210°C until tender.','Brown turkey with pepper, add beans and tomatoes, then simmer until thick.','Split potatoes and fill with chilli; top with yogurt.'] },
    'Chicken Fajita Rice Bowls': { cuisine:'Mexican-inspired · Dinner', time:'15 min with prep', kcal:625, base:2, fixedPlan:true, protein:82, fiber:15, slug:'chicken-fajita-rice-bowls', ingredients:[{n:'Prepped chicken',q:800,u:'g',cat:'protein',prot:184,short:'Chicken'},{n:'Brown rice',q:180,u:'g',cat:'carb',prot:14},{n:'Black beans',q:240,u:'g',cat:'protein',prot:18},{n:'Red peppers',q:2,u:'',cat:'veg',prot:2},{n:'Onion',q:1,u:'',cat:'veg',prot:1},{n:'Lime',q:1,u:'',cat:'sauce',prot:0},{n:'Fajita seasoning',q:2,u:'tbsp',cat:'sauce',prot:0}], method:['Cook brown rice.','Cook peppers and onion until charred, then add 800 g prepped chicken with fajita seasoning and toss until piping hot.','Build bowls with rice, black beans, prepped chicken and lime.'] },
    'Pumpkin Chia Seed Pudding': { cuisine:'Breakfast · Prep ahead', time:'10 min + overnight', kcal:260, base:6, fixedPlan:true, protein:36, fiber:48, slug:'pumpkin-chia', portions:{Cynthia:{kcal:250,protein:6},Gabriel:{kcal:330,protein:8}}, ingredients:[{n:'Milk of choice',q:480,u:'ml',cat:'sauce',prot:14},{n:'Pumpkin purée',q:240,u:'g',cat:'veg',prot:3},{n:'Plain non-fat Greek yogurt',q:60,u:'g',cat:'protein',prot:6},{n:'Chia seeds',q:120,u:'g',cat:'carb',prot:20},{n:'Maple syrup',q:60,u:'ml',cat:'sauce',prot:0},{n:'Pumpkin pie spice',q:2,u:'tsp',cat:'sauce',prot:0},{n:'Apples',q:3,u:'',cat:'veg',prot:0},{n:'Pumpkin seeds',q:45,u:'g',cat:'protein',prot:14}], method:['Whisk milk, pumpkin purée, maple syrup, pumpkin pie spice and salt until smooth. Stir in the Greek yogurt, then the chia seeds.','Leave for 5 minutes, stir again to break up any chia clumps, then divide into six lidded jars. Refrigerate overnight.','For each breakfast, top one jar with diced apple and pumpkin seeds. Gabriel adds an extra spoonful of pumpkin seeds or a side of Greek yogurt if he needs more fuel.'] },
    'Honey Garlic Chicken & Miso Sesame Bean Salad': { cuisine:'Asian-inspired · Weekly lunch prep', time:'35 min', kcal:560, base:2, portionProtein:30, weeklyReference:true, fixedPlan:true, protein:54, fiber:17, slug:'honey-garlic-chicken-bean-salad', portions:{Cynthia:{kcal:560,protein:27},Gabriel:{kcal:560,protein:27}}, ingredients:[{n:'Chicken thighs, raw',q:900,u:'g',cat:'protein',prot:144,short:'Chicken'},{n:'Soy sauce (chicken)',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Dark soy sauce',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Oyster sauce',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Garlic powder',q:2,u:'tsp',cat:'sauce',prot:0},{n:'Honey (chicken)',q:2,u:'tbsp',cat:'sauce',prot:0},{n:'Sriracha',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Chickpeas, drained',q:240,u:'g',cat:'protein',prot:21},{n:'Shelled edamame',q:150,u:'g',cat:'protein',prot:18},{n:'Snap peas',q:105,u:'g',cat:'veg',prot:3},{n:'Purple cabbage, shredded',q:150,u:'g',cat:'veg',prot:3},{n:'Green onions',q:3,u:'',cat:'veg',prot:0},{n:'White miso',q:3,u:'tbsp',cat:'sauce',prot:6},{n:'Soy sauce (salad)',q:2,u:'tbsp',cat:'sauce',prot:3},{n:'Rice vinegar',q:2,u:'tbsp',cat:'sauce',prot:0},{n:'Toasted sesame oil',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Lime',q:1.5,u:'',cat:'sauce',prot:0},{n:'Sesame seeds',q:2,u:'tbsp',cat:'sauce',prot:3},{n:'Honey (salad)',q:1.5,u:'tsp',cat:'sauce',prot:0},{n:'Red pepper flakes',q:1.5,u:'tsp',cat:'sauce',prot:0}], method:['This is the full Wednesday–Friday lunch batch: six equal portions — three for Cynthia and three for Gabriel. The ingredient list above is the complete amount to have ready before you begin.','Toss all 900 g raw chicken with the chicken soy sauce, dark soy, oyster sauce, garlic powder, honey and sriracha. Air-fry at 190°C / 375°F for 12–15 minutes, until the thickest thigh reaches 75°C.','Toss the chickpeas, edamame, snap peas, cabbage and green onions with white miso, salad soy sauce, rice vinegar, lime juice, sesame oil, honey, red pepper flakes and sesame seeds.','Cool the chicken promptly. Divide both the chicken and cold salad evenly into six containers: each portion has one-sixth of the chicken and vegetables. Reheat only the chicken until steaming; keep the salad cold and crisp.'] },
    'Ginger-Scallion Tofu & Enoki Soba': { cuisine:'Japanese-inspired · Dinner', time:'20 min', kcal:570, base:2, weeklyDynamic:true, fixedPlan:true, protein:48, fiber:12, slug:'sesame-tofu-soba', portions:{Cynthia:{kcal:520,protein:22},Gabriel:{kcal:720,protein:30}}, ingredients:[{n:'Firm tofu',q:300,u:'g',cat:'protein',prot:36,short:'Tofu'},{n:'Soba noodles',q:180,u:'g',cat:'carb',prot:18,short:'Soba'},{n:'Enoki mushrooms',q:200,u:'g',cat:'veg',prot:5,short:'Enoki'},{n:'Pak choi',q:300,u:'g',cat:'veg',prot:5},{n:'Green onions',q:4,u:'',cat:'veg',prot:1},{n:'Fresh ginger',q:20,u:'g',cat:'sauce',prot:0},{n:'Soy sauce',q:2,u:'tbsp',cat:'sauce',prot:2},{n:'Rice vinegar',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Toasted sesame oil',q:2,u:'tsp',cat:'sauce',prot:0},{n:'Sesame seeds',q:2,u:'tsp',cat:'sauce',prot:1}], method:['Press and cube 300 g firm tofu, then pan-sear it in a hot non-stick pan until golden on all sides.','Trim the root end from 200 g enoki mushrooms, separate the clusters, then cook them in the hot pan for 3–4 minutes until tender and steaming; do not eat them raw.','Cook 180 g soba noodles, adding 300 g chopped pak choi for the final 2 minutes; drain well.','Stir grated ginger, sliced green onions, soy sauce, rice vinegar and toasted sesame oil together. Toss with the soba, pak choi and cooked enoki, then top with tofu and sesame seeds. Cynthia takes the smaller noodle portion; Gabriel takes the larger portion and any extra tofu.'] },
    'Chicken & Egg Meal Prep': { cuisine:'Fridge-clearout · Prep', time:'30 min', kcal:390, base:4, protein:154, fiber:7, slug:'chicken-egg-meal-prep',
      ingredients:[{n:'Chicken breast',q:960,u:'g',cat:'protein',prot:220,short:'Chicken'},{n:'Eggs',q:4,u:'',cat:'protein',prot:24,short:'Eggs'},{n:'Carrots',q:300,u:'g',cat:'veg',prot:3,short:'Carrots'},{n:'Red cabbage',q:250,u:'g',cat:'veg',prot:3,short:'Cabbage'},{n:'Savoy cabbage',q:350,u:'g',cat:'veg',prot:4,short:'Cabbage'},{n:'Kale',q:180,u:'g',cat:'veg',prot:6,short:'Kale'},{n:'Baby spinach',q:160,u:'g',cat:'veg',prot:5,short:'Spinach'},{n:'Cucumber',q:2,u:'',cat:'veg',prot:2},{n:'Fresh coriander',q:35,u:'g',cat:'veg',prot:1},{n:'Parsley',q:20,u:'g',cat:'veg',prot:1},{n:'Garlic',q:4,u:'cloves',cat:'sauce',prot:0},{n:'Fresh ginger',q:25,u:'g',cat:'sauce',prot:0}],
      method:['Thinly slice 960 g chicken breast and divide it into three labelled 320 g portions: Thursday lunch, Thursday dinner and Friday dinner.','Shred 250 g red cabbage and 350 g savoy cabbage, ribbon 300 g carrots, strip 180 g kale, wash 160 g spinach, slice 2 cucumbers and chop 35 g coriander with 20 g parsley. Store components separately.','Soft-boil 4 eggs for 7 minutes, chill in cold water and refrigerate unpeeled for Friday lunch.','Grate 25 g ginger and mince 4 garlic cloves; keep them ready for the stir-fry and five-spice noodles.'] },
    'Chicken, Cucumber & Herb Salad': { cuisine:'Asian-inspired · Thursday lunch', time:'15 min', kcal:430, base:2, fixedPlan:true, protein:74, fiber:5, slug:'chicken-cucumber-herb-salad',
      ingredients:[{n:'Chicken breast',q:320,u:'g',cat:'protein',prot:74,short:'Chicken'},{n:'Cucumber',q:1,u:'',cat:'veg',prot:1,short:'Cucumber'},{n:'Carrots',q:100,u:'g',cat:'veg',prot:1,short:'Carrots'},{n:'Fresh coriander',q:20,u:'g',cat:'veg',prot:1},{n:'Parsley',q:20,u:'g',cat:'veg',prot:1},{n:'Lime',q:1,u:'',cat:'sauce',prot:0},{n:'Light soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Sesame oil',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Poach 320 g chicken breast at a bare simmer for 12–14 minutes, or pan-sear it until cooked through; rest for 5 minutes then slice.','Slice 1 cucumber, ribbon 100 g carrots and roughly chop 20 g coriander with 20 g parsley.','Whisk the juice of 1 lime with 1 tbsp light soy sauce and 1 tsp sesame oil.','Toss the vegetables and herbs with the dressing, top with the sliced chicken and divide between two bowls.'] },
    'Egg, Spinach & Cucumber Salad': { cuisine:'Asian-inspired · Friday lunch', time:'10 min', kcal:350, base:2, fixedPlan:true, protein:30, fiber:5, slug:'egg-spinach-cucumber-salad',
      ingredients:[{n:'Eggs',q:4,u:'',cat:'protein',prot:24,short:'Eggs'},{n:'Baby spinach',q:160,u:'g',cat:'veg',prot:5,short:'Spinach'},{n:'Cucumber',q:1,u:'',cat:'veg',prot:1,short:'Cucumber'},{n:'Fresh coriander',q:15,u:'g',cat:'veg',prot:1},{n:'Light soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Rice vinegar',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Sesame oil',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Soft-boil 4 eggs for 7 minutes, then cool under cold water, peel and halve.','Divide 160 g baby spinach and 1 sliced cucumber between two bowls; scatter over 15 g chopped coriander.','Whisk 1 tbsp light soy sauce, 1 tbsp rice vinegar and 1 tsp sesame oil.','Nestle four egg halves (two eggs per bowl) on each salad and spoon over the dressing just before eating.'] },
    'Chicken, Cabbage & Carrot Stir-Fry': { cuisine:'Asian-inspired · Thursday dinner', time:'20 min', kcal:500, base:2, fixedPlan:true, protein:76, fiber:9, slug:'chicken-cabbage-carrot-stir-fry',
      ingredients:[{n:'Chicken breast',q:320,u:'g',cat:'protein',prot:74,short:'Chicken'},{n:'Savoy cabbage',q:350,u:'g',cat:'veg',prot:4,short:'Cabbage'},{n:'Carrots',q:100,u:'g',cat:'veg',prot:1,short:'Carrots'},{n:'Kale',q:100,u:'g',cat:'veg',prot:3,short:'Kale'},{n:'Shallot',q:1,u:'',cat:'veg',prot:0},{n:'Garlic',q:2,u:'cloves',cat:'sauce',prot:0},{n:'Fresh ginger',q:10,u:'g',cat:'sauce',prot:0},{n:'Light soy sauce',q:1.5,u:'tbsp',cat:'sauce',prot:1},{n:'Rice vinegar',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Sesame oil',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Mix 1½ tbsp light soy sauce, 1 tbsp rice vinegar, 1 tsp sesame oil, 2 minced garlic cloves and 10 g grated ginger; coat 320 g sliced chicken with half the mixture for 10 minutes.','Sear the chicken in a hot skillet until browned and cooked through, then transfer it to a plate.','In the same skillet, add 350 g shredded savoy cabbage, 100 g carrot ribbons and 1 sliced shallot with the remaining marinade and a splash of water, tossing to scrape up the browned bits.','Add 100 g kale with the cabbage and cook until all vegetables are crisp-tender. Stir the chicken back in, toss until hot and divide between two bowls.'] },
    'Five-Spice Chicken, Cabbage & Kale Noodles': { cuisine:'Chinese-inspired · Friday dinner', time:'25 min', kcal:540, base:2, fixedPlan:true, protein:78, fiber:10, slug:'five-spice-chicken-kale-noodles',
      ingredients:[{n:'Chicken breast',q:320,u:'g',cat:'protein',prot:74,short:'Chicken'},{n:'Dried noodles',q:160,u:'g',cat:'carb',prot:10,short:'Noodles'},{n:'Red cabbage',q:250,u:'g',cat:'veg',prot:3,short:'Cabbage'},{n:'Kale',q:80,u:'g',cat:'veg',prot:3,short:'Kale'},{n:'Carrots',q:100,u:'g',cat:'veg',prot:1,short:'Carrots'},{n:'Garlic',q:2,u:'cloves',cat:'sauce',prot:0},{n:'Fresh ginger',q:15,u:'g',cat:'sauce',prot:0},{n:'Chinese five spice',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Light soy sauce',q:1.5,u:'tbsp',cat:'sauce',prot:1},{n:'Honey',q:2,u:'tsp',cat:'sauce',prot:0},{n:'Toasted sesame seeds',q:2,u:'tsp',cat:'sauce',prot:1}],
      method:['Mix 2 minced garlic cloves, 15 g grated ginger, 1 tsp Chinese five spice, 1½ tbsp light soy sauce and 2 tsp honey; coat 320 g thinly sliced chicken and marinate for 10 minutes.','Cook 160 g dried noodles, reserve a splash of cooking water, then drain.','Stir-fry the chicken until browned and cooked through. Add 250 g shredded red cabbage, 80 g kale and 100 g shredded carrot; cook until tender-crisp.','Toss in the noodles with a splash of noodle water until glossy, then divide between two bowls and finish with 2 tsp toasted sesame seeds.'] },
    'Miso Salmon Bowl': { cuisine:'Japanese · Main', time:'25 min', kcal:450, base:2, protein:52, fiber:6, slug:'miso-salmon',
      ingredients:[{n:'Salmon fillet, skin-on',q:130,u:'g',cat:'protein',prot:29,short:'Salmon'},{n:'Cooked jasmine rice',q:100,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Shelled edamame',q:60,u:'g',cat:'veg',prot:7,short:'Edamame'},{n:'Spring onions',q:2,u:'',cat:'veg',prot:0},{n:'White miso paste',q:1,u:'tbsp',cat:'sauce',prot:2},{n:'Soy sauce',q:1,u:'tbsp',cat:'sauce',prot:2},{n:'Honey',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Sesame oil',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Rice vinegar',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Take salmon out of the fridge 10 min before cooking — room-temp fish cooks evenly.','Mix the glaze: miso, soy, honey, sesame oil, vinegar. Set half aside for serving.','Pat salmon dry. Brush the flesh side with half the glaze.','Heat 1 tsp oil in a non-stick pan on medium-high until shimmering.','Cook skin-side down 4 min without moving — the skin crisps and releases.','Flip and cook 2 min, until it flakes and the centre is just translucent.','Rest the salmon 3 min off the heat to keep it juicy.','Assemble rice, edamame, spring onion, salmon. Drizzle glaze; finish with sesame.'] },
    'Tofu Bibimbap': { cuisine:'Korean · Main', time:'30 min', kcal:495, base:2, protein:36, fiber:9, slug:'tofu-bibimbap',
      ingredients:[{n:'Firm tofu',q:150,u:'g',cat:'protein',prot:22,short:'Tofu'},{n:'Egg',q:1,u:'',cat:'protein',prot:6},{n:'Day-old jasmine rice',q:120,u:'g',cat:'carb',prot:4,short:'Rice'},{n:'Baby spinach',q:80,u:'g',cat:'veg',prot:2,short:'Spinach'},{n:'Carrot, julienned',q:1,u:'',cat:'veg',prot:1},{n:'Cucumber',q:0.5,u:'',cat:'veg',prot:0},{n:'Gochujang',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Sesame oil',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Garlic, grated',q:1,u:'clove',cat:'sauce',prot:0}],
      method:['Press tofu 15 min, cube, and pan-fry until golden on all sides.','Wilt spinach and lightly sauté carrot in separate piles; season each with a pinch of salt.','Whisk gochujang, soy, sesame oil and garlic into a glossy sauce.','Warm the day-old rice and spread into a wide bowl.','Arrange tofu and vegetables in sections over the rice.','Fry the egg sunny-side up and set on top.','Spoon over the sauce; mix everything together at the table just before eating.'] },
    'Chicken Katsu Curry': { cuisine:'Japanese · Main', time:'45 min', kcal:520, base:3, protein:66, fiber:8, slug:'katsu-curry',
      ingredients:[{n:'Chicken thigh',q:600,u:'g',cat:'protein',prot:108,short:'Chicken'},{n:'Egg',q:1,u:'',cat:'protein',prot:6},{n:'Jasmine rice',q:240,u:'g',cat:'carb',prot:7,short:'Rice'},{n:'Panko breadcrumbs',q:1,u:'cup',cat:'carb',prot:6},{n:'Plain flour',q:3,u:'tbsp',cat:'carb',prot:3},{n:'Onion',q:1,u:'',cat:'veg',prot:1},{n:'Carrot',q:1,u:'',cat:'veg',prot:1},{n:'Curry roux',q:0.5,u:'pack',cat:'sauce',prot:2},{n:'Oil, for frying',q:2,u:'tbsp',cat:'sauce',prot:0}],
      method:['Slice onion and carrot; simmer with 400ml water and the roux for 15 min into a smooth sauce.','Butterfly the chicken and season well.','Set up a flour → beaten egg → panko coating line.','Coat each piece, pressing the panko on firmly.','Shallow-fry 3–4 min each side until deep golden and cooked through.','Rest 3 min, then slice into thick strips.','Serve over rice and ladle the hot curry sauce alongside.'] },
    'Leftover Beef & Greens Bulk Prep': { cuisine:'Fridge-clearout · Bulk prep', time:'35 min', kcal:430, base:6, protein:250, fiber:6, slug:'leftover-beef-greens-bulk-prep',
      ingredients:[{n:'Minced beef',q:1000,u:'g',cat:'protein',prot:250,short:'Beef'},{n:'Garlic',q:6,u:'cloves',cat:'sauce',prot:0},{n:'Light soy sauce',q:4,u:'tbsp',cat:'sauce',prot:4},{n:'Rice vinegar',q:2,u:'tbsp',cat:'sauce',prot:0},{n:'Sesame oil',q:2,u:'tsp',cat:'sauce',prot:0},{n:'Chilli flakes',q:2,u:'tsp',cat:'sauce',prot:0}],
      method:['Cook 1 kg minced beef in two wide batches over high heat, leaving it untouched briefly so it browns rather than steams.','Stir together 6 minced garlic cloves, 4 tbsp light soy sauce, 2 tbsp rice vinegar, 2 tsp sesame oil and 2 tsp chilli flakes.','Return all of the beef to the pan, add the measured sauce and cook for 1–2 min until glossy.','Cool promptly, then divide into six portions (about 165 g each). Refrigerate the first four portions for up to 3 days and freeze the final two portions; thaw them overnight in the fridge.'] },
    'Beef & Tenderstem Broccoli Rice Bowl': { cuisine:'Asian-inspired · Leftovers', time:'15 min', kcal:495, base:2, protein:52, fiber:9, slug:'beef-tenderstem-rice-bowl',
      ingredients:[{n:'Prepared leftover beef',q:167,u:'g',cat:'protein',prot:42,short:'Beef'},{n:'Cooked jasmine rice',q:260,u:'g',cat:'carb',prot:8,short:'Rice'},{n:'Tenderstem broccoli',q:200,u:'g',cat:'veg',prot:6,short:'Broccoli'},{n:'Carrots',q:100,u:'g',cat:'veg',prot:1,short:'Carrots'},{n:'Red cabbage',q:150,u:'g',cat:'veg',prot:2,short:'Cabbage'},{n:'Parsley',q:15,u:'g',cat:'veg',prot:1},{n:'Light soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Rice vinegar',q:1,u:'tbsp',cat:'sauce',prot:0}],
      method:['Steam 200 g tenderstem broccoli for 4–5 min until bright and tender-crisp; ribbon 100 g carrots and shred 150 g red cabbage.','Reheat one 167 g portion of prepared leftover beef until piping hot and warm 260 g cooked jasmine rice.','Toss the cabbage and carrots with 1 tbsp rice vinegar and a pinch of salt.','Build two bowls with rice, beef, broccoli and crunchy slaw. Finish with 1 tbsp light soy sauce and 15 g chopped parsley.'] },
    'Savoy Cabbage Beef Noodles': { cuisine:'Asian-inspired · Leftovers', time:'15 min', kcal:480, base:2, protein:50, fiber:10, slug:'savoy-beef-noodles',
      ingredients:[{n:'Prepared leftover beef',q:167,u:'g',cat:'protein',prot:42,short:'Beef'},{n:'Dried noodles',q:160,u:'g',cat:'carb',prot:10,short:'Noodles'},{n:'Savoy cabbage',q:250,u:'g',cat:'veg',prot:3,short:'Cabbage'},{n:'Carrots',q:100,u:'g',cat:'veg',prot:1,short:'Carrots'},{n:'Kale',q:120,u:'g',cat:'veg',prot:4,short:'Kale'},{n:'Spinach',q:100,u:'g',cat:'veg',prot:3,short:'Spinach'},{n:'Light soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Rice vinegar',q:1,u:'tbsp',cat:'sauce',prot:0}],
      method:['Cook 160 g dried noodles, reserving a splash of cooking water before draining.','Stir-fry 250 g shredded savoy cabbage, 100 g carrot ribbons and 120 g chopped kale for 4 min; add 100 g spinach and let it wilt.','Add one 167 g portion of prepared leftover beef, the noodles, 1 tbsp light soy sauce, 1 tbsp rice vinegar and 2 tbsp noodle water.','Toss over high heat for 1–2 min until glossy and hot. Divide between two containers or bowls.'] },
    'Beef, Kale & Spinach Fried Rice': { cuisine:'Asian-inspired · Leftovers', time:'15 min', kcal:505, base:2, protein:51, fiber:9, slug:'beef-kale-spinach-fried-rice',
      ingredients:[{n:'Prepared leftover beef',q:167,u:'g',cat:'protein',prot:42,short:'Beef'},{n:'Cooked jasmine rice',q:300,u:'g',cat:'carb',prot:9,short:'Rice'},{n:'Kale',q:100,u:'g',cat:'veg',prot:3,short:'Kale'},{n:'Spinach',q:120,u:'g',cat:'veg',prot:4,short:'Spinach'},{n:'Red cabbage',q:150,u:'g',cat:'veg',prot:2,short:'Cabbage'},{n:'Parsley',q:15,u:'g',cat:'veg',prot:1},{n:'Light soy sauce',q:1.5,u:'tbsp',cat:'sauce',prot:1},{n:'Sesame oil',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Heat a wide pan until very hot. Stir-fry 100 g chopped kale for 2 min, then add 120 g spinach and 150 g shredded red cabbage.','Add 300 g cold cooked jasmine rice and one 167 g portion of prepared leftover beef; spread it out for 1 min so the rice can toast.','Season with 1½ tbsp light soy sauce and 1 tsp sesame oil, then toss until every grain is hot.','Fold through 15 g chopped parsley just before serving. Divide between two containers; cool quickly if packing for later.'] },
    'Sticky Beef Ginger Rice Soup': { cuisine:'Thai-inspired · Leftovers', time:'15 min', kcal:470, base:2, protein:50, fiber:6, slug:'sticky-beef-ginger-rice-soup',
      ingredients:[{n:'Prepared leftover beef',q:167,u:'g',cat:'protein',prot:42,short:'Beef'},{n:'Cooked jasmine rice',q:220,u:'g',cat:'carb',prot:7,short:'Rice'},{n:'Beef stock',q:700,u:'ml',cat:'sauce',prot:5},{n:'Fresh ginger',q:20,u:'g',cat:'sauce',prot:0},{n:'Spinach',q:100,u:'g',cat:'veg',prot:3,short:'Spinach'},{n:'Parsley',q:15,u:'g',cat:'veg',prot:1},{n:'Fish sauce',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Lime',q:1,u:'',cat:'sauce',prot:0}],
      method:['Simmer 700 ml beef stock with 20 g thinly sliced ginger for 8 minutes.','Add 100 g spinach until wilted, then season the broth with 1 tsp fish sauce and the juice of 1 lime.','Reheat one 167 g portion of prepared leftover beef and 220 g cooked jasmine rice until piping hot.','Divide rice into two bowls, ladle over the ginger broth, top with the sticky beef and finish with 15 g parsley.'] },
    'Gochujang Beef & Tenderstem Bowl': { cuisine:'Korean-inspired · Leftovers', time:'15 min', kcal:500, base:2, protein:52, fiber:9, slug:'gochujang-beef-tenderstem-bowl',
      ingredients:[{n:'Prepared leftover beef',q:167,u:'g',cat:'protein',prot:42,short:'Beef'},{n:'Cooked jasmine rice',q:260,u:'g',cat:'carb',prot:8,short:'Rice'},{n:'Tenderstem broccoli',q:200,u:'g',cat:'veg',prot:6,short:'Broccoli'},{n:'Carrots',q:100,u:'g',cat:'veg',prot:1,short:'Carrots'},{n:'Red cabbage',q:150,u:'g',cat:'veg',prot:2,short:'Cabbage'},{n:'Gochujang',q:2,u:'tbsp',cat:'sauce',prot:2},{n:'Sesame oil',q:2,u:'tsp',cat:'sauce',prot:0}],
      method:['Steam 200 g tenderstem broccoli for 4–5 minutes. Shred 150 g red cabbage and ribbon 100 g carrots.','Whisk 2 tbsp gochujang with 2 tsp sesame oil and 2 tbsp hot water into a spicy glossy sauce.','Reheat one 167 g portion of prepared leftover beef and 260 g cooked jasmine rice.','Build two bowls with rice, beef, broccoli and crunchy vegetables; drizzle over the gochujang sauce.'] },
    'Peanut-Lime Savoy Beef Noodles': { cuisine:'Thai-inspired · Leftovers', time:'15 min', kcal:520, base:2, protein:51, fiber:10, slug:'peanut-lime-savoy-beef-noodles',
      ingredients:[{n:'Prepared leftover beef',q:167,u:'g',cat:'protein',prot:42,short:'Beef'},{n:'Dried noodles',q:160,u:'g',cat:'carb',prot:10,short:'Noodles'},{n:'Savoy cabbage',q:250,u:'g',cat:'veg',prot:3,short:'Cabbage'},{n:'Kale',q:120,u:'g',cat:'veg',prot:4,short:'Kale'},{n:'Carrots',q:100,u:'g',cat:'veg',prot:1,short:'Carrots'},{n:'Peanut butter',q:50,u:'g',cat:'sauce',prot:12},{n:'Lime',q:1,u:'',cat:'sauce',prot:0},{n:'Chilli flakes',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Cook 160 g dried noodles, reserving 4 tbsp cooking water.','Whisk 50 g peanut butter, the juice of 1 lime, 1 tsp chilli flakes and the reserved noodle water into a silky sauce.','Stir-fry 250 g shredded savoy cabbage, 120 g kale and 100 g carrot ribbons for 4 minutes.','Toss in one 167 g portion of prepared leftover beef, the noodles and peanut-lime sauce until hot and glossy.'] },
    'Sesame-Ginger Kale Fried Rice': { cuisine:'Asian-inspired · Leftovers', time:'15 min', kcal:495, base:2, protein:50, fiber:9, slug:'sesame-ginger-kale-fried-rice',
      ingredients:[{n:'Prepared leftover beef',q:167,u:'g',cat:'protein',prot:42,short:'Beef'},{n:'Cooked jasmine rice',q:300,u:'g',cat:'carb',prot:9,short:'Rice'},{n:'Kale',q:100,u:'g',cat:'veg',prot:3,short:'Kale'},{n:'Spinach',q:120,u:'g',cat:'veg',prot:4,short:'Spinach'},{n:'Red cabbage',q:150,u:'g',cat:'veg',prot:2,short:'Cabbage'},{n:'Parsley',q:15,u:'g',cat:'veg',prot:1},{n:'Fresh ginger',q:20,u:'g',cat:'sauce',prot:0},{n:'Sesame oil',q:2,u:'tsp',cat:'sauce',prot:0}],
      method:['Fry 20 g finely grated fresh ginger in 2 tsp sesame oil for 30 seconds.','Add 100 g kale, 120 g spinach and 150 g shredded red cabbage; stir-fry until softened.','Add 300 g cold cooked jasmine rice and one 167 g portion of prepared leftover beef; spread it out briefly to toast the rice.','Toss until piping hot, then fold through 15 g parsley before dividing between two containers.'] },
    'Chicken Larb Bulk Prep': { cuisine:'Thai · Bulk prep', time:'55 min', kcal:410, base:10, protein:250, fiber:4, slug:'chicken-larb-bulk-prep',
      ingredients:[{n:'Chicken mince',q:2000,u:'g',cat:'protein',prot:380,short:'Chicken'},{n:'Jasmine rice, dry',q:160,u:'g',cat:'carb',prot:12,short:'Rice'},{n:'Spring onions',q:8,u:'',cat:'veg',prot:2},{n:'Fresh coriander',q:50,u:'g',cat:'veg',prot:2},{n:'Garlic',q:10,u:'cloves',cat:'sauce',prot:0},{n:'Chilli flakes',q:5,u:'tsp',cat:'sauce',prot:0},{n:'Fish sauce',q:6,u:'tbsp',cat:'sauce',prot:6},{n:'Light soy sauce',q:6,u:'tbsp',cat:'sauce',prot:6},{n:'Caster sugar',q:30,u:'g',cat:'sauce',prot:0},{n:'Limes',q:6,u:'',cat:'sauce',prot:0}],
      method:['Dry-toast 160 g jasmine rice in a frying pan for 4–5 min until golden and fragrant; crush it to a sandy powder, reserving 20 g for the cabbage cups.','Cook 2 kg chicken mince in three batches over high heat until its moisture has evaporated and the edges are golden.','Mix 8 sliced spring onions, 10 minced garlic cloves, 5 tsp chilli flakes, 6 tbsp fish sauce, 6 tbsp light soy sauce, 30 g caster sugar and the juice of 6 limes until the sugar dissolves.','Return the chicken to the pan, add the measured dressing and simmer for 1 min. Fold through 50 g chopped coriander and 140 g toasted rice powder.','Cool promptly, then portion into ten 160 g servings; refrigerate up to 3 days and freeze the Thursday and Friday portions on prep day.'] },
    'Chicken Larb Tahini Noodles': { cuisine:'Thai · Lunch', time:'15 min', kcal:525, base:2, protein:54, fiber:7, slug:'chicken-larb-tahini-noodles',
      ingredients:[{n:'Prepared chicken larb',q:320,u:'g',cat:'protein',prot:50,short:'Chicken'},{n:'Dried udon noodles',q:170,u:'g',cat:'carb',prot:12,short:'Noodles'},{n:'Red cabbage, shredded',q:160,u:'g',cat:'veg',prot:2,short:'Cabbage'},{n:'Carrots',q:2,u:'',cat:'veg',prot:1,short:'Carrots'},{n:'Spring onions',q:2,u:'',cat:'veg',prot:0},{n:'Tahini',q:60,u:'g',cat:'sauce',prot:10},{n:'Light soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Rice vinegar',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Sesame oil',q:2,u:'tsp',cat:'sauce',prot:0}],
      method:['Cook 170 g dried udon noodles to the packet instructions, then drain and rinse briefly so they stay springy.','Shred 160 g red cabbage, ribbon 2 carrots and finely slice 2 spring onions — use the same vegetable prep box you made for the rice bowls.','Whisk 60 g tahini, 1 tbsp light soy sauce, 1 tbsp rice vinegar, 2 tsp sesame oil and 4 tbsp warm water into a glossy dressing.','Toss the noodles, cabbage and carrots through the measured dressing. Reheat 320 g prepared chicken larb until piping hot, then spoon it over.','Finish with the 2 sliced spring onions. Keep the noodle base and larb separate until serving for the best texture.'] },
    'Chicken Larb Crunchy Rice Bowl': { cuisine:'Thai · Lunch', time:'12 min', kcal:500, base:2, protein:52, fiber:6, slug:'chicken-larb-crunchy-rice-bowl',
      ingredients:[{n:'Prepared chicken larb',q:320,u:'g',cat:'protein',prot:50,short:'Chicken'},{n:'Cooked jasmine rice',q:260,u:'g',cat:'carb',prot:8,short:'Rice'},{n:'Cucumber',q:1,u:'',cat:'veg',prot:1,short:'Cucumber'},{n:'Carrots',q:2,u:'',cat:'veg',prot:1,short:'Carrots'},{n:'Red cabbage, shredded',q:160,u:'g',cat:'veg',prot:2,short:'Cabbage'},{n:'Lime',q:1,u:'',cat:'sauce',prot:0},{n:'Fish sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Chilli flakes',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Reheat 320 g prepared chicken larb and 260 g cooked jasmine rice until steaming hot.','Shred 160 g red cabbage, ribbon 2 carrots and slice 1 cucumber.','Mix the juice of 1 lime, 1 tbsp fish sauce, 1 tsp chilli flakes and 1 tbsp water for a quick sharp dressing.','Build bowls with the rice, larb and crunchy vegetables; drizzle over all of the measured dressing just before eating.'] },
    'Chicken Larb Cabbage Cups': { cuisine:'Thai · Light meal', time:'10 min', kcal:430, base:2, protein:50, fiber:7, slug:'chicken-larb-cabbage-cups',
      ingredients:[{n:'Prepared chicken larb',q:320,u:'g',cat:'protein',prot:50,short:'Chicken'},{n:'Red cabbage leaves',q:300,u:'g',cat:'veg',prot:3,short:'Cabbage'},{n:'Cucumber',q:1,u:'',cat:'veg',prot:1,short:'Cucumber'},{n:'Carrots',q:2,u:'',cat:'veg',prot:1,short:'Carrots'},{n:'Cooked jasmine rice',q:180,u:'g',cat:'carb',prot:5,short:'Rice'},{n:'Lime',q:1,u:'',cat:'sauce',prot:0},{n:'Toasted rice powder',q:2,u:'tbsp',cat:'sauce',prot:2}],
      method:['Peel away 300 g of the largest cabbage leaves and slice the remaining cabbage; slice 1 cucumber and ribbon 2 carrots for a crunchy shared salad.','Reheat 320 g prepared chicken larb until piping hot, then loosen it with the juice of 1 lime.','Spoon the larb into the cabbage leaves with the sliced cucumber, carrot and remaining cabbage.','Serve with 180 g cooked jasmine rice alongside and finish with the reserved 2 tbsp toasted rice powder for crunch.'] },
    'Sticky Beef Mince Bulk Prep': { cuisine:'Thai-inspired · Bulk prep', time:'45 min', kcal:450, base:10, protein:250, fiber:2, slug:'sticky-beef-bulk-prep',
      ingredients:[{n:'Lean beef mince',q:2000,u:'g',cat:'protein',prot:420,short:'Beef'},{n:'Garlic',q:10,u:'cloves',cat:'sauce',prot:0},{n:'Spring onions',q:6,u:'',cat:'veg',prot:1},{n:'Red chillies',q:4,u:'',cat:'veg',prot:0},{n:'Oyster sauce',q:4,u:'tbsp',cat:'sauce',prot:4},{n:'Light soy sauce',q:4,u:'tbsp',cat:'sauce',prot:4},{n:'Sriracha',q:4,u:'tbsp',cat:'sauce',prot:0},{n:'Rice vinegar',q:4,u:'tbsp',cat:'sauce',prot:0}],
      method:['Cook 2 kg lean beef mince in three batches over high heat, leaving each batch undisturbed until crisp at the edges.','Stir together 10 minced garlic cloves, 6 sliced spring onions, 4 sliced red chillies, 4 tbsp oyster sauce, 4 tbsp light soy sauce, 4 tbsp sriracha and 4 tbsp rice vinegar.','Return all 2 kg of cooked beef to the pan, add the measured sauce and reduce until glossy and sticky.','Cool promptly, then portion into ten 160 g servings. Refrigerate up to 3 days and freeze the Thursday and Friday portions on prep day.'] },
    'Sticky Beef Mince Brothy Rice': { cuisine:'Thai-inspired · Main', time:'25 min', kcal:510, base:4, protein:112, fiber:5, slug:'sticky-beef-brothy-rice',
      ingredients:[{n:'Beef stock (for broth)',q:700,u:'ml',cat:'sauce',prot:5},{n:'Beef stock (for sticky sauce)',q:40,u:'ml',cat:'sauce',prot:0},{n:'Fresh ginger',q:10,u:'g',cat:'sauce',prot:0},{n:'Star anise',q:1,u:'',cat:'sauce',prot:0},{n:'Cardamom pods',q:4,u:'',cat:'sauce',prot:0},{n:'Beef mince',q:500,u:'g',cat:'protein',prot:105,short:'Beef'},{n:'Oyster sauce',q:2,u:'tbsp',cat:'sauce',prot:2},{n:'Caster sugar',q:1.5,u:'tbsp',cat:'sauce',prot:0},{n:'Sriracha',q:2,u:'tbsp',cat:'sauce',prot:0},{n:'Light soy sauce',q:2,u:'tbsp',cat:'sauce',prot:2},{n:'Rice vinegar',q:2,u:'tbsp',cat:'sauce',prot:0},{n:'Butter',q:2,u:'tbsp',cat:'sauce',prot:0},{n:'Cooked jasmine rice',q:500,u:'g',cat:'carb',prot:15,short:'Rice'},{n:'Brown onion',q:1,u:'',cat:'veg',prot:1},{n:'Fresh coriander',q:15,u:'g',cat:'veg',prot:1},{n:'Red chilli',q:1,u:'',cat:'veg',prot:0},{n:'Limes',q:2,u:'',cat:'sauce',prot:0},{n:'Fish sauce',q:1,u:'to taste',cat:'sauce',prot:0}],
      method:['Thinly slice 1 brown onion and soak it in ice-cold water. Bash 10 g fresh ginger and lightly crush 4 cardamom pods.','Toast 1 star anise and 4 crushed cardamom pods in a saucepan over medium-high heat for 1 min. Add the ginger with a little oil for 30 sec, then add 700 ml beef stock; bring to the boil and gently simmer.','Brown 500 g beef mince in oil over high heat, breaking it up until crisp at the edges.','Mix 2 tbsp oyster sauce, 1½ tbsp caster sugar, 2 tbsp sriracha, 40 ml beef stock, 2 tbsp light soy sauce and 2 tbsp rice vinegar. Add to the beef, reduce until sticky, season, then stir through 2 tbsp butter.','Divide 500 g hot cooked jasmine rice between four bowls. Season the aromatic broth with lime juice and fish sauce, ladle over the rice and top with sticky beef.','Finish with drained onion, 15 g coriander, 1 sliced red chilli and lime wedges.'] },
    'Sticky Beef Mince Crunchy Rice Bowl': { cuisine:'Thai-inspired · Lunch', time:'12 min', kcal:500, base:2, protein:54, fiber:6, slug:'sticky-beef-crunchy-rice-bowl',
      ingredients:[{n:'Prepared sticky beef mince',q:320,u:'g',cat:'protein',prot:50,short:'Beef'},{n:'Cooked jasmine rice',q:260,u:'g',cat:'carb',prot:8,short:'Rice'},{n:'Cucumber',q:1,u:'',cat:'veg',prot:1,short:'Cucumber'},{n:'Carrots',q:2,u:'',cat:'veg',prot:1,short:'Carrots'},{n:'Red cabbage, shredded',q:160,u:'g',cat:'veg',prot:2,short:'Cabbage'},{n:'Lime',q:1,u:'',cat:'sauce',prot:0}],
      method:['Reheat 320 g prepared sticky beef mince and 260 g cooked jasmine rice until steaming hot.','Use 160 g shredded red cabbage, 2 ribboned carrots and 1 sliced cucumber from the shared vegetable prep box.','Build bowls with the rice, sticky beef and crunchy vegetables.','Finish each bowl with half the juice of 1 lime.'] },
    'Pad Thai': { cuisine:'Thai · Main', time:'20 min', kcal:475, base:2, protein:30, fiber:5, slug:'pad-thai',
      ingredients:[{n:'Firm tofu',q:150,u:'g',cat:'protein',prot:22,short:'Tofu'},{n:'Egg',q:1,u:'',cat:'protein',prot:6},{n:'Flat rice noodles',q:120,u:'g',cat:'carb',prot:4,short:'Noodles'},{n:'Beansprouts',q:80,u:'g',cat:'veg',prot:2,short:'Sprouts'},{n:'Spring onions',q:2,u:'',cat:'veg',prot:0},{n:'Tamarind paste',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Fish sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Palm sugar',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Roasted peanuts',q:2,u:'tbsp',cat:'sauce',prot:5},{n:'Lime',q:0.5,u:'',cat:'sauce',prot:0}],
      method:['Soak the noodles in warm water for 10 min until pliable, then drain.','Stir tamarind, fish sauce and palm sugar into a quick sauce.','Fry cubed tofu in a hot wok until crisp; push to one side.','Crack in the egg and scramble lightly.','Add noodles and sauce; toss over high heat until glossy.','Fold through beansprouts and spring onion off the heat.','Finish with crushed peanuts and a squeeze of lime.'] },
    'Tom Kha Salmon': { cuisine:'Thai · Main', time:'30 min', kcal:450, base:2, protein:56, fiber:5, slug:'tom-kha-salmon',
      ingredients:[{n:'Salmon fillet',q:130,u:'g',cat:'protein',prot:29,short:'Salmon'},{n:'Cooked jasmine rice',q:100,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Oyster mushrooms',q:70,u:'g',cat:'veg',prot:2,short:'Mushrooms'},{n:'Cherry tomatoes',q:6,u:'',cat:'veg',prot:1},{n:'Coconut milk',q:200,u:'ml',cat:'sauce',prot:2},{n:'Galangal or ginger',q:3,u:'slices',cat:'sauce',prot:0},{n:'Lemongrass stalk',q:1,u:'',cat:'sauce',prot:0},{n:'Fish sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Lime',q:1,u:'',cat:'sauce',prot:0}],
      method:['Bruise the lemongrass and simmer with galangal in the coconut milk for 5 min.','Add mushrooms and tomatoes; simmer 3 min until just tender.','Season the broth with fish sauce — it should taste rich, salty, sour.','Slip in chunked salmon and poach gently 4–5 min. Never boil.','Kill the heat, squeeze in lime, taste and adjust.','Serve over warm rice with coriander on top.'] },
    'Ginger Soy Salmon Bowl': { cuisine:'Japanese · Main', time:'25 min', kcal:470, base:2, protein:58, fiber:5, slug:'ginger-soy-salmon',
      ingredients:[{n:'Salmon fillet, skin-on',q:130,u:'g',cat:'protein',prot:29,short:'Salmon'},{n:'Cooked jasmine rice',q:100,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Pak choi',q:1,u:'head',cat:'veg',prot:2,short:'Pak choi'},{n:'Spring onions',q:2,u:'',cat:'veg',prot:0},{n:'Soy sauce',q:2,u:'tbsp',cat:'sauce',prot:2},{n:'Fresh ginger, grated',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Garlic, grated',q:1,u:'clove',cat:'sauce',prot:0},{n:'Honey',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Rice vinegar',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Stir soy, ginger, garlic, honey and vinegar into a marinade; coat the salmon 10 min.','Steam or blanch the pak choi until the stems just give.','Sear salmon skin-side down 4 min in a hot pan; flip for 2.','Pour in the remaining marinade and let it bubble to a glaze.','Serve over rice with pak choi; spoon glaze over and scatter spring onion.'] },
    'Thai Basil Tofu': { cuisine:'Thai · Main', time:'20 min', kcal:460, base:2, protein:44, fiber:6, slug:'thai-basil-tofu',
      ingredients:[{n:'Firm tofu',q:180,u:'g',cat:'protein',prot:26,short:'Tofu'},{n:'Cooked jasmine rice',q:100,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Green beans',q:80,u:'g',cat:'veg',prot:2,short:'Beans'},{n:'Thai basil leaves',q:1,u:'handful',cat:'veg',prot:0},{n:'Garlic',q:2,u:'cloves',cat:'sauce',prot:0},{n:'Red chilli',q:1,u:'',cat:'sauce',prot:0},{n:'Soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Oyster sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Palm sugar',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Press and crumble the tofu into rough mince-sized pieces.','Pound garlic and chilli into a coarse paste.','Fry the paste in a hot wok 30 sec until fragrant.','Add tofu and green beans; stir-fry 4–5 min until the tofu picks up colour.','Season with soy, oyster sauce and palm sugar.','Kill the heat and fold through a big handful of Thai basil.','Serve over rice — fried egg on top optional but correct.'] },
    'Mapo Tofu Rice': { cuisine:'Sichuan · Main', time:'25 min', kcal:480, base:2, protein:40, fiber:5, slug:'mapo-tofu',
      ingredients:[{n:'Silken-firm tofu',q:200,u:'g',cat:'protein',prot:24,short:'Tofu'},{n:'Cooked jasmine rice',q:100,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Spring onions',q:3,u:'',cat:'veg',prot:1,short:'Spring onion'},{n:'Doubanjiang (chilli bean paste)',q:1.5,u:'tbsp',cat:'sauce',prot:2},{n:'Garlic, minced',q:2,u:'cloves',cat:'sauce',prot:0},{n:'Ginger, minced',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Sichuan peppercorns, ground',q:0.5,u:'tsp',cat:'sauce',prot:0},{n:'Cornstarch',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Stock or water',q:150,u:'ml',cat:'sauce',prot:0}],
      method:['Cube the tofu and rest it in warm salted water while you cook — it firms and seasons it.','Fry doubanjiang, garlic and ginger in oil until the oil turns red.','Add stock and bring to a simmer.','Slide in the drained tofu; simmer 5 min, nudging — never stirring hard.','Thicken with the cornstarch slurry.','Finish with ground Sichuan pepper and spring onion; serve over rice.'] },
    'Chicken Satay Skewers': { cuisine:'Malaysian · Main', time:'35 min', kcal:480, base:2, protein:60, fiber:4, slug:'chicken-satay',
      ingredients:[{n:'Chicken thigh',q:300,u:'g',cat:'protein',prot:56,short:'Chicken'},{n:'Cooked jasmine rice',q:100,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Cucumber',q:0.5,u:'',cat:'veg',prot:0,short:'Cucumber'},{n:'Red onion',q:0.5,u:'',cat:'veg',prot:0},{n:'Peanut butter',q:2,u:'tbsp',cat:'sauce',prot:7},{n:'Coconut milk',q:100,u:'ml',cat:'sauce',prot:1},{n:'Curry powder',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Lime',q:0.5,u:'',cat:'sauce',prot:0}],
      method:['Cube the chicken and marinate 15 min in curry powder, soy and a spoon of coconut milk.','Thread onto skewers — don\u2019t pack too tight, they cook more evenly loose.','Whisk peanut butter, remaining coconut milk and lime into a satay sauce; warm gently.','Grill or pan-sear skewers 3–4 min a side until charred at the edges.','Serve over rice with cucumber and red onion; pour the satay sauce over everything.'] },
    'Hainanese Chicken Rice': { cuisine:'Singaporean · Main', time:'50 min', kcal:520, base:2, protein:58, fiber:3, slug:'hainanese-chicken',
      ingredients:[{n:'Chicken thigh, skin-on',q:300,u:'g',cat:'protein',prot:56,short:'Chicken'},{n:'Jasmine rice',q:120,u:'g',cat:'carb',prot:4,short:'Rice'},{n:'Cucumber',q:0.5,u:'',cat:'veg',prot:0,short:'Cucumber'},{n:'Ginger',q:4,u:'slices',cat:'sauce',prot:0},{n:'Garlic',q:3,u:'cloves',cat:'sauce',prot:0},{n:'Spring onions',q:2,u:'',cat:'sauce',prot:0},{n:'Sesame oil',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Chilli, ginger & lime dip',q:2,u:'tbsp',cat:'sauce',prot:0}],
      method:['Poach the chicken with ginger, garlic and spring onion at a bare simmer, 25 min.','Rest the chicken in the hot broth 10 min, then brush with sesame oil.','Rinse the rice and cook it in the poaching broth — this is the whole point.','Blitz chilli, ginger and lime into the dipping sauce.','Slice the chicken and serve over the fragrant rice with cucumber and the dip.'] },
    'Char Siu Pork Rice': { cuisine:'Cantonese · Main', time:'40 min', kcal:540, base:2, protein:54, fiber:3, slug:'char-siu-pork',
      ingredients:[{n:'Pork shoulder or neck',q:300,u:'g',cat:'protein',prot:52,short:'Pork'},{n:'Cooked jasmine rice',q:100,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Pak choi',q:1,u:'head',cat:'veg',prot:2,short:'Pak choi'},{n:'Hoisin sauce',q:2,u:'tbsp',cat:'sauce',prot:1},{n:'Soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Honey',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Chinese five spice',q:0.5,u:'tsp',cat:'sauce',prot:0},{n:'Garlic, grated',q:1,u:'clove',cat:'sauce',prot:0}],
      method:['Whisk hoisin, soy, honey, five spice and garlic into a marinade.','Coat the pork and marinate at least 20 min (overnight on prep day is better).','Roast at 200°C for 25–30 min, basting twice with the leftover marinade.','Rest 5 min — the glaze sets into that lacquered char siu edge.','Blanch the pak choi. Slice the pork thickly and serve over rice, glaze spooned over.'] },
    'Lemongrass Pork Bowl': { cuisine:'Vietnamese · Main', time:'25 min', kcal:495, base:2, protein:50, fiber:4, slug:'lemongrass-pork',
      ingredients:[{n:'Pork mince or thin-sliced shoulder',q:280,u:'g',cat:'protein',prot:48,short:'Pork'},{n:'Cooked jasmine rice',q:100,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Cucumber',q:0.5,u:'',cat:'veg',prot:0,short:'Cucumber'},{n:'Carrot, pickled ribbons',q:1,u:'',cat:'veg',prot:1},{n:'Lemongrass, finely minced',q:2,u:'stalks',cat:'sauce',prot:0},{n:'Fish sauce',q:1.5,u:'tbsp',cat:'sauce',prot:1},{n:'Sugar',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Garlic',q:2,u:'cloves',cat:'sauce',prot:0},{n:'Lime',q:0.5,u:'',cat:'sauce',prot:0}],
      method:['Mix pork with lemongrass, garlic, half the fish sauce and sugar; rest 10 min.','Quick-pickle the carrot in vinegar and a pinch of sugar.','Sear the pork in a screaming-hot pan until caramelised at the edges, 5–6 min.','Balance the remaining fish sauce with lime into a nuoc-cham-style dressing.','Build the bowl: rice, pork, cucumber, pickled carrot; dressing over the top.'] },
    'Beef Pad Krapow': { cuisine:'Thai · Main', time:'15 min', kcal:510, base:2, protein:54, fiber:4, slug:'beef-krapow',
      ingredients:[{n:'Beef mince',q:280,u:'g',cat:'protein',prot:50,short:'Beef'},{n:'Cooked jasmine rice',q:100,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Green beans',q:80,u:'g',cat:'veg',prot:2,short:'Beans'},{n:'Holy or Thai basil',q:1,u:'handful',cat:'veg',prot:0},{n:'Garlic',q:3,u:'cloves',cat:'sauce',prot:0},{n:'Bird\u2019s eye chilli',q:2,u:'',cat:'sauce',prot:0},{n:'Oyster sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Fish sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Egg (fried, per bowl)',q:1,u:'',cat:'protein',prot:6}],
      method:['Pound garlic and chilli roughly — uneven is authentic.','Get the wok smoking; fry the paste 20 sec.','Add beef and press flat; let it sear before breaking it up.','Toss in green beans, oyster and fish sauce; stir-fry 2 min.','Off the heat, fold through the basil until just wilted.','Serve over rice with a crispy-edged fried egg on top.'] },
    'Korean Beef Bibimbap': { cuisine:'Korean · Main', time:'30 min', kcal:525, base:2, protein:52, fiber:7, slug:'beef-bibimbap',
      ingredients:[{n:'Beef mince or bulgogi-cut',q:250,u:'g',cat:'protein',prot:46,short:'Beef'},{n:'Egg',q:1,u:'',cat:'protein',prot:6},{n:'Day-old jasmine rice',q:120,u:'g',cat:'carb',prot:4,short:'Rice'},{n:'Baby spinach',q:80,u:'g',cat:'veg',prot:2,short:'Spinach'},{n:'Carrot, julienned',q:1,u:'',cat:'veg',prot:1},{n:'Beansprouts',q:60,u:'g',cat:'veg',prot:2},{n:'Gochujang',q:1.5,u:'tbsp',cat:'sauce',prot:1},{n:'Soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Sesame oil',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Marinate the beef briefly in soy and a little sesame oil.','Sear the beef hard until browned and glossy.','Wilt spinach, sauté carrot, blanch beansprouts — keep each pile separate.','Warm the rice in the pan so the bottom crisps a little.','Arrange beef and vegetables in sections; fry the egg and crown the bowl.','Serve with gochujang thinned with sesame oil — mix at the table.'] },
    'Prawn Pad See Ew': { cuisine:'Thai · Main', time:'20 min', kcal:495, base:2, protein:48, fiber:4, slug:'prawn-pad-see-ew',
      ingredients:[{n:'Raw prawns, peeled',q:250,u:'g',cat:'protein',prot:42,short:'Prawns'},{n:'Egg',q:1,u:'',cat:'protein',prot:6},{n:'Wide rice noodles',q:150,u:'g',cat:'carb',prot:4,short:'Noodles'},{n:'Chinese broccoli or pak choi',q:100,u:'g',cat:'veg',prot:2,short:'Greens'},{n:'Dark soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Light soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Oyster sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Garlic',q:2,u:'cloves',cat:'sauce',prot:0},{n:'White pepper',q:1,u:'pinch',cat:'sauce',prot:0}],
      method:['Separate the noodles gently and let them come to room temp.','Fry garlic in a very hot wok; add prawns and sear 1 min.','Push aside, crack in the egg and scramble.','Add noodles and both soys with the oyster sauce; toss until the noodles char in spots.','Add the greens; stir-fry 1 min more until stems are tender-crisp.','Finish with white pepper. Eat immediately — pad see ew waits for no one.'] },
    'Garlic Prawn Donburi': { cuisine:'Japanese · Main', time:'20 min', kcal:465, base:2, protein:46, fiber:3, slug:'garlic-prawn-don',
      ingredients:[{n:'Raw prawns, peeled',q:250,u:'g',cat:'protein',prot:42,short:'Prawns'},{n:'Cooked jasmine rice',q:110,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Edamame',q:60,u:'g',cat:'veg',prot:7,short:'Edamame'},{n:'Spring onions',q:2,u:'',cat:'veg',prot:0},{n:'Garlic, sliced',q:3,u:'cloves',cat:'sauce',prot:0},{n:'Butter',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Mirin',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Shichimi togarashi',q:1,u:'pinch',cat:'sauce',prot:0}],
      method:['Pat the prawns very dry so they sear rather than steam.','Melt butter and fry the sliced garlic until pale gold — not brown.','Add prawns; cook 1–2 min a side until just pink.','Deglaze with soy and mirin; let it bubble into a glossy pan sauce.','Serve over rice with edamame; scatter spring onion and a pinch of shichimi.'] },
    'Matcha Chia Pudding': { cuisine:'Breakfast', time:'5 min + overnight', kcal:290, base:2, protein:24, fiber:14, slug:'matcha-chia',
      ingredients:[{n:'Greek yogurt',q:150,u:'g',cat:'protein',prot:15,short:'Yogurt'},{n:'Chia seeds',q:3,u:'tbsp',cat:'carb',prot:5,short:'Chia'},{n:'Mixed berries',q:80,u:'g',cat:'veg',prot:1,short:'Berries'},{n:'Milk of choice',q:200,u:'ml',cat:'sauce',prot:7},{n:'Matcha powder',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Honey',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Whisk matcha into a splash of warm milk until no lumps remain.','Stir in the rest of the milk, chia, and honey.','Rest 10 min, stir once more — this stops the chia clumping at the bottom.','Refrigerate overnight in jars (Sunday prep\u2019s best friend).','Top with yogurt and berries in the morning. Keeps 4 days.'] },
    'Banana Matcha Smoothie': { cuisine:'Breakfast', time:'5 min', kcal:330, base:2, protein:28, fiber:8, slug:'banana-smoothie',
      ingredients:[{n:'Protein powder, vanilla',q:1,u:'scoop',cat:'protein',prot:24,short:'Protein'},{n:'Frozen banana',q:1,u:'',cat:'carb',prot:1,short:'Banana'},{n:'Baby spinach',q:30,u:'g',cat:'veg',prot:1,short:'Spinach'},{n:'Milk of choice',q:250,u:'ml',cat:'sauce',prot:8},{n:'Matcha powder',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Peanut butter',q:1,u:'tsp',cat:'sauce',prot:2}],
      method:['Freeze the banana in chunks on prep day — it makes the smoothie thick, not icy.','Blend milk, spinach and matcha first until completely smooth.','Add banana, protein and peanut butter; blend 30 sec more.','Pour thick. Drink within 15 min — matcha oxidises fast.'] },
    'Coconut Mango Oats': { cuisine:'Breakfast', time:'5 min + overnight', kcal:375, base:2, protein:18, fiber:9, slug:'mango-oats',
      ingredients:[{n:'Greek yogurt',q:100,u:'g',cat:'protein',prot:10,short:'Yogurt'},{n:'Rolled oats',q:50,u:'g',cat:'carb',prot:6,short:'Oats'},{n:'Mango, diced',q:100,u:'g',cat:'veg',prot:1,short:'Mango'},{n:'Coconut milk',q:150,u:'ml',cat:'sauce',prot:1},{n:'Chia seeds',q:1,u:'tbsp',cat:'sauce',prot:2},{n:'Toasted coconut flakes',q:1,u:'tbsp',cat:'sauce',prot:0}],
      method:['Stir oats, chia and coconut milk together in a jar.','Refrigerate overnight — they\u2019ll soften into a pudding.','Layer with yogurt and diced mango in the morning.','Finish with toasted coconut. Keeps 3 days lidded.'] },
    'Smoked Salmon Eggs': { cuisine:'Breakfast', time:'10 min', kcal:315, base:2, protein:34, fiber:2, slug:'salmon-eggs',
      ingredients:[{n:'Eggs',q:3,u:'',cat:'protein',prot:18,short:'Eggs'},{n:'Smoked salmon',q:60,u:'g',cat:'protein',prot:13,short:'Salmon'},{n:'Wholegrain toast',q:1,u:'slice',cat:'carb',prot:4,short:'Toast'},{n:'Chives',q:1,u:'tbsp',cat:'veg',prot:0},{n:'Butter',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Black pepper & lemon',q:1,u:'pinch',cat:'sauce',prot:0}],
      method:['Whisk the eggs well; season with pepper only (the salmon brings the salt).','Melt butter over low heat — low is the whole secret.','Stir the eggs slowly into soft, glossy folds; pull off the heat while slightly loose.','Pile onto toast, drape the smoked salmon over, scatter chives and a squeeze of lemon.'] },
    'Edamame Sesame': { cuisine:'Snack', time:'5 min', kcal:168, base:2, protein:18, fiber:8, slug:'edamame-sesame',
      ingredients:[{n:'Edamame in pods',q:200,u:'g',cat:'protein',prot:17,short:'Edamame'},{n:'Sesame seeds, toasted',q:1,u:'tsp',cat:'sauce',prot:1},{n:'Flaky salt',q:1,u:'pinch',cat:'sauce',prot:0},{n:'Soy sauce',q:1,u:'tsp',cat:'sauce',prot:1},{n:'Chilli flakes',q:1,u:'pinch',cat:'sauce',prot:0}],
      method:['Boil the pods 4 min in well-salted water (or microwave from frozen, 2 min).','Drain and toss hot with soy, sesame and chilli.','Eat by squeezing the beans from the pods — the seasoning stays on your fingers, as intended.'] },
    'Rice Cakes & PB': { cuisine:'Snack', time:'3 min', kcal:330, base:2, protein:12, fiber:5, slug:'rice-cakes-pb',
      ingredients:[{n:'Peanut butter',q:2,u:'tbsp',cat:'protein',prot:8,short:'PB'},{n:'Rice cakes',q:2,u:'',cat:'carb',prot:2,short:'Rice cakes'},{n:'Banana',q:1,u:'',cat:'veg',prot:1,short:'Banana'},{n:'Cinnamon',q:1,u:'pinch',cat:'sauce',prot:0},{n:'Honey',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Spread the peanut butter right to the edges.','Shingle banana coins over the top.','Dust with cinnamon; drizzle honey only on gym days.'] },
    'Boiled Eggs & Apple': { cuisine:'Snack', time:'12 min (prep-ahead)', kcal:220, base:2, protein:14, fiber:4, slug:'eggs-apple',
      ingredients:[{n:'Eggs',q:2,u:'',cat:'protein',prot:12,short:'Eggs'},{n:'Apple',q:1,u:'',cat:'veg',prot:0,short:'Apple'},{n:'Flaky salt',q:1,u:'pinch',cat:'sauce',prot:0},{n:'Everything bagel seasoning',q:1,u:'pinch',cat:'sauce',prot:0}],
      method:['Boil the eggs Sunday: cold start, 10 min, straight into iced water.','Store unpeeled — they keep a full week that way.','Peel, halve, season. Slice the apple fresh; it takes 30 seconds.'] },
    'Matcha Yogurt Cup': { cuisine:'Snack', time:'3 min', kcal:210, base:2, protein:20, fiber:3, slug:'matcha-yogurt',
      ingredients:[{n:'Greek yogurt',q:170,u:'g',cat:'protein',prot:17,short:'Yogurt'},{n:'Granola',q:2,u:'tbsp',cat:'carb',prot:2,short:'Granola'},{n:'Mixed berries',q:50,u:'g',cat:'veg',prot:1,short:'Berries'},{n:'Matcha powder',q:0.5,u:'tsp',cat:'sauce',prot:0},{n:'Honey',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Sift the matcha over the yogurt and swirl — don\u2019t fully mix, the streaks are the good part.','Sweeten with honey to taste.','Top with berries and granola just before eating so it stays crunchy.'] },
    'Crispy Tofu Poke': { cuisine:'Hawaiian-Japanese · Main', time:'25 min', kcal:490, base:2, protein:42, fiber:8, slug:'tofu-poke',
      ingredients:[{n:'Extra-firm tofu',q:180,u:'g',cat:'protein',prot:26,short:'Tofu'},{n:'Cooked sushi rice',q:110,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Edamame',q:60,u:'g',cat:'veg',prot:7,short:'Edamame'},{n:'Cucumber, diced',q:0.5,u:'',cat:'veg',prot:0},{n:'Avocado',q:0.5,u:'',cat:'veg',prot:1},{n:'Cornstarch',q:2,u:'tbsp',cat:'sauce',prot:0},{n:'Soy sauce',q:1.5,u:'tbsp',cat:'sauce',prot:2},{n:'Sriracha mayo',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Nori, shredded',q:0.5,u:'sheet',cat:'sauce',prot:0}],
      method:['Press the tofu well, cube it, and toss in cornstarch just before frying.','Pan-fry in a thin layer of oil until every side is deeply golden.','Season the warm rice with a splash of vinegar, sushi-style.','Build the bowl: rice, edamame, cucumber, avocado, crispy tofu.','Drizzle soy and sriracha mayo; finish with shredded nori.'] },
    'Salmon Sushi Bowl': { cuisine:'Japanese · Main', time:'20 min', kcal:470, base:2, protein:50, fiber:5, slug:'salmon-sushi-bowl',
      ingredients:[{n:'Salmon fillet',q:130,u:'g',cat:'protein',prot:29,short:'Salmon'},{n:'Cooked sushi rice',q:110,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Cucumber, ribboned',q:0.5,u:'',cat:'veg',prot:0,short:'Cucumber'},{n:'Avocado',q:0.5,u:'',cat:'veg',prot:1},{n:'Rice vinegar',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Pickled ginger',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Sesame seeds',q:1,u:'tsp',cat:'sauce',prot:1}],
      method:['Season warm rice with the vinegar and fan it to a shine.','Sear the salmon 3 min a side, or use cold-smoked if you prep-cooked.','Flake the salmon into large petals.','Arrange over rice with cucumber, avocado and pickled ginger.','Soy over the top; sesame to finish. Basically sushi, zero rolling.'] },
    'Sesame Tofu Soba': { cuisine:'Japanese · Main', time:'20 min', kcal:460, base:2, protein:40, fiber:7, slug:'sesame-tofu-soba',
      ingredients:[{n:'Firm tofu',q:160,u:'g',cat:'protein',prot:23,short:'Tofu'},{n:'Soba noodles',q:90,u:'g',cat:'carb',prot:9,short:'Soba'},{n:'Cucumber, julienned',q:0.5,u:'',cat:'veg',prot:0,short:'Cucumber'},{n:'Spring onions',q:2,u:'',cat:'veg',prot:0},{n:'Tahini or sesame paste',q:1.5,u:'tbsp',cat:'sauce',prot:3},{n:'Soy sauce',q:1,u:'tbsp',cat:'sauce',prot:1},{n:'Rice vinegar',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Chilli oil',q:1,u:'tsp',cat:'sauce',prot:0}],
      method:['Cook soba 4 min, then rinse under cold water until squeaky — this is not optional.','Whisk tahini, soy, vinegar and a splash of water into a pourable dressing.','Pan-fry tofu cubes until golden.','Toss noodles and cucumber through the sesame dressing.','Top with tofu, spring onion and chilli oil. Serve cold or room temp.'] },
    'Teriyaki Tofu Soba': { cuisine:'Japanese · Main', time:'25 min', kcal:475, base:2, protein:42, fiber:7, slug:'teriyaki-tofu-soba',
      ingredients:[{n:'Firm tofu',q:170,u:'g',cat:'protein',prot:24,short:'Tofu'},{n:'Soba noodles',q:90,u:'g',cat:'carb',prot:9,short:'Soba'},{n:'Broccoli florets',q:100,u:'g',cat:'veg',prot:3,short:'Broccoli'},{n:'Soy sauce',q:2,u:'tbsp',cat:'sauce',prot:2},{n:'Mirin',q:1,u:'tbsp',cat:'sauce',prot:0},{n:'Honey',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Ginger, grated',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Sesame seeds',q:1,u:'tsp',cat:'sauce',prot:1}],
      method:['Simmer soy, mirin, honey and ginger 2 min into a light teriyaki.','Cook and rinse the soba; steam the broccoli until just bright.','Sear pressed tofu cubes until golden on all faces.','Pour in the teriyaki and toss until every cube is lacquered.','Pile over soba and broccoli; spoon extra sauce; sesame on top.'] },
    'Honey Garlic Salmon': { cuisine:'Chinese-style · Main', time:'20 min', kcal:520, base:2, protein:58, fiber:4, slug:'honey-garlic-salmon',
      ingredients:[{n:'Salmon fillet',q:140,u:'g',cat:'protein',prot:31,short:'Salmon'},{n:'Cooked jasmine rice',q:110,u:'g',cat:'carb',prot:3,short:'Rice'},{n:'Broccoli florets',q:100,u:'g',cat:'veg',prot:3,short:'Broccoli'},{n:'Honey',q:1.5,u:'tbsp',cat:'sauce',prot:0},{n:'Soy sauce',q:1.5,u:'tbsp',cat:'sauce',prot:2},{n:'Garlic, minced',q:3,u:'cloves',cat:'sauce',prot:0},{n:'Sesame oil',q:1,u:'tsp',cat:'sauce',prot:0},{n:'Lemon',q:0.5,u:'',cat:'sauce',prot:0}],
      method:['Stir honey, soy, garlic and sesame oil together.','Sear the salmon 3 min skin-side down; flip for 1.','Pour the sauce around (not on) the fish; let it bubble and reduce 2 min.','Baste the salmon in the sticky glaze; add a squeeze of lemon.','Serve over rice with steamed broccoli, glaze spooned over everything.'] },
  };
  recipeAliases = { 'Ginger Soy Salmon':'Ginger Soy Salmon Bowl' };
  recipeOrder = ['Pumpkin Chia Seed Pudding','Apple & Yogurt','Honey Garlic Chicken & Miso Sesame Bean Salad','Ginger-Scallion Tofu & Enoki Soba'];
  resolveRecipe(name) {
    if (this.recipes[name]) return name;
    if (this.recipeAliases[name]) return this.recipeAliases[name];
    if (!this._altOf) { this._altOf={}; for (const p in this.proteinMenus) for (const d of this.proteinMenus[p]) d.alts.forEach(a=>{ this._altOf[a]=d.n; }); }
    if (this._altOf[name] && this.recipes[this._altOf[name]]) return this._altOf[name];
    const n = (name||'').toLowerCase();
    if (/katsu|curry/.test(n)) return 'Chicken Katsu Curry';
    if (/bibimbap/.test(n)) return 'Tofu Bibimbap';
    if (/pad thai|soba|poke|noodle|sesame tofu/.test(n)) return 'Pad Thai';
    if (/salmon|sushi|teriyaki|miso|ginger|honey/.test(n)) return 'Miso Salmon Bowl';
    return 'Miso Salmon Bowl';
  }
  openRecipe(name) {
    const key = this.resolveRecipe(name);
    this.setState({ currentRecipe:key, recipeGlow:true });
    clearTimeout(this._glowT);
    this._glowT = setTimeout(()=>this.setState({recipeGlow:false}), 1500);
  }
  componentDidMount() {
    this._dishClick = (ev) => {
      const el = ev.target.closest && ev.target.closest('[data-dish]');
      if (el) { ev.preventDefault(); this.openRecipe(el.getAttribute('data-dish')); }
    };
    document.addEventListener('click', this._dishClick);
  }
  componentWillUnmount() { document.removeEventListener('click', this._dishClick); clearTimeout(this._glowT); }
  timeline = [{t:'0:00',l:'Chia jars'},{t:'0:15',l:'Chicken thighs'},{t:'0:35',l:'Bean salad'},{t:'0:55',l:'Tofu & soba'},{t:'1:15',l:'Done'}];
  prepSections = [
    {id:'breakfast',title:'Pumpkin chia breakfasts',time:'20 min + chill',color:'#C8754E',steps:['Whisk the pumpkin chia mixture, wait 5 minutes, stir again, then divide it into 6 lidded jars — one breakfast each for Cynthia and Gabriel from Wednesday through Friday.','Keep the apple and pumpkin-seed toppings separate until breakfast so they stay crisp. Gabriel can add extra pumpkin seeds or Greek yogurt on the side.','Refrigerate all 6 jars; they hold well for the remaining 3 days.']},
    {id:'mains',title:'Batch lunches + dinner mise en place',time:'60 min',color:'#8FB3C8',steps:['The chicken recipe card is calculated from the Home protein goals. Use its current Total to prep amount with the listed chicken marinade; air-fry at 190°C / 375°F for 12–15 minutes, until the thickest thigh reaches 75°C.','Cool promptly, then divide the cooked chicken into 6 lunch portions, labelled for Cynthia and Gabriel on Wednesday, Thursday and Friday. Keep each chicken portion separate from the cold bean salad until serving.','Make the miso sesame bean salad 3× for those six lunches: 240 g drained chickpeas, 150 g edamame, 105 g snap peas and 150 g shredded cabbage, plus the dressing. Do not put the salad on the hot chicken.','This is not a three-day cooked dinner batch: press and cube 900 g tofu, wash 900 g pak choi and keep 600 g leftover enoki dry and refrigerated. Each night, cook one fresh two-person tofu-and-enoki soba recipe: 300 g tofu, 200 g enoki and 180 g soba.']},
    {id:'veg',title:'Lunch crunch & dinner greens',time:'20 min',color:'#7C8A5E',steps:['Shred purple cabbage, trim snap peas and slice green onions. Keep cabbage dry in one large container.','Mix the bean-salad dressing separately; toss the lunch salad only on prep day or the night before so it stays crunchy.','Wash and chop pak choi; keep it separate with the limes, ginger and sesame seeds ready for the tofu soba.']},
    {id:'store',title:'Storage guide',time:'5 min',color:'#382C24',steps:['Refrigerate all meals for the remaining 3 days. Cool cooked chicken promptly; keep cold food cold.','Reheat chicken until steaming and at least 75°C; keep the bean salad, apple toppings and fresh lime cold until serving. Cook tofu, soba, pak choi and enoki fresh at dinner for their best texture.','If Friday will run late, freeze its chicken portion now and thaw it overnight in the refrigerator on Thursday.']},
  ];

  state = { dayFilter:'all', selected:null, swapOpen:false, cooked:{}, week:null, segTab:'ingredients', swipeIdx:0, servings:2, openSection:'breakfast', prepDone:{}, currentRecipe:'Pumpkin Chia Seed Pudding', recipeGlow:false,
    people: {
      me: { name:'Cynthia', heightLabel:'163 cm', weight:60, age:30, workouts:3, activity:'desk job + 2–3 training sessions', goal:'fat loss + muscle gain', sex:'female', color:'#CB9C8B' },
      partner: { name:'Gabriel', heightLabel:'180 cm', weight:85, age:30, workouts:3, activity:'mostly seated + some walking + 2–3 training sessions', goal:'lean muscle gain + cardio support', sex:'male', color:'#8FB3C8' },
    },
  };

  // ---- goal math ----
  targetsFor(p) {
    const recomp = (p.goal||'').includes('fat loss');
    const protein = Math.round(p.weight*(recomp ? 2 : 1.6));
    const kcal = Math.round(p.weight*(recomp ? 27.5 : 32.35)/10)*10;
    const fiber = Math.round(p.weight*(recomp ? .5 : .45));
    return { kcal, protein, fiber };
  }
  mealProteinTarget(p) { return Math.round(this.targetsFor(p).protein/4); }
  portionScaleFor(recipe, person) {
    const reference = recipe.portionProtein || recipe.protein/(recipe.base||2);
    return this.mealProteinTarget(person)/reference;
  }
  weeklyRecipeTotals(recipe) {
    const week=this.state.week||this.buildWeek();
    const occurrences=this.slots.reduce((n,slot)=>n+(week[slot]||[]).filter(name=>name===this.recipeNameFor(recipe)).length,0);
    const people=[['Cynthia',this.state.people.me],['Gabriel',this.state.people.partner]];
    const out={occurrences,totalIngredients:{}};
    people.forEach(([label,person])=>{
      const scale=this.portionScaleFor(recipe,person), divisor=(recipe.base||2)*(recipe.weeklyReference?3:1), ingredients={};
      recipe.ingredients.forEach(ing=>{ ingredients[ing.n]=ing.q/divisor*scale; });
      out[label]={protein:this.mealProteinTarget(person),scale,ingredients};
    });
    recipe.ingredients.forEach(ing=>{
      out.totalIngredients[ing.n]=(out.Cynthia.ingredients[ing.n]+out.Gabriel.ingredients[ing.n])*occurrences;
    });
    return out;
  }
  recipeNameFor(recipe) { return Object.keys(this.recipes).find(name=>this.recipes[name]===recipe); }
  methodFor(recipe=this.curRec()) {
    if (recipe.weeklyDynamic) {
      const totals=this.weeklyRecipeTotals(recipe), fmt=n=>Math.round(n)+' g';
      const c=totals.Cynthia.ingredients['Firm tofu'], g=totals.Gabriel.ingredients['Firm tofu'];
      return [
        `The ingredients tab shows the three-dinner total, calculated from Home. Each night, use about ${fmt(c)} tofu for ${this.state.people.me.name} and ${fmt(g)} tofu for ${this.state.people.partner.name}.`,
        'Press and cube the tofu, then pan-sear it in a hot non-stick pan until golden on all sides.',
        'Trim the enoki root end, separate the clusters, then cook them in the hot pan for 3–4 minutes until tender and steaming; do not eat them raw.',
        'Cook the soba, adding pak choi for the final 2 minutes; drain well. Toss with ginger, green onions, soy sauce, rice vinegar and sesame oil, then top with the tofu and sesame seeds.',
      ];
    }
    if (!recipe.weeklyReference) return recipe.method;
    const totals=this.weeklyRecipeTotals(recipe), fmt=n=>Math.round(n)+' g';
    const c=totals.Cynthia.ingredients['Chicken thighs, raw'], g=totals.Gabriel.ingredients['Chicken thighs, raw'];
    return [
      `This Wednesday–Friday batch follows the protein goals on Home: ${this.state.people.me.name} gets ${totals.Cynthia.protein} g protein per lunch and ${this.state.people.partner.name} gets ${totals.Gabriel.protein} g. The Ingredients tab is recalculated from those goals.`,
      `Toss all ${fmt(totals.totalIngredients['Chicken thighs, raw'])} raw chicken with the chicken soy sauce, dark soy, oyster sauce, garlic powder, honey and sriracha. Air-fry at 190°C / 375°F for 12–15 minutes, until the thickest thigh reaches 75°C.`,
      'Toss the chickpeas, edamame, snap peas, cabbage and green onions with white miso, salad soy sauce, rice vinegar, lime juice, sesame oil, honey, red pepper flakes and sesame seeds.',
      `Cool the chicken promptly. Make three ${this.state.people.me.name} containers with about ${fmt(c)} chicken each and three ${this.state.people.partner.name} containers with about ${fmt(g)} chicken each; divide the salad in the same proportion. Reheat only the chicken until steaming; keep the salad cold and crisp.`,
    ];
  }
  updatePerson(key, patch) {
    const people = {...this.state.people, [key]: {...this.state.people[key], ...patch}};
    this.setState({ people });
    try { localStorage.setItem('sundo.people', JSON.stringify(people)); } catch(e) {}
  }

  componentWillMount() {
    const week = {}; this.slots.forEach(s => { week[s] = this.options[s].slice(); });
    // restore saved profile numbers (stored on-device only)
    let people = this.state.people;
    try {
      const saved = JSON.parse(localStorage.getItem('sundo.people') || 'null');
      if (saved && saved.me && saved.partner) people = { me: {...people.me, ...saved.me}, partner: {...people.partner, ...saved.partner} };
    } catch(e) {}
    this.setState({ week, people });
  }

  statusBar(dark) {
    const col = dark ? this.C.kinari : this.C.sumi;
    return e('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 24px 6px',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,fontWeight:600,color:col,flex:'0 0 auto'}},
      e('span',null,'9:41'),
      e('span',{style:{width:16,height:8,border:'1px solid '+col,borderRadius:2,display:'inline-block'}}));
  }

  // ============ WEEKLY ROTATION ============
  leftoverCandidates = ['Jasmine rice','Spring onions','Eggs','White miso paste','Baby spinach'];
  proteinOf = { 'Miso Salmon Bowl':'Salmon', 'Tofu Bibimbap':'Tofu', 'Chicken Katsu Curry':'Chicken', 'Pad Thai':'Tofu' };
  toggleLeftover(l) {
    const cur = this.state.leftoverPicks||{};
    this.setState({ leftoverPicks: {...cur, [l]: !cur[l]} });
  }
  proteinOptions = ['Salmon','Tofu','Chicken','Pork','Beef','Prawn'];
  proteinMenus = {
    Salmon:[
      { n:'Tom Kha Salmon', kcal:450, protein:38, uses:'Jasmine rice', alts:['Coconut Poached Salmon','Salmon Green Curry'] },
      { n:'Ginger Soy Salmon Bowl', kcal:470, protein:40, uses:'Spring onions', alts:['Miso Butter Salmon','Salmon Donburi'] },
    ],
    Tofu:[
      { n:'Thai Basil Tofu', kcal:460, protein:32, uses:'Jasmine rice', alts:['Green Curry Tofu','Crispy Chilli Tofu'] },
      { n:'Mapo Tofu Rice', kcal:480, protein:30, uses:'Eggs', alts:['Teriyaki Tofu Soba','Tofu Katsu'] },
    ],
    Chicken:[
      { n:'Chicken Larb Tahini Noodles', kcal:525, protein:54, uses:'Spring onions', alts:['Chicken Larb Crunchy Rice Bowl','Chicken Larb Cabbage Cups'] },
      { n:'Chicken Larb Bulk Prep', kcal:410, protein:50, uses:'Jasmine rice', alts:['Chicken Larb Tahini Noodles','Chicken Larb Crunchy Rice Bowl'] },
    ],
    Pork:[
      { n:'Char Siu Pork Rice', kcal:540, protein:38, uses:'Jasmine rice', alts:['Pork Larb Bowl','Ginger Pork Donburi'] },
      { n:'Lemongrass Pork Bowl', kcal:495, protein:36, uses:'Spring onions', alts:['Pork Bánh Mì Bowl','Pork Gyoza Bowl'] },
    ],
    Beef:[
      { n:'Sticky Beef Mince Brothy Rice', kcal:510, protein:58, uses:'Jasmine rice', alts:['Sticky Beef Mince Crunchy Rice Bowl','Beef Pad Krapow'] },
      { n:'Sticky Beef Mince Bulk Prep', kcal:450, protein:50, uses:'Spring onions', alts:['Sticky Beef Mince Brothy Rice','Sticky Beef Mince Crunchy Rice Bowl'] },
    ],
    Prawn:[
      { n:'Prawn Pad See Ew', kcal:495, protein:34, uses:'Spring onions', alts:['Drunken Noodles, Prawn','Prawn Fried Rice'] },
      { n:'Garlic Prawn Donburi', kcal:465, protein:36, uses:'Eggs', alts:['Prawn Laksa','Sesame Prawn Bowl'] },
    ],
  };
  kcalOf(name) {
    if (this.kcal[name]) return this.kcal[name];
    for (const p in this.proteinMenus) for (const d of this.proteinMenus[p]) { if (d.n===name || d.alts.includes(name)) return d.kcal; }
    return '';
  }
  dishSrc(name) {
    const key = this.resolveRecipe(name);
    // The five-day cards intentionally reuse existing offline dish photography until their new shoots land.
    // This avoids broken images in installed/offline copies of the app.
    const planPhotos = {
      'Pumpkin Chia Seed Pudding':'mango-oats', 'Apple & Yogurt':'matcha-yogurt',
      'Honey Garlic Chicken & Miso Sesame Bean Salad':'chicken-cucumber-herb-salad',
      'Ginger-Scallion Tofu & Enoki Soba':'sesame-tofu-soba',
    };
    const slug = planPhotos[key] || (this.recipes[key] ? this.recipes[key].slug : 'miso-salmon');
    return 'assets/dish-'+slug+'.png';
  }
  slugOf(name) {
    return this.recipes[name] ? this.recipes[name].slug+'-sw' : name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  }
  acceptPlan(themeName, dishNames, picks, leftovers) {
    const wk = this.state.weekNum||5;
    const week = this.buildWeek();
    week.Lunch = dishNames.slice();
    week.Dinner = [dishNames[2],dishNames[3],dishNames[0],dishNames[1]];
    this.setState({ week5Accepted:true, activePlan:{week:wk,theme:themeName,dishes:dishNames.slice(),proteins:picks.slice(),leftovers:leftovers.slice()}, week, cooked:{}, selected:null, swapOpen:false, groceryTicks:{} });
  }
  defaultTicks = {'Spring onions':true,'Salmon fillets':true};
  groceryFor() {
    const plan = this.state.activePlan;
    if (!plan) {
      const lunch=this.weeklyRecipeTotals(this.recipes['Honey Garlic Chicken & Miso Sesame Bean Salad']);
      const dinner=this.weeklyRecipeTotals(this.recipes['Ginger-Scallion Tofu & Enoki Soba']);
      const q=(name)=>Math.round(lunch.totalIngredients[name])+' g';
      const dinnerQ=(name)=>Math.round(dinner.totalIngredients[name])+' g';
      return { label:'Wednesday–Friday Meal Prep', skipped:[], groups:[
      {h:'PROTEINS & DAIRY', items:[{n:'Chicken thighs',q:q('Chicken thighs, raw'),img:'gr-chicken'},{n:'Firm tofu',q:dinnerQ('Firm tofu')},{n:'Plain non-fat Greek yogurt',q:'1 kg'},{n:'Milk of choice',q:'1 L'}]},
      {h:'PRODUCE & CARBS', items:[{n:'Apples',q:'9'},{n:'Enoki mushrooms',q:'600 g leftover / use what you have'},{n:'Pak choi',q:'900 g'},{n:'Purple cabbage',q:q('Purple cabbage, shredded')},{n:'Snap peas',q:q('Snap peas')},{n:'Green onions',q:'3 bunches'},{n:'Limes',q:'2'},{n:'Soba noodles',q:'600 g'}]},
      {h:'CUPBOARD · ONLY IF NEEDED', items:[{n:'Pumpkin purée',q:'1 × 425 g tin'},{n:'Chia seeds',q:'250 g'},{n:'Pumpkin pie spice',q:'1 jar'},{n:'Pumpkin seeds',q:'100 g'},{n:'Maple syrup',q:'1 small bottle'},{n:'Chickpeas',q:'1 × 400 g tin'},{n:'Shelled edamame',q:q('Shelled edamame')},{n:'White miso',q:'1 small tub'},{n:'Soy sauce',q:'only if needed'},{n:'Dark soy sauce',q:'only if needed'},{n:'Oyster sauce',q:'only if needed'},{n:'Rice vinegar',q:'only if needed'},{n:'Toasted sesame oil',q:'only if needed'},{n:'Sesame seeds',q:'only if needed'},{n:'Honey',q:'only if needed'},{n:'Sriracha',q:'only if needed'},{n:'Garlic powder',q:'only if needed'},{n:'Fresh ginger',q:'60 g'}]},
    ]};
    }
    const protItems = { Salmon:{n:'Salmon fillets',q:'8 portions',img:'gr-salmon'}, Tofu:{n:'Firm tofu',q:'2 blocks'}, Chicken:{n:'Chicken thigh',q:'800 g',img:'gr-chicken'}, Pork:{n:'Pork shoulder',q:'700 g'}, Beef:{n:'Beef mince',q:'700 g'}, Prawn:{n:'Raw prawns',q:'600 g'} };
    const produce = [{n:'Spring onions',q:'2 bunches',img:'gr-spring-onions'},{n:'Pak choi',q:'2 heads'},{n:'Baby spinach',q:'200 g',img:'gr-spinach'}];
    const pantry = [{n:'Jasmine rice',q:'1 kg',img:'gr-rice'},{n:'Eggs',q:'6'},{n:'White miso paste',q:'1 tub',img:'gr-miso'}];
    const skip = plan.leftovers||[];
    const filt = a => a.filter(it=>!skip.includes(it.n));
    return { label:'Week '+plan.week+' · '+plan.theme, skipped:skip, groups:[
      {h:'PRODUCE', items:filt(produce)},
      {h:'PROTEINS', items:plan.proteins.map(p=>protItems[p])},
      {h:'PANTRY', items:filt(pantry)},
    ]};
  }
  renderGrocerySub() {
    const g=this.groceryFor(), ticks=this.state.groceryTicks||this.defaultTicks, pantry=this.state.pantryHave||{};
    const all=g.groups.reduce((a,x)=>a.concat(x.items),[]);
    const toBuy=all.filter(it=>!pantry[it.n]);
    const done=toBuy.filter(it=>ticks[it.n]).length;
    const haveN=all.filter(it=>pantry[it.n]).length;
    return [
      e('span',{key:'a'},g.label),
      e('span',{key:'s',style:{color:'rgba(56,44,36,.2)'}},'|'),
      e('span',{key:'b'},e('b',{style:{color:'#8C5B3F'}},done),' of '+toBuy.length+' in cart'),
      haveN?e('span',{key:'s2',style:{color:'rgba(56,44,36,.2)'}},'|'):null,
      haveN?e('span',{key:'c'},e('b',{style:{color:'#7C8A5E'}},haveN),' in pantry'):null];
  }
  renderGroceryBody() {
    const C=this.C, st=this.state, g=this.groceryFor(), ticks=st.groceryTicks||this.defaultTicks, pantry=st.pantryHave||{};
    const out=[];
    if (g.skipped.length) out.push(e('div',{key:'skip',style:{background:'#F3EBDD',borderRadius:12,padding:'9px 12px',margin:'6px 0 4px',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,lineHeight:1.45,color:'#6B5D50'}},'Already have: '+g.skipped.join(', ')+' — left over from last week'));
    out.push(e('div',{key:'hint',style:{display:'flex',alignItems:'center',gap:8,margin:'8px 0 2px',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,lineHeight:1.4,color:'#9a8a76'}},
      e('span',{style:{flex:'0 0 auto',width:16,height:16,borderRadius:'50%',background:'#EDF0E0',color:'#5f6b3e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700}},'✓'),
      e('span',null,'Already got something? Tap ',e('b',{style:{color:'#5f6b3e'}},'Have it'),' and we\u2019ll leave it off your shop.')));
    g.groups.forEach(gr=>{
      out.push(e('div',{key:'h'+gr.h,style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:'.12em',color:'#9a8a76',margin:'14px 0 4px'}},gr.h));
      gr.items.forEach(it=>{
        const on=!!ticks[it.n], have=!!pantry[it.n];
        out.push(e('div',{key:gr.h+it.n,style:{display:'flex',alignItems:'center',gap:9,padding:'8px 0',borderBottom:'1px solid rgba(56,44,36,.08)',opacity:have?.55:1}},
          e('button',{onClick:()=>{ if(have) return; this.setState({groceryTicks:{...ticks,[it.n]:!on}}); },style:{flex:1,minWidth:0,border:'none',cursor:have?'default':'pointer',background:'transparent',textAlign:'left',display:'flex',alignItems:'center',gap:11,padding:0}},
            e('span',{style:{width:20,height:20,borderRadius:'50%',flexShrink:0,background:have?'#7C8A5E':(on?'#8FB3C8':'transparent'),boxShadow:(have||on)?'none':'inset 0 0 0 1.5px rgba(56,44,36,.3)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11}},(have||on)?'✓':''),
            it.img
              ? e('img',{src:'assets/'+it.img+'.png',alt:'',style:{width:40,height:40,borderRadius:9,objectFit:'cover',flexShrink:0}})
              : e('span',{style:{width:40,height:40,borderRadius:9,flexShrink:0,background:'#EFE3D0',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Newsreader',serif",fontSize:17,color:'#382C24'}},it.n[0]),
            e('span',{style:{flex:1,minWidth:0,fontFamily:"'Hanken Grotesk',sans-serif",fontSize:14,color:(on||have)?'rgba(56,44,36,.45)':'#382C24',textDecoration:(on&&!have)?'line-through':'none',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},it.n),
            e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,color:'#9a8a76',flex:'0 0 auto'}},it.q)),
          e('button',{onClick:()=>this.setState({pantryHave:{...pantry,[it.n]:!have}, ...(!have?{groceryTicks:{...ticks,[it.n]:false}}:{})}),style:{flex:'0 0 auto',border:'none',cursor:'pointer',borderRadius:20,padding:'6px 10px',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:10.5,fontWeight:600,whiteSpace:'nowrap',background:have?'#EDF0E0':'transparent',color:have?'#5f6b3e':'#9a8a76',boxShadow:have?'none':'inset 0 0 0 1px rgba(56,44,36,.2)'}}, have?'In pantry':'Have it')));
      });
    });
    return out;
  }
  toggleProtein(p) {
    const cur = this.state.proteinPicks||[];
    let next;
    if (cur.includes(p)) next = cur.filter(x=>x!==p);
    else if (cur.length>=2) next = [cur[1], p];
    else next = cur.concat(p);
    this.setState({ proteinPicks:next, planBuilt:false, week5Swaps:{}, week5Accepted:false });
  }
  rateDish(dish, val) {
    const r = {...(this.state.ratings||{})};
    r[dish] = r[dish]===val ? null : val;
    this.setState({ ratings:r });
  }
  renderWeekRecap() {
    const C=this.C, st=this.state, ratings=st.ratings||{};
    const cookedCount = Object.values(st.cooked||{}).filter(Boolean).length;
    const mains = this.recipeOrder;
    const ratedCount = mains.filter(d=>ratings[d]).length;
    const rateBtn = (dish,val,sym,on,col) => e('button',{onClick:()=>this.rateDish(dish,val),style:{width:34,height:34,borderRadius:'50%',border:'none',cursor:'pointer',background:on?col:'#F1EDE4',color:on?'#fff':'#9a8a76',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},sym);
    return e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}},
      this.statusBar(false),
      e('div',{key:'hd',style:{padding:'14px 26px 0',flex:'0 0 auto'}},
        e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,letterSpacing:'.12em',color:'#9a8a76'}},'FRI · WEEK '+((st.weekNum||5)-1)+' WRAPPED'),
        e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:30,lineHeight:1.08,color:C.sumi,marginTop:8}},'Week ',e('span',{style:{fontWeight:600}},'complete'),' 🎉')),
      e('div',{key:'stats',style:{flex:'0 0 auto',margin:'18px 22px 0',display:'flex',gap:10}},
        e('div',{style:{flex:1,background:C.peri,borderRadius:18,padding:'16px 14px',textAlign:'center'}},
          e('div',{style:{fontFamily:"'Newsreader',serif",fontSize:27,color:C.sumi}},cookedCount,e('span',{style:{fontSize:14,color:'#6B5D50'}},'/20')),
          e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:'.08em',color:'#6B5D50',marginTop:3}},'MEALS COOKED')),
        e('div',{style:{flex:1,background:'#F6ECE1',borderRadius:18,padding:'16px 14px',textAlign:'center'}},
          e('div',{style:{fontFamily:"'Newsreader',serif",fontSize:27,color:C.sumi}},'94',e('span',{style:{fontSize:14,color:'#b07a63'}},'%')),
          e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:'.08em',color:'#b07a63',marginTop:3}},'PROTEIN HIT')),
        e('div',{style:{flex:1,background:'#F3EBDD',borderRadius:18,padding:'16px 14px',textAlign:'center'}},
          e('div',{style:{fontFamily:"'Newsreader',serif",fontSize:27,color:C.sumi}},'2',e('span',{style:{fontSize:14,color:'#6B5D50'}},'h05')),
          e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:'.08em',color:'#6B5D50',marginTop:3}},'PREP TIME'))),
      e('div',{key:'rt',style:{padding:'24px 26px 8px',flex:'0 0 auto'}},
        e('div',{style:{fontFamily:"'Newsreader',serif",fontStyle:'italic',fontSize:18,color:C.sumi}},'Rate the dishes'),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12,color:'#9a8a76',marginTop:3}},'♥ keeps it in the rotation · ✕ rests it')),
      e('div',{key:'ls',style:{flex:1,overflowY:'auto',padding:'6px 22px 8px',display:'flex',flexDirection:'column',gap:9}},
        mains.map(d=>{
          const r=this.recipes[d];
          return e('div',{key:d,style:{display:'flex',alignItems:'center',gap:12,background:'#fff',borderRadius:16,padding:'11px 13px',boxShadow:'0 3px 12px rgba(40,30,22,.05)'}},
            e('div',{style:{flex:1}},
              e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:14.5,color:C.sumi}},d),
              e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:'#9a8a76',marginTop:1}},r.cuisine+' · '+r.kcal+' kcal')),
            rateBtn(d,'love','♥',ratings[d]==='love',C.yuhi),
            rateBtn(d,'skip','✕',ratings[d]==='skip','#9a8a76'));
        })),
      e('div',{key:'cta',style:{flex:'0 0 auto',padding:'12px 22px 26px'}},
        e('button',{onClick:()=>this.setState({planReady:true}),style:{width:'100%',border:'none',cursor:'pointer',background:C.sumi,color:C.kinari,padding:'16px',borderRadius:30,fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:15}},
          st.planReady ? ('✓ Planning Week '+(st.weekNum||5)+' →') : 'Plan next week →'),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11,color:'#9a8a76',textAlign:'center',marginTop:8}},ratedCount+' of 4 rated · ratings teach next week')));
  }
  renderWeekPreview() {
    const C=this.C, st=this.state, ratings=st.ratings||{}, swaps=st.week5Swaps||{};
    if (!st.planReady) {
      return e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}},
        this.statusBar(false),
        e('div',{style:{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:'0 40px',textAlign:'center'}},
          e('span',{style:{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:4,opacity:.5}},
            e('span',{style:{width:34,height:32,background:'#C8754E',borderRadius:'50% 50% 47% 53% / 55% 55% 46% 46%'}}),
            e('span',{style:{width:48,height:27,background:'#EFE6D2',boxShadow:'inset 0 0 0 1px rgba(56,44,36,.10)',borderRadius:'7px 7px 50% 50% / 7px 7px 96% 96%'}})),
          e('div',{style:{fontFamily:"'Newsreader',serif",fontSize:22,color:C.sumi}},'Next week is resting'),
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13.5,lineHeight:1.55,color:'#6b5d50'}},'Tap “Plan next week” on the recap screen when you\u2019re ready, and Sundō drafts a fresh theme around your goals.'),
          e('button',{onClick:()=>this.setState({planReady:true}),style:{border:'none',cursor:'pointer',background:'#F1EDE4',color:C.sumi,padding:'11px 22px',borderRadius:24,fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:13}},'Plan now')));
    }
    const loved = this.recipeOrder.filter(d=>ratings[d]==='love');
    const tC=this.targetsFor(st.people.me), tG=this.targetsFor(st.people.partner);
    const accepted = !!st.week5Accepted;
    const picks = st.proteinPicks||[];
    const wk = st.weekNum||5;
    const leftovers = this.leftoverCandidates.filter(l=>(st.leftoverPicks||{})[l]);
    if (!st.leftoverDone) {
      return e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}},
        this.statusBar(false),
        e('div',{style:{padding:'14px 26px 0',flex:'0 0 auto'}},
          e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,letterSpacing:'.12em',color:'#8C5B3F'}},'WEEK '+wk+' · STEP 1 OF 3'),
          e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:30,lineHeight:1.08,color:C.sumi,marginTop:8}},'Anything ',e('span',{style:{fontWeight:600}},'left over?')),
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,color:'#6b5d50',marginTop:8,lineHeight:1.5}},'Tick what\u2019s still in the fridge from Week 4 — next week\u2019s menu will plan around using it up.')),
        e('div',{style:{flex:1,overflowY:'auto',padding:'20px 22px 8px',display:'flex',flexDirection:'column',gap:9}},
          this.leftoverCandidates.map(l=>{
            const on=!!(st.leftoverPicks||{})[l];
            return e('button',{key:l,onClick:()=>this.toggleLeftover(l),style:{display:'flex',alignItems:'center',gap:13,border:'none',cursor:'pointer',textAlign:'left',borderRadius:16,padding:'14px 15px',background:on?'#F3EBDD':'#fff',boxShadow:on?'inset 0 0 0 1.5px #8FB3C8':'0 3px 12px rgba(40,30,22,.05)'}},
              e('span',{style:{width:22,height:22,borderRadius:'50%',flexShrink:0,background:on?'#8FB3C8':'transparent',boxShadow:on?'none':'inset 0 0 0 1.5px rgba(56,44,36,.25)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12}},on?'✓':''),
              e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:14.5,color:C.sumi}},l));
          })),
        e('div',{style:{flex:'0 0 auto',padding:'12px 22px 26px'}},
          e('button',{onClick:()=>this.setState({leftoverDone:true}),style:{width:'100%',border:'none',cursor:'pointer',background:C.sumi,color:C.kinari,padding:'16px',borderRadius:30,fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:15}},
            leftovers.length?('Use these '+leftovers.length+' →'):'Nothing left over — continue →')));
    }
    if (st.planBuilding) return this.loaderScreen('Steeping your plan…', (picks.length?picks.join(' + '):'Your proteins')+' · balancing the week');
    if (!st.planBuilt) {
      const can = picks.length===2;
      return e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}},
        this.statusBar(false),
        e('div',{style:{padding:'14px 26px 0',flex:'0 0 auto'}},
          e('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline'}},
            e('span',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,letterSpacing:'.12em',color:'#8C5B3F'}},'WEEK '+wk+' · STEP 2 OF 3'),
            e('button',{onClick:()=>this.setState({leftoverDone:false}),style:{border:'none',cursor:'pointer',background:'transparent',color:'#9a8a76',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12,fontWeight:600,textDecoration:'underline',padding:0}},'edit leftovers')),
          e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:30,lineHeight:1.08,color:C.sumi,marginTop:8}},'Pick two ',e('span',{style:{fontWeight:600}},'proteins')),
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,color:'#6b5d50',marginTop:8,lineHeight:1.5}},'Sundō builds next week\u2019s menu around them, scaled to your goals.')),
        e('div',{style:{flex:1,overflowY:'auto',padding:'20px 22px 8px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,alignContent:'start'}},
          this.proteinOptions.map(p=>{
            const on=picks.includes(p);
            return e('button',{key:p,onClick:()=>this.toggleProtein(p),style:{border:'none',cursor:'pointer',borderRadius:18,padding:'18px 14px',textAlign:'left',background:on?C.sumi:'#fff',color:on?C.kinari:C.sumi,boxShadow:on?'0 6px 16px rgba(56,44,36,.25)':'0 3px 12px rgba(40,30,22,.05)'}},
              e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,fontSize:15.5}},p),
              e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,marginTop:3,color:on?'rgba(242,232,213,.65)':'#9a8a76'}},on?'✓ selected':this.proteinMenus[p].length+' recipes'));
          })),
        e('div',{style:{flex:'0 0 auto',padding:'12px 22px 26px'}},
          e('button',{onClick:()=>{ if(can){ clearTimeout(this._buildT); this.setState({planBuilding:true}); this._buildT=setTimeout(()=>this.setState({planBuilding:false,planBuilt:true}),1900); } },style:{width:'100%',border:'none',cursor:can?'pointer':'default',background:can?'#4A3527':'#E5DFD2',color:can?'#fff':'#9a8a76',padding:'16px',borderRadius:30,fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:15,boxShadow:can?'0 8px 20px rgba(236,127,94,.35)':'none'}},
            can?'Create my meal plan →':'Select '+(2-picks.length)+' more protein'+(picks.length===1?'':'s')),
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11,color:'#9a8a76',textAlign:'center',marginTop:8}},picks.length?picks.join(' + ')+' week':'usually two — like Week 4\u2019s salmon & tofu')));
    }
    const dishes = picks.reduce((a,p)=>a.concat(this.proteinMenus[p]),[]);
    const themeName = picks.join(' & ')+' Week';
    const dishNames = dishes.map((d,i)=>{const alts=[d.n].concat(d.alts);return alts[(swaps[i]||0)%alts.length];});
    const dishRow = (d,i) => {
      const alts=[d.n].concat(d.alts); const cur=alts[(swaps[i]||0)%alts.length];
      return e('div',{key:i,style:{display:'flex',alignItems:'center',gap:11,background:'#fff',borderRadius:16,padding:'11px 13px',boxShadow:'0 3px 12px rgba(40,30,22,.05)'}},
        e('div',{style:{flex:1}},
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:14.5,color:C.sumi}},cur),
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:'#9a8a76',marginTop:1}},d.kcal+' kcal · '+d.protein+'g protein',
            leftovers.includes(d.uses)?e('span',{style:{color:'#8FB3C8'}},' · uses '+d.uses.toLowerCase()):null)),
        accepted?null:e('button',{onClick:()=>this.setState({week5Swaps:{...swaps,[i]:(swaps[i]||0)+1}}),style:{border:'none',cursor:'pointer',background:'#F1EDE4',color:C.sumi,width:36,height:36,borderRadius:'50%',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},'⇄'));
    };
    return e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}},
      this.statusBar(false),
      e('div',{key:'hd',style:{padding:'14px 26px 0',flex:'0 0 auto'}},
        e('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline'}},
          e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,letterSpacing:'.12em',color:'#8C5B3F'}},accepted?('WEEK '+wk+' · LIVE'):('WEEK '+wk+' · STEP 3 OF 3')),
          accepted?null:e('button',{onClick:()=>this.setState({planBuilt:false}),style:{border:'none',cursor:'pointer',background:'transparent',color:'#9a8a76',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12,fontWeight:600,textDecoration:'underline',padding:0}},'change proteins')),
        e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:30,lineHeight:1.08,color:C.sumi,marginTop:8}},accepted?e('span',null,themeName+' is ',e('span',{style:{fontWeight:600}},'live')):e('span',null,'Say hello to ',e('span',{style:{fontWeight:600}},themeName)))),
      e('div',{key:'adj',style:{flex:'0 0 auto',margin:'16px 22px 0',background:C.peri,borderRadius:18,padding:'13px 16px'}},
        e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9.5,letterSpacing:'.1em',color:'#6B5D50',marginBottom:5}},'AUTO-ADJUSTED TO YOUR GOALS'),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12.5,color:'#57493C'}},this.state.people.me.name+' ~'+Math.round(tC.protein/3)+'g · '+this.state.people.partner.name+' ~'+Math.round(tG.protein/3)+'g protein per meal — portions scale automatically.')),
      e('div',{key:'lo',style:{flex:'0 0 auto',padding:'14px 26px 0',display:'flex',alignItems:'center',gap:7,flexWrap:'wrap'}},
        leftovers.length
          ? [e('span',{key:'_l',style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:'#9a8a76'}},'Uses up:')].concat(
              leftovers.map(l=>e('span',{key:l,style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,fontWeight:600,color:'#6B5D50',background:'#F3EBDD',borderRadius:14,padding:'4px 10px'}},l)))
          : e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:'#9a8a76'}},'No leftovers to use — fresh grocery list')),
      e('div',{key:'ls',style:{flex:1,overflowY:'auto',padding:'12px 22px 8px',display:'flex',flexDirection:'column',gap:9}},
        dishes.map(dishRow),
        (function(self){
          const carried = loved.filter(d=>picks.includes(self.proteinOf[d]));
          return carried.length
            ? carried.map(d=>e('div',{key:'kept-'+d,style:{display:'flex',alignItems:'center',gap:11,background:'#F6ECE1',borderRadius:16,padding:'11px 13px'}},
                e('span',{style:{color:C.yuhi,fontSize:15}},'♥'),
                e('div',{style:{flex:1}},
                  e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:14,color:C.sumi}},d),
                  e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:'#b07a63'}},'carried over — you ♥\u2019d it and picked '+self.proteinOf[d].toLowerCase()+' again'))))
            : e('div',{key:'kept0',style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:'#9a8a76',textAlign:'center',padding:'4px 0'}},'♥\u2019d dishes return automatically when their protein is picked again');
        })(this)),
      e('div',{key:'cta',style:{flex:'0 0 auto',padding:'12px 22px 26px'}},
        e('button',{onClick:()=>{ if(accepted){ this.setState({week5Accepted:false, activePlan:null, week:this.buildWeek(), cooked:{}, selected:null, groceryTicks:null}); } else { this.acceptPlan(themeName, dishNames, picks, leftovers); } },style:{width:'100%',border:'none',cursor:'pointer',background:accepted?'#8FB3C8':'#4A3527',color:'#fff',padding:'16px',borderRadius:30,fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:15,boxShadow:accepted?'none':'0 8px 20px rgba(74,53,39,.3)'}},
          accepted?'✓ Accepted — grocery list updated':'Accept '+themeName+' →'),
        accepted?e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11,color:'#9a8a76',textAlign:'center',marginTop:8}},'Planner & grocery list now follow Week '+wk):null,
        accepted?e('button',{onClick:()=>this.setState({weekNum:wk+1, leftoverDone:false, planBuilt:false, proteinPicks:[], leftoverPicks:{}, week5Swaps:{}, week5Accepted:false, planReady:true}),style:{width:'100%',border:'none',cursor:'pointer',background:'transparent',color:'#8FB3C8',padding:'12px 0 0',fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:13,textDecoration:'underline'}},'Rotation continues — plan Week '+(wk+1)+' →'):null));
  }

  // ============ ONBOARDING ============
  obCuisineList = ['Japanese','Korean','Thai','Vietnamese','Chinese','Filipino','Malaysian','Indian'];
  obTimeList = ['90 min','2 hours','2.5 hours','3 hours'];
  obDefaults = { Japanese:true, Korean:true, Thai:true };
  obGoalsList = [
    {k:'Fat loss', s:'Higher protein, lighter calories', ic:'▽'},
    {k:'Muscle gain', s:'Protein-dense, bigger portions', ic:'△'},
    {k:'Gut health', s:'Fermented & fibre-rich meals', ic:'◎'},
    {k:'High protein', s:'Protein prioritised every meal', ic:'❖'},
    {k:'Maintain weight', s:'Balanced everyday plates', ic:'◐'},
    {k:'More energy', s:'Steady, slow-release carbs', ic:'✦'},
    {k:'Heart health', s:'Omega-3s, less saturated fat', ic:'♡'},
    {k:'Better sleep', s:'Lighter, earlier dinners', ic:'☾'},
  ];
  obGoalDefaults = { 'Gut health':true, 'High protein':true };
  // ============ INGREDIENT SUBSTITUTIONS ============
  subData = {
    kecap:{label:'Kecap Manis',alts:['1 tbsp soy sauce + 1.5 tsp soft brown sugar per 1 tbsp kecap manis'],note:'Stir until the sugar dissolves before adding to the dish; the glaze will be slightly less thick so let it reduce a touch longer.'},
    miso:{label:'White miso paste',alts:['1 tbsp miso = 1 tbsp tahini + ½ tsp soy sauce','Or 1 tbsp light soy sauce + ¼ tsp sugar per 1 tbsp'],note:'The glaze will be a little less funky — a splash of rice vinegar brings back the tang.'},
    fish:{label:'Fish sauce',alts:['1 tbsp fish sauce = 1 tbsp light soy + ¼ tsp anchovy paste','Vegan: 1 tbsp soy sauce + ½ tsp white miso'],note:null},
    gochujang:{label:'Gochujang',home:['2 tbsp white miso','1 tbsp sriracha (or any chilli paste)','1 tsp soy sauce','1 tsp honey','½ tsp smoked paprika'],alts:['Sriracha + 1 tsp miso per 1 tbsp gochujang'],note:'Stir together and rest 10 min — it mellows into a smoother, glossier paste.'},
    doubanjiang:{label:'Doubanjiang (chilli bean paste)',home:['1 tbsp white miso','1 tbsp chilli-garlic sauce','½ tsp soy sauce','a pinch of sugar'],alts:['Korean gochujang, 1:1 — sweeter, less salty'],note:'Fry it in oil until the oil turns red, exactly as you would the original.'},
    tamarind:{label:'Tamarind paste',alts:['1 tbsp tamarind = 1 tbsp lime juice + 1 tsp brown sugar','Or 2 tsp Worcestershire sauce'],note:null},
    palm:{label:'Palm sugar',alts:['Soft brown sugar, 1:1','Coconut sugar, 1:1','Maple syrup — use ¾ the amount, it\u2019s wetter'],note:null},
    hoisin:{label:'Hoisin sauce',home:['2 tbsp soy sauce','1 tbsp peanut butter','1 tbsp honey','1 tsp rice vinegar','½ tsp Chinese five spice'],alts:['Oyster sauce + a little honey'],note:'Whisk smooth — it thickens as it sits.'},
    oyster:{label:'Oyster sauce',alts:['Vegetarian mushroom stir-fry sauce, 1:1','1 tbsp = 1 tbsp soy + ½ tsp sugar + a drop of sesame oil'],note:null},
    curryroux:{label:'Curry roux',home:['2 tbsp butter','2 tbsp plain flour','1 tbsp curry powder','1 tsp garam masala'],alts:['Curry powder + a flour-and-butter roux'],note:'Cook the flour in butter until sandy, stir in the spices, then loosen with stock.'},
    sesameoil:{label:'Sesame oil',alts:['Toasted sesame seeds blitzed into neutral oil','Peanut oil — milder, use a little more'],note:null},
    galangal:{label:'Galangal',alts:['Fresh ginger, 1:1 — brighter, less piney','Ginger + a strip of lemon zest'],note:null},
    lemongrass:{label:'Lemongrass',alts:['Zest of 1 lime + ½ tsp ginger per stalk','1 tsp lemongrass paste per stalk'],note:null},
    ricevin:{label:'Rice vinegar',alts:['White wine vinegar, 1:1','Apple cider vinegar — use ¾, it\u2019s stronger'],note:null},
    panko:{label:'Panko breadcrumbs',alts:['Crushed cornflakes for extra crunch','Dried breadcrumbs — finer, a little less crisp'],note:null},
    nori:{label:'Nori',alts:['Toasted sesame + a pinch of sea salt for the sea flavour'],note:null},
    soy:{label:'Soy sauce',alts:['Tamari, 1:1 (gluten-free)','Coconut aminos, 1:1 — sweeter, add a pinch of salt'],note:null},
    yuzu:{label:'Yuzu Ponzu',home:['3 tbsp soy sauce','1 tbsp lemon juice','1 tbsp lime juice','1 tsp rice vinegar','1 tsp mirin or sugar'],alts:['Soy sauce + a squeeze of lemon & lime'],note:'Yuzu is floral and tart — a lemon-and-lime mix gets you most of the way there.'},
    mirin:{label:'Mirin',alts:['1 tbsp mirin = 1 tbsp rice vinegar + ½ tsp sugar','Dry sherry + a pinch of sugar'],note:null},
    shaoxing:{label:'Shaoxing wine',alts:['Dry sherry, 1:1','Dry white wine + a pinch of salt'],note:null},
    gochugaru:{label:'Gochugaru',alts:['Korean chilli flakes, or ½ the amount of regular chilli flakes + a pinch of paprika'],note:'Regular flakes run hotter and less fruity — start with less.'},
    blackbean:{label:'Fermented black beans',home:['1 tbsp soy sauce','½ tsp white miso','a pinch of sugar'],alts:['Black bean garlic sauce, 1:1'],note:null},
  };
  subMatch = [['kecap','kecap'],['miso','miso'],['fish sauce','fish'],['gochujang','gochujang'],['doubanjiang','doubanjiang'],['chilli bean','doubanjiang'],['tamarind','tamarind'],['palm sugar','palm'],['hoisin','hoisin'],['oyster','oyster'],['curry roux','curryroux'],['sesame oil','sesameoil'],['galangal','galangal'],['lemongrass','lemongrass'],['rice vinegar','ricevin'],['panko','panko'],['nori','nori'],['soy sauce','soy'],['yuzu','yuzu'],['ponzu','yuzu'],['mirin','mirin'],['shaoxing','shaoxing'],['gochugaru','gochugaru'],['black bean','blackbean']];
  specialtyKeys = ['kecap','yuzu','ponzu','mirin','gochujang','gochugaru','doubanjiang','chilli bean','tamarind','hoisin','curry roux','galangal','lemongrass','shaoxing','miso','black bean'];
  isSpecialty(ing) { const n=(ing.n||'').toLowerCase(); return this.specialtyKeys.some(k=>n.includes(k)); }
  proteinSubs = {
    Salmon:['Skinless chicken thigh','Firm tofu (vegetarian)','Trout or sea trout fillet'],
    Tofu:['Tempeh — nuttier, firmer','Chicken thigh','Halloumi, cubed'],
    Chicken:['Firm tofu (vegetarian)','Turkey thigh','Pork shoulder, sliced'],
    Pork:['Chicken thigh','Firm tofu (vegetarian)','Turkey mince'],
    Beef:['Chicken thigh','Firm tofu (vegetarian)','King oyster mushrooms'],
    Prawn:['Firm tofu (vegetarian)','Diced chicken','White fish chunks'],
  };
  subFor(ing) {
    const n = (ing.n||'').toLowerCase();
    for (const [kw,key] of this.subMatch) { if (n.includes(kw)) return {...this.subData[key]}; }
    if (ing.cat==='protein') {
      const sh = ing.short||ing.n;
      const list = this.proteinSubs[sh];
      if (list) return { label:ing.n, alts:list, note:'Cooking time stays about the same — check the centre is cooked through before serving.' };
      return { label:ing.n, alts:['Any lean protein you have — keep the weight the same','Firm tofu for a vegetarian version'], note:null };
    }
    if (ing.cat==='veg') return { label:ing.n, alts:['Any crunchy seasonal veg works — swap gram for gram','Frozen equivalent if fresh is unavailable'], note:'Add firmer veg earlier and leafy greens at the very end.' };
    if (ing.cat==='carb') return { label:ing.n, alts:['Any cooked grain or noodle, gram for gram','Cauliflower rice for a lighter, low-carb plate'], note:null };
    return { label:ing.n, alts:['Leave it out, or use the closest thing in your pantry','Adjust to taste — start with half and build up'], note:null };
  }
  logoRow() {
    const C=this.C;
    return e('div',{style:{padding:'12px 26px 0',display:'flex',alignItems:'center',gap:9,flex:'0 0 auto'}},
      e('span',{style:{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:2}},
        e('span',{style:{width:18,height:17,background:'#C8754E',borderRadius:'50% 50% 47% 53% / 55% 55% 46% 46%',display:'block'}}),
        e('span',{style:{width:26,height:14,background:'#EFE6D2',boxShadow:'inset 0 0 0 1px rgba(56,44,36,.10)',borderRadius:'4px 4px 50% 50% / 4px 4px 96% 96%',display:'block'}})),
      e('span',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:22,color:C.sumi,lineHeight:1}},'Sundō'));
  }
  obChip(label, on, fn) {
    const C=this.C;
    return e('button',{key:label,onClick:fn,style:{padding:'11px 18px',borderRadius:26,border:'none',cursor:'pointer',background:on?C.sumi:'transparent',color:on?C.kinari:C.sumi,boxShadow:on?'none':'inset 0 0 0 1px rgba(56,44,36,.22)',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:14,fontWeight:on?500:400}},label+(on?' ✓':''));
  }
  renderOnboarding() {
    const C=this.C, st=this.state;
    const step = st.obStep||0;
    const cuisines = st.obCuisines||this.obDefaults;
    const hh = st.obHousehold||2;
    const time = st.obTime||'2 hours';
    const goals = st.obGoals||this.obGoalDefaults;
    const goalCount = this.obGoalsList.filter(g=>goals[g.k]).length;
    const pickedCount = this.obCuisineList.filter(c=>cuisines[c]).length;
    const heads = [
      { k:'What do you\nlove to eat?', sub:'Pick a few cuisines. We\u2019ll plan your Sundays around the flavours you crave.' },
      { k:'What are your\ngoals?', sub:'Pick what matters most — we\u2019ll tune portions, protein and calories to match. Choose as many as you like.' },
      { k:'Who\u2019s\neating?', sub:'Portions and goals scale to your household — you can fine-tune each person later on Home.' },
      { k:'Your Sunday\nwindow', sub:'How long do you want the prep ritual to take? We\u2019ll fit the menu to it.' },
    ];
    let body;
    if (step===0) body = e('div',{style:{padding:'28px 28px 0',display:'flex',flexWrap:'wrap',gap:10}},
      this.obCuisineList.map(cLabel=>this.obChip(cLabel, !!cuisines[cLabel], ()=>this.setState({obCuisines:{...cuisines,[cLabel]:!cuisines[cLabel]}}))));
    else if (step===1) body = e('div',{style:{padding:'24px 28px 0',display:'flex',flexDirection:'column',gap:10}},
      this.obGoalsList.map(g=>{const on=!!goals[g.k]; return e('button',{key:g.k,onClick:()=>this.setState({obGoals:{...goals,[g.k]:!goals[g.k]}}),style:{display:'flex',alignItems:'center',gap:13,border:'none',cursor:'pointer',textAlign:'left',borderRadius:16,padding:'14px 16px',background:on?C.sumi:'#fff',color:on?C.kinari:C.sumi,boxShadow:on?'0 6px 16px rgba(56,44,36,.22)':'0 3px 12px rgba(40,30,22,.05)'}},
        e('span',{style:{width:30,height:30,borderRadius:'50%',flex:'0 0 auto',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,background:on?'rgba(242,232,213,.16)':'#F1EDE4',color:on?C.kinari:'#8C5B3F'}},g.ic),
        e('span',{style:{flex:1}},
          e('span',{style:{display:'block',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:14.5,fontWeight:600}},g.k),
          e('span',{style:{display:'block',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:on?'rgba(242,232,213,.65)':'#9a8a76',marginTop:1}},g.s)),
        e('span',{style:{width:20,height:20,borderRadius:'50%',flex:'0 0 auto',background:on?'#8FB3C8':'transparent',boxShadow:on?'none':'inset 0 0 0 1.5px rgba(56,44,36,.25)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11}},on?'✓':''));}));
    else if (step===2) body = e('div',{style:{padding:'28px 28px 0',display:'flex',flexDirection:'column',gap:10}},
      [1,2,3,4].map(n=>e('button',{key:n,onClick:()=>this.setState({obHousehold:n}),style:{display:'flex',alignItems:'center',gap:13,border:'none',cursor:'pointer',textAlign:'left',borderRadius:16,padding:'15px 16px',background:hh===n?C.sumi:'#fff',color:hh===n?C.kinari:C.sumi,boxShadow:hh===n?'0 6px 16px rgba(56,44,36,.22)':'0 3px 12px rgba(40,30,22,.05)'}},
        e('span',{style:{fontFamily:"'Newsreader',serif",fontSize:22,width:26,textAlign:'center'}},n),
        e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:14.5,fontWeight:600}},n===1?'Just me':n===2?'Me + one':'Household of '+n),
        n===2?e('span',{style:{marginLeft:'auto',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:hh===2?'rgba(242,232,213,.65)':'#9a8a76'}},'cooking for two'):null)));
    else body = e('div',{style:{padding:'28px 28px 0',display:'flex',flexDirection:'column',gap:10}},
      this.obTimeList.map(t=>e('button',{key:t,onClick:()=>this.setState({obTime:t}),style:{display:'flex',alignItems:'center',justifyContent:'space-between',border:'none',cursor:'pointer',textAlign:'left',borderRadius:16,padding:'15px 16px',background:time===t?C.sumi:'#fff',color:time===t?C.kinari:C.sumi,boxShadow:time===t?'0 6px 16px rgba(56,44,36,.22)':'0 3px 12px rgba(40,30,22,.05)'}},
        e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:14.5,fontWeight:600}},t),
        e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:time===t?'rgba(242,232,213,.65)':'#9a8a76'}},t==='90 min'?'~3 dishes':t==='2 hours'?'~5 dishes':t==='2.5 hours'?'~6 dishes':'7+ dishes'))));
    const done = !!st.obDone;
    const canNext = (step!==0 || pickedCount>0) && (step!==1 || goalCount>0);
    const titleLines = heads[step].k.split('\n');
    return e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}},
      this.statusBar(false),
      this.logoRow(),
      e('div',{key:'hd'+step,style:{padding:'30px 30px 0',flex:'0 0 auto'}},
        e('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline'}},
          e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.12em',color:'#9a8a76'}},'STEP '+(step+1)+' OF 4'),
          step>0?e('button',{onClick:()=>this.setState({obStep:step-1,obDone:false}),style:{border:'none',cursor:'pointer',background:'transparent',color:'#9a8a76',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12,fontWeight:600,textDecoration:'underline',padding:0}},'back'):null),
        e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:34,lineHeight:1.1,color:C.sumi,marginTop:12}},titleLines[0],e('br'),titleLines[1]),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:15,lineHeight:1.55,color:'#6b5d50',marginTop:14}},heads[step].sub)),
      e('div',{key:'bd'+step,style:{flex:1,overflowY:'auto'}},body),
      e('div',{key:'ft',style:{flex:'0 0 auto',padding:'16px 28px 28px'}},
        e('div',{style:{display:'flex',gap:7,justifyContent:'center',marginBottom:18}},
          [0,1,2,3].map(i=>e('span',{key:i,style:{width:i===step?24:5,height:5,borderRadius:5,background:i===step?'#4A3527':(i<step?C.sumi:'rgba(56,44,36,.2)'),transition:'all .25s'}}))),
        e('button',{onClick:()=>{ if(!canNext) return; if(step<3) this.setState({obStep:step+1}); else this.setState({obDone:true}); },style:{width:'100%',border:'none',cursor:canNext?'pointer':'default',background:done&&step===3?'#8FB3C8':(canNext?C.sumi:'#E5DFD2'),color:canNext?C.kinari:'#9a8a76',padding:'16px',borderRadius:30,fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:15}},
          step<3 ? 'Continue →' : (done ? '✓ You\u2019re set — welcome to Sundō' : 'Start planning →'))));
  }

  loaderScreen(title, sub) {
    const C=this.C;
    const mask='linear-gradient(to top, transparent 0%, black 24%, black 58%, transparent 96%)';
    const wisp=(x,h,dur,del,op)=>e('span',{key:'w'+x,style:{position:'absolute',left:x,bottom:42,width:14,height:h,filter:'blur(2.5px)',WebkitMaskImage:mask,maskImage:mask,backgroundImage:'radial-gradient(ellipse 55% 30% at 50% 50%, rgba(143,179,200,'+op+'), transparent 72%)',backgroundSize:'14px 44px',animation:'sundoSteamDrift '+dur+'s linear '+(-del)+'s infinite, sundoSteamSway '+(dur+1.4)+'s ease-in-out '+(-del)+'s infinite'}});
    return e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}},
      this.statusBar(false),
      e('div',{style:{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:'0 44px',textAlign:'center'}},
        e('span',{style:{position:'relative',width:80,height:110,display:'inline-block'}},
          wisp(18,62,2.9,0,.5), wisp(33,76,3.6,1.2,.56), wisp(48,56,3.2,2.1,.45),
          e('span',{style:{position:'absolute',left:16,bottom:0,width:48,height:27,background:'#EFE6D2',boxShadow:'inset 0 0 0 1.5px rgba(56,44,36,.12)',borderRadius:'7px 7px 50% 50% / 7px 7px 96% 96%',animation:'sundoBreathe 3.4s ease-in-out infinite'}})),
        e('div',{style:{fontFamily:"'Newsreader',serif",fontStyle:'italic',fontSize:22,color:C.sumi,animation:'sundoPulse 3.4s ease-in-out infinite'}},title),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12.5,color:'#9a8a76',marginTop:-6}},sub)));
  }

  recipeTips = {
    'Miso Salmon Bowl':{k:'SALMON TIP',t:'Pat the fillet bone-dry and start skin-side down — then leave it alone for 4 minutes. Moving fish early is why skin sticks.'},
    'Ginger Soy Salmon Bowl':{k:'SALMON TIP',t:'Add the marinade only after the sear — the honey in it burns on high heat long before the fish is cooked.'},
    'Honey Garlic Salmon':{k:'GLAZE TIP',t:'The glaze moves fast: pull the pan the moment it coats a spoon. Thirty seconds too long turns honey bitter.'},
    'Salmon Sushi Bowl':{k:'SALMON TIP',t:'Use well-chilled salmon and one long stroke per slice — sawing tears the flesh into ragged edges.'},
    'Tom Kha Salmon':{k:'POACH TIP',t:'Keep the coconut broth at a bare shiver, never a boil — boiling splits the milk and toughens the fish.'},
    'Crispy Tofu Poke':{k:'TOFU TIP',t:'Press 20 minutes, then coat in cornstarch only at the last second. Wet tofu steams; dry tofu crisps.'},
    'Tofu Bibimbap':{k:'TOFU TIP',t:'Air-dry the pressed cubes uncovered in the fridge overnight — the drier the surface, the deeper the golden crust.'},
    'Sesame Tofu Soba':{k:'SOBA TIP',t:'Rinse cooked soba under cold water until it stops feeling slippery — surface starch is what makes noodles clump.'},
    'Teriyaki Tofu Soba':{k:'SOBA TIP',t:'Rinse cooked soba under cold water until it stops feeling slippery — surface starch is what makes noodles clump.'},
    'Beef Pad Krapow':{k:'BEEF TIP',t:'Two-stage method: sear the beef undisturbed 60 seconds, remove it, cook the veg, return it for the final 30. Never leave beef in while veg cooks.'},
    'Korean Beef Bibimbap':{k:'BEEF TIP',t:'Partially freeze the beef 20 minutes before slicing — paper-thin cuts against the grain, nearly translucent.'},
    'Prawn Pad See Ew':{k:'PRAWN TIP',t:'Pat prawns completely dry before they hit the wok — wet prawns steam grey instead of searing pink.'},
    'Garlic Prawn Donburi':{k:'PRAWN TIP',t:'Pat prawns completely dry before they hit the pan — wet prawns steam grey instead of searing pink.'},
    'Chicken Katsu Curry':{k:'KATSU TIP',t:'Rest 3 minutes before slicing so the crust stays welded on, then cut with one confident stroke per piece.'},
    'Hainanese Chicken Rice':{k:'POACH TIP',t:'Rest the chicken in the hot broth 10 minutes off the heat — carryover poaching is what keeps it silky.'},
    'Pad Thai':{k:'NOODLE TIP',t:'Soak the noodles until pliable but still firm — they finish cooking in the wok, not the bowl.'},
    'Smoked Salmon Eggs':{k:'EGG TIP',t:'Low heat is the only rule. Pull the pan while the eggs still look slightly wet — they finish from residual heat.'},
    'Mapo Tofu Rice':{k:'TOFU TIP',t:'Rest the cubes in warm salted water while you cook — it firms and seasons silken tofu so it survives the simmer.'},
  };
  gutNotes = {
    'Miso Salmon Bowl':'Miso brings live fermented cultures; salmon omega-3s calm the gut lining; edamame fibre feeds Bifidobacterium.',
    'Tofu Bibimbap':'Gochujang is fermented, day-old rice carries resistant starch, and spinach fibre adds bulk — three gut wins in one bowl.',
    'Chicken Katsu Curry':'Onion and carrot simmered into the sauce are classic prebiotics — onion fructans feed your beneficial bacteria directly.',
    'Matcha Chia Pudding':'Chia forms a prebiotic gel overnight; matcha catechins selectively boost gut-protective bacteria; yogurt reseeds live cultures.',
    'Edamame Sesame':'Edamame isoflavones are converted by your microbiome into equol; sesame lignans support microbial diversity.',
    'Matcha Yogurt Cup':'Live yogurt cultures plus berry polyphenols — fermented in the colon into short-chain fatty acids.',
    'Ginger Soy Salmon Bowl':'Ginger gingerols stimulate gastric motility; pak choi glucosinolates convert to gut-protective compounds.',
    'Sesame Tofu Soba':'Buckwheat soba brings resistant starch; sesame lignans support microbiome diversity.',
    'Teriyaki Tofu Soba':'Buckwheat soba brings resistant starch; broccoli glucosinolates convert to gut-protective compounds.',
    'Coconut Mango Oats':'Oat beta-glucan feeds Bifidobacterium and Lactobacillus directly — the best-studied prebiotic fibre there is.',
    'Banana Matcha Smoothie':'Slightly green bananas are rich in resistant starch; matcha catechins feed protective bacteria.',
    'Smoked Salmon Eggs':'Wholegrain toast beta-glucan feeds Bifidobacterium; omega-3s reduce inflammatory cytokines in the gut lining.',
    'Korean Beef Bibimbap':'Gochujang is fermented, and the separate vegetable piles bring three different fibres — diversity is what a microbiome wants.',
    'Beef Pad Krapow':'Garlic allicin — mince it 5 minutes before cooking to fully activate — is one of the most potent natural prebiotics.',
    'Honey Garlic Salmon':'Garlic plus broccoli is a prebiotic double act: allicin and glucosinolates both feed protective species.',
    'Crispy Tofu Poke':'Nori polysaccharides can only be fermented by gut bacteria — a unique prebiotic; avocado fibre feeds F. prausnitzii.',
    'Rice Cakes & PB':'Banana resistant starch plus peanut fibre — steady fuel for short-chain fatty acid production.',
    'Boiled Eggs & Apple':'Apple pectin is a gentle, well-studied prebiotic; eggs bring the highest-bioavailability protein there is.',
  };

  // ============ PROFILE ============
  prefCycles = {
    diet: ['Pescatarian','Omnivore','Vegetarian','Halal'],
    time: ['2 hours','2.5 hours','3 hours','90 min'],
    allergies: ['Peanuts','Shellfish','Gluten','None'],
    notif: ['Sun mornings','Sat evenings','Off'],
  };
  cyclePref(key) {
    const opts = this.prefCycles[key];
    const cur = (this.state.prefs||{})[key] || opts[0];
    const next = opts[(opts.indexOf(cur)+1)%opts.length];
    this.setState({ prefs:{...(this.state.prefs||{}), [key]:next} });
  }
  renderProfile() {
    const C=this.C, st=this.state;
    const who = st.profilePerson||'me';
    const p = st.people[who];
    const other = who==='me'?'partner':'me';
    const cuisines = st.obCuisines||this.obDefaults;
    const picked = this.obCuisineList.filter(c=>cuisines[c]);
    const prefs = st.prefs||{};
    const hh = st.obHousehold||2;
    const t = this.targetsFor(p);
    const row = (label, value, fn, open) => e('button',{key:label,onClick:fn,style:{width:'100%',border:'none',cursor:'pointer',background:'transparent',textAlign:'left',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'15px 0',borderBottom:'1px solid rgba(56,44,36,.08)'}},
      e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:15,color:C.sumi}},label),
      e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,color:open?'#8C5B3F':'#9a8a76',fontWeight:open?600:400}},value+' ›'));
    return e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}},
      this.statusBar(false),
      e('div',{key:'hd',style:{padding:'14px 26px 0',display:'flex',alignItems:'center',gap:16,flex:'0 0 auto'}},
        e('div',{style:{width:64,height:64,borderRadius:'50%',background:who==='me'?'#CB9C8B':'#8FB3C8',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:24}},p.name[0]),
        e('div',{style:{flex:1}},
          e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:27,color:C.sumi,lineHeight:1.05}},p.name),
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,color:'#9a8a76',marginTop:3}},p.heightLabel+' · '+p.weight+'kg · '+t.protein+'g protein / day')),
        e('button',{onClick:()=>this.setState({profilePerson:other}),style:{border:'none',cursor:'pointer',background:'#F1EDE4',color:C.sumi,padding:'9px 14px',borderRadius:22,fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:12}},'⇄ '+st.people[other].name)),
      e('div',{key:'stats',style:{margin:'22px 26px 0',background:'#EFE3D0',borderRadius:20,padding:'20px 16px',display:'flex',justifyContent:'space-between',color:C.sumi,flex:'0 0 auto'}},
        e('div',{style:{textAlign:'center',flex:1}},e('div',{style:{fontFamily:"'Newsreader',serif",fontSize:26}},'18'),e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:'.08em',color:'#6B5D50',marginTop:3}},'SUNDAYS')),
        e('div',{style:{width:1,background:'rgba(56,44,36,.14)'}}),
        e('div',{style:{textAlign:'center',flex:1}},e('div',{style:{fontFamily:"'Newsreader',serif",fontSize:26}},'92'),e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:'.08em',color:'#6B5D50',marginTop:3}},'DISHES')),
        e('div',{style:{width:1,background:'rgba(56,44,36,.14)'}}),
        e('div',{style:{textAlign:'center',flex:1}},e('div',{style:{fontFamily:"'Newsreader',serif",fontSize:26}},'6',e('span',{style:{fontSize:14}},'wk')),e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:'.08em',color:'#6B5D50',marginTop:3}},'STREAK'))),
      e('div',{key:'prefs',style:{flex:1,overflowY:'auto',padding:'26px 26px 0'}},
        e('div',{style:{fontFamily:"'Newsreader',serif",fontStyle:'italic',fontSize:18,color:C.sumi,marginBottom:6}},'Preferences',e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontStyle:'normal',fontSize:11,color:'#9a8a76',marginLeft:8}},'tap to change')),
        row('Cuisines', picked.length?picked.slice(0,2).join(', ')+(picked.length>2?' +'+(picked.length-2):''):'None', ()=>this.setState({profCuisinesOpen:!st.profCuisinesOpen}), st.profCuisinesOpen),
        st.profCuisinesOpen ? e('div',{style:{display:'flex',flexWrap:'wrap',gap:8,padding:'12px 0',borderBottom:'1px solid rgba(56,44,36,.08)'}},
          this.obCuisineList.map(cl=>e('button',{key:cl,onClick:()=>this.setState({obCuisines:{...cuisines,[cl]:!cuisines[cl]}}),style:{padding:'7px 13px',borderRadius:20,border:'none',cursor:'pointer',background:cuisines[cl]?C.sumi:'transparent',color:cuisines[cl]?C.kinari:C.sumi,boxShadow:cuisines[cl]?'none':'inset 0 0 0 1px rgba(56,44,36,.22)',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12.5}},cl))) : null,
        row('Diet', prefs.diet||'Pescatarian', ()=>this.cyclePref('diet')),
        row('Household', hh+' people', ()=>this.setState({obHousehold:hh>=4?1:hh+1})),
        row('Sunday time budget', prefs.time||st.obTime||'2 hours', ()=>this.cyclePref('time')),
        row('Allergies', prefs.allergies||'Peanuts', ()=>this.cyclePref('allergies')),
        row('Notifications', prefs.notif||'Sun mornings', ()=>this.cyclePref('notif'))),
      e('div',{key:'ft',style:{flex:'0 0 auto',padding:'14px 26px 28px',textAlign:'center',fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:14,color:'#9a8a76'}},'Sign out'));
  }

  // ============ HOME · GOALS DASHBOARD ============
  weekPlannedKcal() {
    const week = this.state.week || this.buildWeek();
    let total = 0, count = 0;
    this.slots.forEach(s => (week[s]||[]).forEach(n => { if (n) { total += (this.kcal[n]||0); count++; } }));
    return count ? Math.round(total/count) : 0;
  }
  personCard(key) {
    const C=this.C, st=this.state, p=st.people[key], t=this.targetsFor(p);
    const stepRow = (label, val, unit, dec, inc, disMin, disMax) => e('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}},
      e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12.5,color:'#57493C',fontWeight:600}},label),
      e('div',{style:{display:'flex',alignItems:'center',gap:10}},
        e('button',{onClick:dec,disabled:disMin,style:{width:26,height:26,borderRadius:'50%',border:'none',cursor:disMin?'default':'pointer',background:disMin?'rgba(56,44,36,.10)':'#fff',color:C.sumi,fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:disMin?'none':'0 2px 6px rgba(40,30,22,.12)'}},'−'),
        e('span',{style:{fontFamily:"'Newsreader',serif",fontSize:16,color:C.sumi,minWidth:44,textAlign:'center'}},val+unit),
        e('button',{onClick:inc,disabled:disMax,style:{width:26,height:26,borderRadius:'50%',border:'none',cursor:disMax?'default':'pointer',background:disMax?'rgba(56,44,36,.10)':'#fff',color:C.sumi,fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:disMax?'none':'0 2px 6px rgba(40,30,22,.12)'}},'+')));
    const stat = (label, val, unit) => e('div',{style:{flex:1,textAlign:'center'}},
      e('div',{style:{fontFamily:"'Newsreader',serif",fontSize:22,color:C.sumi}},val,e('span',{style:{fontSize:12,marginLeft:2,color:'#6b5d50'}},unit)),
      e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:'.08em',color:'#6b5d50',marginTop:2}},label));
    return e('div',{key,style:{background:'#fff',borderRadius:20,padding:'18px 18px 16px',boxShadow:'0 3px 14px rgba(40,30,22,.06)',marginBottom:12}},
      e('div',{style:{display:'flex',alignItems:'center',gap:11,marginBottom:14}},
        e('span',{style:{width:38,height:38,borderRadius:'50%',background:p.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,fontSize:15,flexShrink:0}},p.name[0]),
        e('div',null,
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,fontSize:15.5,color:C.sumi}},p.name),
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:'#9a8a76'}},p.heightLabel+' · '+p.weight+'kg · '+p.workouts+'x/wk'))),
      stepRow('Weight', p.weight, 'kg', ()=>this.updatePerson(key,{weight:Math.max(35,p.weight-1)}), ()=>this.updatePerson(key,{weight:Math.min(150,p.weight+1)}), p.weight<=35, p.weight>=150),
      stepRow('Workout days / wk', p.workouts, '', ()=>this.updatePerson(key,{workouts:Math.max(0,p.workouts-1)}), ()=>this.updatePerson(key,{workouts:Math.min(7,p.workouts+1)}), p.workouts<=0, p.workouts>=7),
      e('div',{style:{display:'flex',background:key==='me'?'#F6ECE1':'#F3EBDD',borderRadius:14,padding:'12px 6px',marginTop:12}},
        stat('KCAL/DAY', t.kcal, ''), stat('PROTEIN', t.protein, 'g'), stat('FIBER', t.fiber, 'g')));
  }
  renderHome() {
    const C=this.C, st=this.state;
    if (st.homeView==='glance') return this.renderMeals(true);
    const plannedAvg = this.weekPlannedKcal();
    return [
      e('div',{key:'sb',style:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 26px 6px',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,fontWeight:600,color:C.sumi,flex:'0 0 auto'}},
        e('span',null,'9:41'), e('span',{style:{width:16,height:8,border:'1px solid '+C.sumi,borderRadius:2,display:'inline-block'}})),
      e('div',{key:'hd',style:{padding:'12px 26px 0',display:'flex',justifyContent:'space-between',alignItems:'center',flex:'0 0 auto'}},
        e('div',{style:{display:'flex',alignItems:'center',gap:9}},
          e('span',{style:{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:2}},
            e('span',{style:{width:19,height:18,background:'#C8754E',borderRadius:'50% 50% 47% 53% / 55% 55% 46% 46%',display:'block'}}),
            e('span',{style:{width:27,height:15,background:'#EFE6D2',boxShadow:'inset 0 0 0 1px rgba(56,44,36,.10)',borderRadius:'4px 4px 50% 50% / 4px 4px 96% 96%',display:'block'}})),
          e('span',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:25,color:C.sumi,lineHeight:1}},'Sundō')),
        e('span',{onClick:()=>this.setState({tab:'profile'}),style:{width:38,height:38,borderRadius:'50%',background:C.sumi,color:C.kinari,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:14,cursor:'pointer'}},st.people.me.name[0])),
      e('div',{key:'ti',style:{padding:'20px 26px 0',flex:'0 0 auto'}},
        e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.1em',color:'#9a8a76'}},'WED–FRI · REST OF WEEK'),
        e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:29,lineHeight:1.08,color:C.sumi,letterSpacing:'-.01em',marginTop:8}},'Your goals, ',e('span',{style:{fontWeight:600}},'recalculated'))),
      e('div',{key:'sc',style:{flex:1,overflowY:'auto',padding:'16px 26px 8px'}},
        this.personCard('me'), this.personCard('partner'),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:'#9a8a76',textAlign:'center',margin:'2px 4px 16px'}},'Planned meals average ~'+plannedAvg+' kcal each'),
        e('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:8}},
          e('div',{style:{fontFamily:"'Newsreader',serif",fontStyle:'italic',fontSize:17,color:C.sumi}},"This week's meals"),
          e('div',{onClick:()=>this.setState({homeView:'glance'}),style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12,fontWeight:600,color:'#8C5B3F',cursor:'pointer',display:'flex',alignItems:'center',gap:3}},'See all',e('span',{style:{fontSize:14}},'›'))),
        this.thisWeekMains().slice(0,3).map(n=>{
          const r=this.recipes[n];
          return e('div',{key:n,'data-dish':n,style:{display:'flex',alignItems:'center',gap:13,background:'#fff',borderRadius:16,padding:'10px 12px',cursor:'pointer',boxShadow:'0 3px 12px rgba(40,30,22,.05)',marginBottom:9}},
            e('img',{src:this.dishSrc(n),alt:'',style:{width:42,height:42,borderRadius:11,flexShrink:0,objectFit:'cover'}}),
            e('div',{style:{flex:1}},
              e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:14.5,color:C.sumi}},n),
              e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:'#9a8a76',marginTop:1}},r.cuisine+' · '+r.time)),
            e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:16,color:'#8C5B3F'}},'›'));
        })),
    ];
  }

  // ============ MEALS AT A GLANCE ============
  buildWeek() { const w={}; this.slots.forEach(s=>{w[s]=this.options[s].slice();}); return w; }
  thisWeekMains() {
    const week = this.state.week || this.buildWeek();
    return [...(week.Lunch||[]), ...(week.Dinner||[])];
  }
  renderMeals(fromHome) {
    const C=this.C, st=this.state, week=st.week||this.buildWeek();
    const visDays = st.dayFilter==='all' ? this.days.map((_,i)=>i) : [st.dayFilter];
    const single = visDays.length===1;
    const chip = (label,val) => { const on=st.dayFilter===val; return e('button',{key:String(val),onClick:()=>this.setState({dayFilter:val,selected:null,swapOpen:false}),style:{flex:'0 0 auto',padding:'8px 15px',borderRadius:22,border:'none',cursor:'pointer',background:on?C.sumi:'transparent',color:on?C.kinari:C.sumi,boxShadow:on?'none':'inset 0 0 0 1px rgba(56,44,36,.18)',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,fontWeight:600}},label); };
    const cell = (slot,dayIdx) => {
      const name=(week[slot]||[])[dayIdx]||'', key=slot+'-'+dayIdx, done=!!st.cooked[key];
      const sel=st.selected&&st.selected.slot===slot&&st.selected.dayIdx===dayIdx;
      return e('button',{key,onClick:()=>this.setState({selected:sel?null:{slot,dayIdx},swapOpen:false}),style:{flex:1,minWidth:0,textAlign:'left',cursor:'pointer',background:sel?C.sumi:C.card,color:sel?C.kinari:C.sumi,border:'none',borderRadius:11,padding:single?'12px 12px':'8px 8px',boxShadow:sel?'0 4px 14px rgba(56,44,36,.22)':'0 1px 4px rgba(40,30,22,.06)',display:'flex',flexDirection:'column',gap:5,opacity:done&&!sel?.5:1,transition:'all .15s'}},
        e('span',{style:{display:'flex',alignItems:'center',gap:6}},
          e('span',{style:{width:7,height:7,borderRadius:'50%',flex:'0 0 auto',background:this.slotColor[slot]}}),
          single?e('span',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:'.08em',color:sel?'rgba(242,232,213,.6)':C.mut}},slot.toUpperCase()):null,
          single&&slot==='Snack'&&this.days[dayIdx].sub==='Gym'?e('span',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:7.5,letterSpacing:'.08em',color:sel?'rgba(242,232,213,.75)':'#7C8A5E',background:sel?'rgba(242,232,213,.14)':'#EDF0E0',padding:'2px 6px',borderRadius:8}},'POST-WORKOUT'):null,
          done?e('span',{style:{marginLeft:'auto',fontSize:10,color:sel?C.kinari:this.slotColor[slot]}},'✓ cooked'):null),
        e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:single?15:11.5,lineHeight:1.2,textDecoration:done?'line-through':'none'}},name),
        single?e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12,color:sel?'rgba(242,232,213,.55)':C.mut}},(this.kcalOf(name)||'')+' kcal'):null);
    };
    const dayCol = (dayIdx) => e('div',{key:dayIdx,style:{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:6}},
      e('div',{style:{textAlign:'center',paddingBottom:2}},
        e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:15,color:C.sumi}},this.days[dayIdx].k),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:9.5,color:C.mut}},this.days[dayIdx].sub)),
      this.slots.map(s=>cell(s,dayIdx)));

    const totalCooked = Object.values(st.cooked).filter(Boolean).length;
    const plan = st.activePlan;
    return [
      this.statusBar(false),
      e('div',{key:'hd',style:{padding:'12px 24px 0',flex:'0 0 auto'}},
        fromHome ? e('button',{onClick:()=>this.setState({homeView:'home'}),style:{border:'none',background:'transparent',cursor:'pointer',padding:0,marginBottom:10,display:'flex',alignItems:'center',gap:6,fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,fontWeight:600,color:C.mut}},e('span',{style:{fontSize:17,lineHeight:1}},'‹'),'Home') : null,
        e('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline'}},
          e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:27,color:C.sumi}},plan?'Week '+plan.week:'This week'),
          e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.mut}},totalCooked+' / '+(this.days.length*this.slots.length)+' cooked')),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12.5,color:C.mut,marginTop:3}},plan?(plan.theme+' · tap to open · swap · check off'):'Tap a meal to open · swap · check off')),
      e('div',{key:'fl',style:{display:'flex',gap:8,padding:'14px 24px 4px',overflowX:'auto',flex:'0 0 auto'}},
        chip('All days','all'), this.days.map((d,i)=>chip(d.k,i))),
      e('div',{key:'gr',style:{flex:1,overflowY:'auto',padding:'12px 22px 8px',display:'flex',gap:8,alignItems:'flex-start'}}, visDays.map(dayCol)),
      st.selected ? this.mealSheet() : this.legend(),
    ];
  }
  legend() {
    const C=this.C;
    return e('div',{key:'lg',style:{flex:'0 0 auto',borderTop:'1px solid '+C.line,padding:'12px 24px 22px',display:'flex',gap:14,flexWrap:'wrap'}},
      this.slots.map(s=>e('span',{key:s,style:{display:'flex',alignItems:'center',gap:6,fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:C.body}},
        e('span',{style:{width:8,height:8,borderRadius:'50%',background:this.slotColor[s]}}),s)));
  }
  mealSheet() {
    const C=this.C, st=this.state, week=st.week||this.buildWeek(), {slot,dayIdx}=st.selected;
    const name=(week[slot]||[])[dayIdx]||'', key=slot+'-'+dayIdx, done=!!st.cooked[key];
    const act = (label,bg,fg,fn) => e('button',{onClick:fn,style:{flex:1,padding:'12px',borderRadius:24,border:'none',cursor:'pointer',background:bg,color:fg,fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:13}},label);
    return e('div',{key:'sh',style:{flex:'0 0 auto',borderTop:'1px solid '+C.line,background:C.card,padding:'16px 22px 22px',boxShadow:'0 -6px 20px rgba(40,30,22,.06)'}},
      e('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:3}},
        e('span',{style:{width:8,height:8,borderRadius:'50%',background:this.slotColor[slot]}}),
        e('span',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:'.1em',color:C.mut}},this.days[dayIdx].k.toUpperCase()+' · '+slot.toUpperCase())),
      e('div',{style:{display:'flex',alignItems:'center',gap:12,marginBottom:14}},
        e('image-slot',{key:'photo-'+this.slugOf(name),id:'photo-'+this.slugOf(name),shape:'rounded',fit:'cover',placeholder:'photo',src:this.dishSrc(name),style:{width:54,height:54,borderRadius:12,flexShrink:0,display:'block',overflow:'hidden'}}),
        e('div',{style:{flex:1,minWidth:0}},
          e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:22,color:C.sumi,lineHeight:1.1}},name),
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12.5,color:C.mut,marginTop:3}},(this.kcalOf(name)||'')+' kcal · tap a swap option below'))),
      st.swapOpen ? e('div',{style:{display:'flex',flexDirection:'column',gap:6,marginBottom:14}},
        ((st.activePlan&&(slot==='Lunch'||slot==='Dinner'))?st.activePlan.dishes:this.options[slot]).map(opt=>{const cur=opt===name; return e('button',{key:opt,onClick:()=>{const cw=st.week||this.buildWeek();const w={...cw,[slot]:cw[slot].slice()};w[slot][dayIdx]=opt;this.setState({week:w,swapOpen:false});},style:{textAlign:'left',padding:'11px 14px',borderRadius:12,border:'none',cursor:'pointer',background:cur?C.sumi:C.paper,color:cur?C.kinari:C.sumi,fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13.5,fontWeight:cur?600:500,display:'flex',justifyContent:'space-between'}},e('span',null,opt),e('span',{style:{color:cur?'rgba(242,232,213,.6)':C.mut,fontSize:12}},(this.kcalOf(opt))+' kcal'));}))
      : e('div',{style:{display:'flex',gap:9}},
          act('Open recipe',C.sumi,C.kinari,()=>{this.setState({segTab:'ingredients'});this.openRecipe(name);}),
          act(done?'✓ Cooked':'Mark cooked',done?C.matcha:C.paper,done?'#fff':C.sumi,()=>this.setState({cooked:{...st.cooked,[key]:!done}})),
          act('Swap','#4A3527','#fff',()=>this.setState({swapOpen:true}))));
  }

  // ============ RECIPE ============
  curRec() { return this.recipes[this.state.currentRecipe] || this.recipes['Miso Salmon Bowl']; }
  scaleQty(q, base) {
    const v = q * this.state.servings / (base||2);
    return Math.round(v*100)/100;
  }
  // per-person portion scale: this meal assumed to cover ~1/3 of the person's daily protein goal
  personPortionScale(person) { return this.portionScaleFor(this.curRec(), person); }
  swapIcon(color) {
    const c = color||'#EC7F5E';
    return e('svg',{width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:c,strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'},
      e('path',{key:'a',d:'M4 8h13'}), e('path',{key:'b',d:'M14 5l3 3-3 3'}),
      e('path',{key:'c',d:'M20 16H7'}), e('path',{key:'d',d:'M10 13l-3 3 3 3'}));
  }
  ingredientsPanel() {
    const C=this.C, st=this.state, r=this.curRec();
    const me = st.people.me, partner = st.people.partner;
    const sCyn = this.personPortionScale(me), sGab = this.personPortionScale(partner);
    const fmt = (v)=>{ const x=Math.round(v*10)/10; return x%1===0?x:x.toFixed(1); };
    // per-person macro split: food grams per category + nutrient protein total
    const split = (person)=>{
      const scale=this.personPortionScale(person), divisor=(r.base||2)*(r.weeklyReference?3:1);
      const out={protein:0,carb:0,veg:0};
      r.ingredients.forEach(ing=>{
        const amt = ing.q/divisor*scale;
        if (ing.u==='g' && out[ing.cat]!==undefined) out[ing.cat]+=amt;
      });
      return {protein:Math.round(out.protein),carb:Math.round(out.carb),veg:Math.round(out.veg),protG:this.mealProteinTarget(person)};
    };
    const spCyn = split(me), spGab = split(partner);
    // named main items per category, per person: e.g. Salmon 98g / Rice 75g / Edamame 45g
    const mainItems = ['protein','carb','veg'].map(cat=>{
      const gItems = r.ingredients.filter(ing=>ing.cat===cat && ing.u==='g');
      if(!gItems.length) return null;
      return gItems.reduce((a,b)=>b.q>a.q?b:a);
    }).filter(Boolean);
    const personHead = (p, scale, sp) => e('div',{key:p.name,style:{flex:1,background:p===me?'#F6ECE1':'#F3EBDD',borderRadius:14,padding:'12px 12px'}},
      e('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:5}},
        e('span',{style:{width:22,height:22,borderRadius:'50%',background:p.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,fontSize:11,flexShrink:0}},p.name[0]),
        e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,fontSize:13.5,color:C.sumi}},p.name)),
      e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11,color:'#6b5d50',marginBottom:8}},p.heightLabel+' · '+p.weight+'kg'),
      e('div',{style:{display:'flex',flexDirection:'column',gap:4}},
        mainItems.map(ing=>e('div',{key:ing.n,style:{display:'flex',justifyContent:'space-between',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12,color:'#57493C'}},
          e('span',{style:{fontWeight:600}},ing.short||ing.n),
          e('span',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11}},Math.round(ing.q/((r.base||2)*(r.weeklyReference?3:1))*scale)+'g'))),
        e('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,color:p.color,borderTop:'1px solid rgba(56,44,36,.10)',paddingTop:5,marginTop:2}},
          e('span',{style:{fontWeight:700}},'Protein'),
          e('span',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:700}},sp.protG+'g'))));
    const catMeta = [
      {id:'protein', label:'PROTEIN', color:'#8C5B3F'},
      {id:'carb', label:'CARBS', color:'#CB9C8B'},
      {id:'veg', label:'VEG', color:'#7C8A5E'},
      {id:'sauce', label:'SAUCE & EXTRAS', color:'#9a8a76'},
    ];
    const sTot = sCyn + sGab;
    const weeklyTotals = (r.weeklyReference || r.weeklyDynamic) ? this.weeklyRecipeTotals(r) : null;
    const totalLabel = weeklyTotals ? 'TOTAL TO PREP' : (r.fixedPlan && r.base>2 ? 'TOTAL TO PREP' : 'TOTAL TO COOK');
    const row = (ing,i) => {
      const total = weeklyTotals ? weeklyTotals.totalIngredients[ing.n] : (r.fixedPlan ? ing.q : ing.q/r.base*sTot);
      return e('div',{key:i,style:{display:'flex',alignItems:'center',padding:'9px 4px',borderBottom:'1px solid '+C.line}},
        e('span',{style:{flex:2,fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13.5,color:C.sumi}},ing.n),
        e('span',{style:{flex:1,textAlign:'right',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13.5,fontWeight:600,color:C.sumi}},fmt(total)+(ing.u?' '+ing.u:'')),
        this.isSpecialty(ing)?e('button',{onClick:()=>this.setState({subOpen:ing,subVote:null}),title:'Hard to find? Tap for swaps',style:{flex:'0 0 auto',marginLeft:12,width:30,height:30,borderRadius:'50%',border:'none',cursor:'pointer',background:'rgba(236,127,94,.1)',display:'flex',alignItems:'center',justifyContent:'center'}}, this.swapIcon()):null);
    };
    const hasSpecialty = r.ingredients.some(ing=>this.isSpecialty(ing));
    return e('div',{style:{padding:'18px 24px 8px'}},
      hasSpecialty?e('div',{key:'adapt',onClick:()=>this.setState({subOpen:'__adapt__',subVote:null}),style:{background:C.sumi,borderRadius:16,padding:'14px 16px',marginBottom:16,display:'flex',alignItems:'center',cursor:'pointer',boxShadow:'0 6px 16px rgba(56,44,36,.18)'}},
        e('div',{style:{flex:1}},
          e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:21,color:C.kinari,lineHeight:1}},'Adapt recipe'),
          e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12,color:'rgba(242,232,213,.6)',marginTop:4}},'Swaps for hard-to-find ingredients')),
        e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:22,color:'rgba(242,232,213,.75)'}},'›')):null,
      e('div',{style:{display:'flex',gap:10,marginBottom:16}}, personHead(me,sCyn,spCyn), personHead(partner,sGab,spGab)),
      e('div',{style:{display:'flex',padding:'0 4px 8px',fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:'.06em',color:C.mut}},
        e('span',{style:{flex:2}},'INGREDIENT'), e('span',{style:{flex:1,textAlign:'right'}},totalLabel)),
      catMeta.map(cat=>{
        const items = r.ingredients.filter(ing=>ing.cat===cat.id);
        if (!items.length) return null;
        return e('div',{key:cat.id},
          e('div',{style:{display:'flex',alignItems:'center',gap:7,padding:'12px 4px 4px'}},
            e('span',{style:{width:7,height:7,borderRadius:'50%',background:cat.color}}),
            e('span',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9.5,letterSpacing:'.1em',color:'#6b5d50'}},cat.label)),
          items.map(row));
      }),
      (()=>{const nm=this.resolveRecipe?this.resolveRecipe(st.currentRecipe):st.currentRecipe;const g=this.gutNotes[nm];
        return g?e('div',{key:'gut',style:{marginTop:14,background:'#EDF0E0',borderRadius:14,padding:'12px 14px'}},
          e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9.5,letterSpacing:'.12em',color:'#7C8A5E',marginBottom:5}},'GOOD FOR YOUR GUT'),
          e('div',{style:{fontFamily:"'Newsreader',serif",fontStyle:'italic',fontSize:13.5,lineHeight:1.5,color:'#57493C'}},g)):null;})());
  }
  methodPanel() {
    const C=this.C;
    const tipNm=this.resolveRecipe?this.resolveRecipe(this.state.currentRecipe):this.state.currentRecipe;
    const tip=this.recipeTips[tipNm];
    return e('div',{style:{padding:'20px 24px 8px'}},
      tip?e('div',{key:'tip',style:{background:'#F6ECE1',borderRadius:14,padding:'12px 14px',marginBottom:16}},
        e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9.5,letterSpacing:'.12em',color:'#8C5B3F',marginBottom:5}},tip.k),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12.5,lineHeight:1.55,color:this.C.body}},tip.t)):null,
      this.methodFor().map((m,i)=>e('div',{key:i,style:{display:'flex',gap:14,paddingBottom:18}},
        e('div',{style:{flex:'0 0 auto',width:28,height:28,borderRadius:'50%',background:i===0?'#4A3527':C.paper,color:i===0?'#fff':C.sumi,boxShadow:i===0?'none':'inset 0 0 0 1.5px rgba(56,44,36,.18)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Newsreader',serif",fontSize:15}},i+1),
        e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:14,lineHeight:1.5,color:C.body,paddingTop:3}},m))));
  }
  thumb(up) {
    return e('svg',{width:16,height:16,viewBox:'0 0 24 24',fill:'currentColor',style:{transform:up?'none':'rotate(180deg)',display:'block'}}, e('path',{d:'M2 21h4V9H2v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z'}));
  }
  subSheet() {
    const C=this.C, st=this.state, open=st.subOpen;
    if (!open) return null;
    const close=()=>this.setState({subOpen:null});
    const overlay=(inner)=>e('div',{key:'subov',onClick:close,style:{position:'absolute',inset:0,zIndex:30,background:'rgba(40,30,22,.42)',display:'flex',flexDirection:'column',justifyContent:'flex-end',borderRadius:44,overflow:'hidden'}},
      e('div',{onClick:(ev)=>ev.stopPropagation(),style:{background:'#FBF8F2',borderRadius:'26px 26px 0 0',padding:'22px 24px 26px',maxHeight:'80%',overflowY:'auto',boxShadow:'0 -10px 30px rgba(40,30,22,.25)'}}, inner));
    if (open==='__adapt__') {
      const specials = this.curRec().ingredients.filter(ing=>this.isSpecialty(ing));
      return overlay([
        e('div',{key:'hd',style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}},
          e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:25,color:C.sumi}},'Adapt recipe'),
          e('button',{onClick:close,style:{border:'none',background:'transparent',cursor:'pointer',fontSize:19,color:'#9a8a76'}},'✕')),
        e('div',{key:'sub',style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,color:'#6b5d50',lineHeight:1.55,marginBottom:18}},'Couldn\u2019t find a specialty ingredient at the shops? Here\u2019s what to use instead, or how to make it at home. Tap the swap icon beside any specialty item too.'),
        specials.length?e('div',{key:'sp'},
          e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9.5,letterSpacing:'.12em',color:'#9a8a76',marginBottom:9}},'HARDER TO FIND IN THIS RECIPE'),
          specials.map(ing=>e('button',{key:ing.n,onClick:()=>this.setState({subOpen:ing,subVote:null}),style:{width:'100%',display:'flex',alignItems:'center',gap:11,border:'none',cursor:'pointer',background:'#fff',borderRadius:14,padding:'12px 14px',marginBottom:8,boxShadow:'0 2px 8px rgba(40,30,22,.05)',textAlign:'left'}},
            e('span',{style:{width:30,height:30,borderRadius:'50%',flex:'0 0 auto',background:'rgba(236,127,94,.1)',display:'flex',alignItems:'center',justifyContent:'center'}},this.swapIcon()),
            e('span',{style:{flex:1,fontFamily:"'Hanken Grotesk',sans-serif",fontSize:14,fontWeight:600,color:C.sumi}},ing.n),
            e('span',{style:{color:'#9a8a76',fontSize:18}},'›')))):
          e('div',{key:'none',style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,color:'#9a8a76'}},'Tap the swap icon beside any ingredient to see substitutions.')
      ]);
    }
    const s=this.subFor(open), vote=st.subVote;
    const items=[
      e('div',{key:'hd',style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}},
        e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:25,color:C.sumi}},s.label),
        e('button',{onClick:close,style:{border:'none',background:'transparent',cursor:'pointer',fontSize:19,color:'#9a8a76'}},'✕')),
      e('div',{key:'alth',style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,fontSize:16,color:C.sumi,marginBottom:12}},'Alternatives'),
      ...s.alts.map((a,i)=>e('div',{key:'alt'+i,style:{display:'flex',gap:11,marginBottom:12,alignItems:'flex-start'}},
        e('span',{style:{flex:'0 0 auto',marginTop:1,width:26,height:26,borderRadius:'50%',background:'rgba(236,127,94,.1)',display:'flex',alignItems:'center',justifyContent:'center'}},this.swapIcon()),
        e('div',{style:{flex:1,fontFamily:"'Hanken Grotesk',sans-serif",fontSize:14,lineHeight:1.5,color:C.sumi}},a))),
    ];
    if (s.home) {
      items.push(e('div',{key:'homeh',style:{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,fontSize:16,color:C.sumi,margin:'6px 0 10px'}},'Make it at home'));
      items.push(e('div',{key:'homebox',style:{background:'#EDF0E0',borderRadius:14,padding:'14px 16px',marginBottom:14}},
        e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9.5,letterSpacing:'.1em',color:'#5f6b3e',marginBottom:9}},'STIR TOGETHER'),
        s.home.map((h,i)=>e('div',{key:i,style:{display:'flex',gap:9,marginBottom:i===s.home.length-1?0:6,alignItems:'baseline'}},
          e('span',{style:{width:5,height:5,borderRadius:'50%',flex:'0 0 auto',background:'#7C8A5E'}}),
          e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13.5,color:'#57493C'}},h)))));
    }
    if (s.note) items.push(e('div',{key:'note',style:{fontFamily:"'Newsreader',serif",fontStyle:'italic',fontSize:13.5,lineHeight:1.55,color:'#57493C',marginBottom:16}},s.note));
    items.push(e('div',{key:'help',style:{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#fff',borderRadius:14,padding:'12px 14px',boxShadow:'0 2px 8px rgba(40,30,22,.05)',marginBottom:12}},
      e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13.5,fontWeight:600,color:C.sumi}},vote?'Thanks — noted':'Were these suggestions helpful?'),
      e('div',{style:{display:'flex',gap:8}},
        [false,true].map(up=>e('button',{key:String(up),onClick:()=>this.setState({subVote:up?'up':'down'}),style:{width:42,height:36,borderRadius:11,border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',background:vote===(up?'up':'down')?(up?'#7C8A5E':'#CB9C8B'):'#F1EDE4',color:vote===(up?'up':'down')?'#fff':'#8a7c6c'}},this.thumb(up))))));
    items.push(e('div',{key:'disc',style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:11.5,lineHeight:1.5,color:'#9a8a76',textAlign:'center',background:'#F3EED9',borderRadius:12,padding:'11px 14px'}},'These are suggestions — they won\u2019t change your recipe or shopping list, so please make a note.'));
    return overlay(items);
  }

  renderRecipe(swipe) {
    const C=this.C, st=this.state;
    const active = swipe ? (st.swipeIdx===0?'ingredients':'method') : st.segTab;
    const setTab = (t)=> swipe ? this.setState({swipeIdx:t==='ingredients'?0:1}) : this.setState({segTab:t});
    const rec = this.curRec(), rname = st.currentRecipe;
    const heroId = 'photo-'+rec.slug+'-'+(swipe?'sw':'main');
    const tparts = rname.split(' ');
    const glyph = (kind) => {
      if (kind==='clock') return e('div',{style:{position:'relative',width:15,height:15,borderRadius:'50%',border:'1.6px solid '+C.sumi}},
        e('div',{style:{position:'absolute',left:'50%',top:'50%',width:1.6,height:4.5,background:C.sumi,borderRadius:2,transform:'translate(-50%,-100%)'}}),
        e('div',{style:{position:'absolute',left:'50%',top:'50%',width:4,height:1.6,background:C.sumi,borderRadius:2,transform:'translateY(-50%)'}}));
      if (kind==='people') return e('div',{style:{display:'flex',flexDirection:'column',alignItems:'center',gap:1.5}},
        e('div',{style:{width:6,height:6,borderRadius:'50%',background:C.sumi}}),
        e('div',{style:{width:11,height:6,borderRadius:'6px 6px 2px 2px',background:C.sumi}}));
      return e('div',{style:{width:11,height:13,background:C.sumi,borderRadius:'50% 50% 50% 50% / 62% 62% 42% 42%'}});
    };
    const metaRow = (kind,label) => e('div',{key:kind,style:{display:'flex',alignItems:'center',gap:11}},
      e('div',{style:{width:30,height:30,borderRadius:'50%',background:'rgba(251,248,242,.72)',display:'flex',alignItems:'center',justifyContent:'center',flex:'0 0 auto'}}, glyph(kind)),
      e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.06em',fontWeight:500,color:C.sumi}}, label.toUpperCase()));
    const header = e('div',{key:'h',style:{flex:'0 0 auto',background:C.peri,position:'relative'}},
      e('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 20px 0',position:'relative',zIndex:3}},
        e('div',{onClick:()=>this.setState({tab:this.state.prevTab||'home'}),style:{width:38,height:38,borderRadius:'50%',background:'rgba(251,248,242,.92)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color:C.sumi,boxShadow:'0 2px 8px rgba(40,30,22,.14)',cursor:'pointer'}},'‹'),
        e('div',{style:{width:38,height:38,borderRadius:'50%',background:C.yuhi,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'#fff',boxShadow:'0 4px 10px rgba(236,127,94,.4)'}},'♡')),
      e('div',{style:{position:'absolute',right:-16,top:58,width:170,height:170,borderRadius:'50%',background:'rgba(255,255,255,.42)',padding:6,boxShadow:'0 16px 32px rgba(40,30,22,.2)',zIndex:1}},
        e('image-slot',{key:heroId,id:heroId,shape:'circle',fit:'cover',placeholder:'photo',src:this.dishSrc(rname),style:{width:'100%',height:'100%',borderRadius:'50%',display:'block',overflow:'hidden'}})),
      e('div',{style:{padding:'16px 24px 30px',position:'relative',zIndex:2,maxWidth:214}},
        e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:'.14em',color:'#8C5B3F',fontWeight:500}},rec.cuisine.toUpperCase()),
        e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:30,color:C.sumi,marginTop:7,lineHeight:1.05}}, tparts.slice(0,-1).join(' ')+' ', e('span',{style:{fontWeight:600}}, tparts.slice(-1)[0])),
        e('div',{style:{display:'flex',flexDirection:'column',gap:11,marginTop:20}}, metaRow('clock',rec.time), metaRow('people','serves '+rec.base), metaRow('flame',rec.kcal+' kcal'))));
    const toggle = e('div',{key:'t',style:{flex:'0 0 auto',padding:'18px 24px 6px'}},
      e('div',{style:{display:'flex',background:'#EEEAE0',borderRadius:26,padding:4,position:'relative'}},
        ['ingredients','method'].map(t=>e('button',{key:(swipe?'sw-':'seg-')+t,onClick:()=>setTab(t),style:{flex:1,padding:'10px',borderRadius:22,border:'none',cursor:'pointer',background:active===t?'#4A3527':'transparent',color:active===t?C.kinari:'#6B5D50',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:14,fontWeight:600,textTransform:'capitalize',boxShadow:active===t?'0 4px 10px rgba(74,53,39,.24)':'none'}},t))));
    let body;
    if (swipe) {
      body = e('div',{key:'b',style:{flex:1,overflow:'hidden',position:'relative'}},
        e('div',{style:{display:'flex',width:'200%',height:'100%',transform:'translateX('+(st.swipeIdx===0?'0':'-50%')+')',transition:'transform .35s cubic-bezier(.4,0,.2,1)'}},
          e('div',{style:{width:'50%',overflowY:'auto'}}, this.ingredientsPanel()),
          e('div',{style:{width:'50%',overflowY:'auto'}}, this.methodPanel())),
        e('div',{style:{position:'absolute',bottom:10,left:0,right:0,display:'flex',justifyContent:'center',gap:7}},
          [0,1].map(i=>e('span',{key:'sw-dot-'+i,style:{width:i===st.swipeIdx?20:7,height:7,borderRadius:7,background:i===st.swipeIdx?'#4A3527':'rgba(56,44,36,.2)',transition:'all .25s'}}))));
    } else {
      body = e('div',{key:'b',style:{flex:1,overflowY:'auto'}}, active==='ingredients'?this.ingredientsPanel():this.methodPanel());
    }
    const glow = (!swipe && st.recipeGlow) ? e('div',{key:'glow',style:{position:'absolute',inset:0,borderRadius:44,border:'3px solid #8C5B3F',boxShadow:'0 0 0 5px rgba(140,91,63,.22)',pointerEvents:'none',zIndex:20}}) : null;
    const sheet = e('div',{key:'sheet',style:{flex:1,display:'flex',flexDirection:'column',background:C.paper,borderRadius:'26px 26px 0 0',marginTop:-22,position:'relative',zIndex:2,overflow:'hidden',boxShadow:'0 -6px 20px rgba(40,30,22,.07)'}}, toggle, body);
    return e('div',{key:swipe?'rsw':'rseg',style:{height:'100%',position:'relative',display:'flex',flexDirection:'column',background:C.peri}}, this.statusBar(false), header, sheet, glow, this.subSheet());
  }

  // ============ SUNDAY PREP ============
  renderPrep() {
    const C=this.C, st=this.state;
    const allSteps = this.prepSections.reduce((a,s)=>a+s.steps.length,0);
    const doneCount = Object.values(st.prepDone).filter(Boolean).length;
    const pct = Math.round(doneCount/allSteps*100);
    return e('div',{style:{height:'100%',minHeight:0,display:'flex',flexDirection:'column'}},
      this.statusBar(false),
      e('div',{key:'h',style:{flex:'0 0 auto',padding:'14px 24px 0'}},
        e('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}},
          e('div',null,
            e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:'.12em',color:C.mut}},'WED–FRI · REST-OF-WEEK PREP'),
            e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:29,color:C.sumi,marginTop:5}},'The prep ritual')),
          e('span',{style:{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:2,marginTop:4}},
            e('span',{style:{width:24,height:22,background:'#C8754E',borderRadius:'50% 50% 47% 53% / 55% 55% 46% 46%'}}),
            e('span',{style:{width:34,height:19,background:'#EFE6D2',boxShadow:'inset 0 0 0 1px rgba(56,44,36,.10)',borderRadius:'5px 5px 50% 50% / 5px 5px 96% 96%'}})))),
      e('div',{key:'pg',style:{flex:'0 0 auto',margin:'16px 24px 0',background:C.peri,borderRadius:18,padding:'16px 18px',color:C.sumi}},
        e('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline'}},
          e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13}},e('b',null,doneCount+' of '+allSteps),' steps done'),
          e('span',{style:{fontFamily:"'Newsreader',serif",fontSize:22}},pct+'%')),
        e('div',{style:{height:6,borderRadius:6,background:'rgba(56,44,36,.14)',marginTop:10,overflow:'hidden'}},
          e('div',{style:{width:pct+'%',height:'100%',background:'#4A3527',transition:'width .3s'}})),
        e('div',{style:{display:'flex',justifyContent:'space-between',marginTop:12}},
          this.timeline.map((tp,i)=>e('div',{key:i,style:{display:'flex',flexDirection:'column',alignItems:'center',gap:4}},
            e('span',{style:{width:6,height:6,borderRadius:'50%',background:i*allSteps/7<=doneCount?'#4A3527':'rgba(56,44,36,.22)'}}),
            e('span',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:'rgba(56,44,36,.5)'}},tp.t),
            e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:7.5,color:'rgba(56,44,36,.4)',maxWidth:42,textAlign:'center',lineHeight:1.15}},tp.l))))),
      e('div',{key:'sec',style:{flex:1,minHeight:0,overflowY:'auto',WebkitOverflowScrolling:'touch',overscrollBehavior:'contain',padding:'16px 24px 22px',display:'flex',flexDirection:'column',gap:10}},
        this.prepSections.map((sec,si)=>this.prepCard(sec,si)))); 
  }
  prepCard(sec,si) {
    const C=this.C, st=this.state, open=st.openSection===sec.id;
    const secDone = sec.steps.filter((_,i)=>st.prepDone[sec.id+'-'+i]).length;
    const complete = secDone===sec.steps.length;
    return e('div',{key:sec.id,style:{background:C.card,borderRadius:16,boxShadow:'0 1px 5px rgba(40,30,22,.06)',overflow:'hidden',border:open?'1.5px solid '+sec.color:'1.5px solid transparent'}},
      e('button',{onClick:()=>this.setState({openSection:open?null:sec.id}),style:{width:'100%',border:'none',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:13,padding:'14px 15px',textAlign:'left'}},
        e('span',{style:{width:34,height:34,borderRadius:10,flex:'0 0 auto',background:sec.color,opacity:complete?1:.92,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:14,fontWeight:600}},complete?'✓':si+1),
        e('span',{style:{flex:1}},
          e('span',{style:{display:'block',fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:15,color:C.sumi}},sec.title),
          e('span',{style:{display:'block',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12,color:C.mut,marginTop:1}},sec.time+' · '+secDone+'/'+sec.steps.length+' done')),
        e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:16,color:C.mut,transform:open?'rotate(90deg)':'none',transition:'transform .2s'}},'›')),
      open ? e('div',{style:{padding:'0 15px 14px'}}, sec.steps.map((stp,i)=>{
        const k=sec.id+'-'+i, dn=!!st.prepDone[k];
        return e('button',{key:i,onClick:()=>this.setState({prepDone:{...st.prepDone,[k]:!dn}}),style:{width:'100%',textAlign:'left',border:'none',background:'transparent',cursor:'pointer',display:'flex',gap:11,padding:'9px 0',alignItems:'flex-start'}},
          e('span',{style:{flex:'0 0 auto',width:20,height:20,marginTop:1,borderRadius:'50%',background:dn?sec.color:'transparent',boxShadow:dn?'none':'inset 0 0 0 1.5px rgba(56,44,36,.25)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11}},dn?'✓':''),
          e('span',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13.5,lineHeight:1.45,color:dn?C.mut:C.body,textDecoration:dn?'line-through':'none'}},stp));
      })) : null);
  }

  // ============ DISCOVER (browse by cuisine) ============
  renderDiscover() {
    const C=this.C, st=this.state;
    const rail=['Japanese','Korean','Thai','Prep'];
    const cuisineDishes={
      Japanese:['Miso Salmon Bowl','Salmon Sushi Bowl','Garlic Prawn Donburi'],
      Korean:['Tofu Bibimbap','Korean Beef Bibimbap'],
      Thai:['Pad Thai','Thai Basil Tofu','Beef Pad Krapow'],
      Prep:['Chicken & Egg Meal Prep'],
    };
    const cat = cuisineDishes[st.discoverCat] ? st.discoverCat : 'Japanese';
    const dishes = cuisineDishes[cat];
    const pick = dishes.indexOf(st.discoverPick)>=0 ? st.discoverPick : dishes[0];
    const r = this.recipes[pick] || this.recipes['Miso Salmon Bowl'];
    const tparts = pick.split(' ');
    const idx = Math.max(0, dishes.indexOf(pick));
    const goDisc = (dir)=>{ const ni=(idx+dir+dishes.length)%dishes.length; this.setState({discoverPick:dishes[ni], discoverDX:0}); };
    const dDown=(ev)=>{ this._ddx0=ev.clientX; this._ddxM=0; this.setState({discoverDragging:true}); };
    const dMove=(ev)=>{ if(this._ddx0==null) return; this._ddxM=ev.clientX-this._ddx0; this.setState({discoverDX:this._ddxM}); };
    const dUp=()=>{ if(this._ddx0==null) return; const m=this._ddxM||0; this._ddx0=null; this.setState({discoverDragging:false,discoverDX:0}); if(Math.abs(m)>48) goDisc(m<0?1:-1); };
    const iconBtn = (g) => e('div',{style:{width:34,height:34,borderRadius:'50%',background:'rgba(56,44,36,.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,color:C.sumi}},g);
    return e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}},
      this.statusBar(false),
      e('div',{key:'tb',style:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 22px 0',flex:'0 0 auto'}},
        e('div',{style:{display:'flex',alignItems:'center',gap:8}},
          e('span',{style:{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:2}},
            e('span',{style:{width:16,height:15,background:'#C8754E',borderRadius:'50% 50% 47% 53% / 55% 55% 46% 46%',display:'block'}}),
            e('span',{style:{width:23,height:13,background:'#EFE6D2',boxShadow:'inset 0 0 0 1px rgba(56,44,36,.10)',borderRadius:'3px 3px 50% 50% / 3px 3px 96% 96%',display:'block'}})),
          e('span',{style:{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:21,color:C.sumi}},'Sundō')),
        e('div',{style:{display:'flex',gap:9}}, iconBtn('⌕'), iconBtn('⊞'))),
      e('div',{key:'ti',style:{padding:'14px 24px 2px',flex:'0 0 auto'}},
        e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:'.14em',color:C.mut}},'BROWSE BY CUISINE'),
        e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:33,color:C.sumi,lineHeight:1,marginTop:4}},'Dis',e('span',{style:{fontWeight:600}},'cover'))),
      e('div',{key:'bd',style:{flex:1,display:'flex',overflow:'hidden'}},
        e('div',{style:{flex:'0 0 auto',width:30,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:26,paddingLeft:8}},
          rail.map(cu=>{const on=cu===cat; return e('button',{key:cu,onClick:()=>this.setState({discoverCat:cu,discoverPick:null}),style:{border:'none',background:'transparent',cursor:'pointer',padding:0,writingMode:'vertical-rl',transform:'rotate(180deg)',fontFamily:"'Hanken Grotesk',sans-serif",fontSize:13,fontWeight:on?700:500,letterSpacing:'.06em',color:on?C.sumi:C.mut,display:'flex',alignItems:'center',gap:8}}, cu, on?e('span',{style:{width:6,height:6,borderRadius:'50%',background:'#8C5B3F'}}):null);})),
        e('div',{style:{flex:1,overflowY:'auto',padding:'6px 22px 16px 4px'}},
          e('div',{onClick:()=>{ if(Math.abs(this._ddxM||0)>8) return; this.openRecipe(pick); },onPointerDown:dDown,onPointerMove:dMove,onPointerUp:dUp,onPointerLeave:dUp,style:{position:'relative',background:C.peri,borderRadius:22,padding:'20px 18px 20px',marginTop:26,cursor:'grab',boxShadow:'0 6px 18px rgba(40,30,22,.08)',transform:'translateX('+(st.discoverDX||0)+'px) rotate('+((st.discoverDX||0)*0.015)+'deg)',transition:st.discoverDragging?'none':'transform .3s cubic-bezier(.4,0,.2,1)',touchAction:'pan-y',userSelect:'none'}},
            e('div',{style:{position:'absolute',top:-12,left:16,width:40,height:40,borderRadius:'50%',background:C.yuhi,boxShadow:'0 6px 14px rgba(236,127,94,.4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:16,zIndex:3}},'♡'),
            e('div',{style:{position:'absolute',top:-26,right:-6,width:150,height:150,borderRadius:'50%',background:'rgba(255,255,255,.5)',padding:6,boxShadow:'0 14px 30px rgba(40,30,22,.2)',zIndex:2}},
              e('image-slot',{key:'disc-'+r.slug,id:'disc-'+r.slug,shape:'circle',fit:'cover',placeholder:'photo',src:'assets/dish-'+r.slug+'.png',style:{width:'100%',height:'100%',borderRadius:'50%',display:'block',overflow:'hidden'}})),
            e('div',{style:{height:112}}),
            e('div',{style:{display:'flex',alignItems:'center',gap:7,marginBottom:5}},
              e('span',{style:{width:6,height:6,borderRadius:'50%',background:'#8C5B3F'}}),
              e('span',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9.5,letterSpacing:'.12em',color:C.body}},cat.toUpperCase())),
            e('div',{style:{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:26,color:C.sumi,lineHeight:1.05,maxWidth:210}}, tparts.slice(0,-1).join(' ')+' ', e('span',{style:{fontWeight:600}},tparts.slice(-1)[0])),
            e('div',{style:{fontFamily:"'Hanken Grotesk',sans-serif",fontSize:12.5,color:C.body,lineHeight:1.5,marginTop:8,maxWidth:210}},'Serves '+r.base+' · '+r.protein+'g protein · ready in '+r.time+'.'),
            e('div',{style:{marginTop:15,display:'inline-flex',alignItems:'center',gap:7,padding:'10px 18px',borderRadius:22,background:C.sumi,color:C.kinari,fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:13}},'View recipe',e('span',null,'›'))),
          e('div',{key:'sdots',style:{marginTop:14,display:'flex',flexDirection:'column',alignItems:'center',gap:6}},
            e('div',{style:{display:'flex',gap:6}}, dishes.map((d,i)=>e('span',{key:i,style:{width:i===idx?18:6,height:6,borderRadius:6,background:i===idx?'#8C5B3F':'rgba(56,44,36,.2)',transition:'all .25s'}}))),
            e('div',{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:'.1em',color:'#9a8a76'}},'‹ SWIPE TO BROWSE ›')),
          e('div',{style:{display:'flex',gap:9,marginTop:14,flexWrap:'wrap'}},
            dishes.map(d=>{const on=d===pick; return e('button',{key:d,onClick:(ev)=>{ev.stopPropagation();this.setState({discoverPick:d});},style:{padding:'9px 15px',borderRadius:20,border:'none',cursor:'pointer',background:on?'#4A3527':C.card,color:on?C.kinari:C.sumi,boxShadow:on?'0 4px 10px rgba(74,53,39,.24)':'0 1px 4px rgba(40,30,22,.06)',fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:600,fontSize:12.5}}, d);}))
        )));
  }

  renderVals() {
    return {
      homeScreen: e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}}, this.renderHome()),
      weekRecap: this.renderWeekRecap(),
      weekPreview: this.renderWeekPreview(),
      grocerySub: this.renderGrocerySub(),
      groceryBody: this.renderGroceryBody(),
      onboardingScreen: this.renderOnboarding(),
      profileScreen: this.renderProfile(),
      mealsGlance: e('div',{style:{height:'100%',display:'flex',flexDirection:'column'}}, this.renderMeals()),
      discoverScreen: this.renderDiscover(),
      recipeSegmented: this.renderRecipe(false),
      recipeSwipe: this.renderRecipe(true),
      sundayPrep: this.renderPrep(),
    };
  }
}