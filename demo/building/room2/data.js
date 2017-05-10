var dataJson={	
	objects: [{
		type: 'floor',
		width: 1600,
		depth: 1300,
	},{
		type: 'floor_cut',
		width: 200,
		height: 20,
		depth: 260,
		translate: [-348,0,530],
		rotate: [Math.PI/180*3, 0, 0],
	},
	{
		type: 'wall',
		height: 200,		
		translate: [-500, 0, -500],
		data:[[0, 0], [1000, 0], [1000, 1000],  [0, 1000], [0,0]],
		children: [{
			type: 'window',
			translate: [200, 30, 500],
			width: 420,
			height: 150,
			depth: 50, 
		},{
			type: 'door',
			width: 205,
			height: 180,
			depth: 26,
			translate: [-350, 0, 500],
		}],
	},
	{
		type: 'racks',	
        width:60,
        height:200,
        depth:80,
        translates: [

			[-150-62-62, 0, 250],
			[-150-62, 0, 250],
			[-150, 0, 250],

			[150-62-62, 0, 250],
			[150-62, 0, 250],

			[150, 0, 250],
			[150+62, 0, 250],
			[150+62+62, 0, 250],
			[150+62+62+62, 0, 250],
			[150+62+62+62+62, 0, 250],

			[-370, 0, -250],
			[-370+62, 0, -250],
			[-370+62+62, 0, -250],
			[-370+62+62+62, 0, -250],

			[370-62-62-62, 0, -250],
			[370-62-62, 0, -250],
			[370-62, 0, -250],
			[370, 0, -250],



        ],
        labels: ["1A01","1A02","1A03","1A04","1A05","1A06","1A07","1A08","1A09","1A10"
        	,"1A11","1A12","1A13","1A14","1A15","1A16","1A17","1A18"],
		ids:["rack1","rack2","rack3","rack4","rack5","rack6","rack7","rack8","rack9","rack10",
			"rack11","rack12","rack13","rack14","rack15","rack16","rack17","rack18",],
        servers:{
			rack1:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:32,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:28,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:20,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:10,
				}
			],
			rack2:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:31,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:27,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:19,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack3:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:30,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:26,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:18,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:8,
				}
			],
			rack4:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:29,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:25,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:17,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:7,
				}
			],
			rack5:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:28,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:24,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:16,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:6,
				}
			],
			rack6:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:27,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:23,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:15,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:5,
				}
			],
			rack7:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:26,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:22,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:14,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:4,
				}
			],
			rack8:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:42,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:38,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:19,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack9:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:41,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:37,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:19,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack10:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:40,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:36,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:19,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack11:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:39,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:35,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:19,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack12:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:38,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:34,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:19,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack13:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:37,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:33,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:42,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack14:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:36,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:32,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:41,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack15:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:35,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:31,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:40,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack16:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:34,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:30,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:39,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack17:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:33,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:29,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:38,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			],
			rack18:[
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/1U 3550.png",
					u:1,
					position:32,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/2U 3650 .png",
					u:2,
					position:28,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/3U filler.png",
					u:3,
					position:37,
				},
				{
					type: 'server',
					id:"chassis123",
					img:"servers-img/4U filr icon.png",
					u:4,
					position:9,
				}
			]
        },
		chassises:{
			rack1:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:40,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},
						// {
						// 	type: 'server',
						// 	id:"card2",
						// 	img:"servers-img/1.FSM ITME.png",
						// 	u:1,
						// 	position:2,
						// },
						{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},
						// {
						// 	type: 'server',
						// 	id:"card9",
						// 	img:"servers-img/1.FSM ITME.png",
						// 	u:1,
						// 	position:9,
						// },
						// {
						// 	type: 'server',
						// 	id:"card10",
						// 	img:"servers-img/1.FSM ITME.png",
						// 	u:1,
						// 	position:10,
						// },
						{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},
						// {
						// 	type: 'server',
						// 	id:"card13",
						// 	img:"servers-img/1.FSM ITME.png",
						// 	u:1,
						// 	position:13,
						// },
						{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack2:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:41,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack3:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:40,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack4:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:39,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack5:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:38,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack6:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:37,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack7:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:36,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack8:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:35,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack9:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:34,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack10:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:33,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack11:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:32,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack12:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:32,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack13:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:30,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack14:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:29,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack15:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:28,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack16:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:27,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack17:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:26,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
			rack18:[
				{
					type: 'chassis',
					id:"chassis123",
					img:"servers-img/re_chassis.png",
					u:8,
					position:25,
					cards:[
						{
							type: 'server',
							id:"card1",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:1,
						},{
							type: 'server',
							id:"card2",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:2,
						},{
							type: 'server',
							id:"card3",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:3,
						},{
							type: 'server',
							id:"card4",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:4,
						},{
							type: 'server',
							id:"card5",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:5,
						},{
							type: 'server',
							id:"card6",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:6,
						},{
							type: 'server',
							id:"card7",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:7,
						},{
							type: 'server',
							id:"card8",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:8,
						},{
							type: 'server',
							id:"card9",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:9,
						},{
							type: 'server',
							id:"card10",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:10,
						},{
							type: 'server',
							id:"card11",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:11,
						},{
							type: 'server',
							id:"card12",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:12,
						},{
							type: 'server',
							id:"card13",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:13,
						},{
							type: 'server',
							id:"card14",
							img:"servers-img/1.FSM ITME.png",
							u:1,
							position:14,
						}
					]
				}

			],
		}
	},

	{
		type: 'rail',
		data:[ [-180, 250], [-400, 250], [-400, -250], [400, -250]],
	},
	{
		type: 'connection',
		color: '#ED5A00',
		y: 265,
		flow: 0.05,
		data:[
			[-180, -100, -250],
			[-180, -100, -150],
			[-180, -50, -150],
			[-180, -50, -250],
			[-180, 0, -250],
			[-400, 0, -250],
			[-400, 0, 250],
			[400, 0, 250],
			[400, -50, 250],
			[400, -50, 350],
			[400, -100, 350],
			[400, -100, 250],
		],
	},
	{
		type: 'connection',
		color: '#21CD43',
		y: 265,
		flow: -0.05,
		data:[
			[-180+3, -100, -250],
			[-180+3, -100, -150],
			[-180+3, -50, -150],
			[-180+3, -50, -250+3],
			[-180+3, 0, -250+3],
			[-400+3, 0, -250+3],
			[-400+3, 0, 250-3],
			[400+3, 0, 250-3],
			[400+3, -50, 250-3],
			[400+3, -50, 350],
			[400+3, -100, 350],
			[400+3, -100, 250],
		],
	},
	
	{
		type: 'extinguisher',
		translate: [-45, -470],
	},{
		type: 'extinguisher',
		translate: [-45, -450],		
		arrow: true,
	},{
		type: 'extinguisher',
		translate: [-45, -430],
	},{
		type: 'smoke',
		translate: [300, 180, 240],
		color: '#FAAC58',
	},{
		type: 'smoke',
		translate: [-300, 180, -240],
		color: '#B40431',
	},{
		type: 'water_cable',
		color: '#B45F04',
		y: 10,
		size: 3,
		data:[
			[50, 0, 50],
			[460, 0, 50],
			[460, 0, 450],
			[-460, 0, 450],
			[-460, 0, -450],
			[-100, 0, -450],
			[-50, 0, -400],
			[-50, 0, 0],
			[0, 0, 50],
			[50, 0, 50],
		],
		},{
		type: 'water_cable',
		color: '#04B431',
		y: 10,
		size: 3,
		data:[
			[-300, 0, 180],
			[440, 0, 180],
			[440, 0, 330],
			[-340, 0, 330],
			[-340, 0, -180],
			[-420, 0, -180],
			[-420, 0, -310],
			[-120, 0, -310],
			[-120, 0, -180],
			[-320, 0, -180],
		],
	},
	{
		type: 'laser',
		from: [-485, 330],
		to: [485, 330],
	},{
		type: 'laser',
		from: [-485, 0],
		to: [-20, 0],
	},{
		type: 'laser',
		from: [-80, 480],
		to: [-80, -480],
	}
	],
};