const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const redis = require('../cache/redisConnection')

router.get('/',async (req ,res)=>{
          try {
            const tasks = await redis.lrange('tasks' , 0 , -1);
            console.log(tasks)
            res.render('index', {tasks: tasks})
        } catch (error) {
            console.log(error.message) 
        }

    
     res.render('index' , {tasks: []});
})
router.post('/addTask' ,async (req, res)=>{
    const {task} = req.body ;

    try {
       const result = await redis.lpush('tasks', task);
        console.log(result)
        if (result) {
            res.redirect('back');
            console.log(result)
         }
    } catch (error) {
        console.log(error)
    }
})

router.post('/deleteTasks', async (req, res) => {
    try {
      const items = req.body.items; // Array of selected items
        console.log(`${items} sdddddddddd` )
      // Perform deletion logic for each item
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // Delete item from the list using Redis LREM command
        const result = await redis.lrem('tasks', 0, item);
        console.log(`Deleted ${result} occurrence(s) of ${item}`);
      }
  
      res.redirect('back');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('An error occurred');
    }
  });
module.exports = router