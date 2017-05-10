var demo = {
	LAZY_MIN: 1000,
	LAZY_MAX: 6000,
	CLEAR_COLOR: '#39609B',
	RES_PATH: 'res',

	lastElement: null,
	timer: null,

	getRes: function(file) {
		return demo.RES_PATH + '/' + file;
	},

	getEnvMap: function() {
		if (!demo.defaultEnvmap) {
			demo.defaultEnvmap = [];
			var image = demo.getRes('room.jpg');
			for (var i = 0; i < 6; i++) {
				demo.defaultEnvmap.push(image);
			}
		}
		return demo.defaultEnvmap;
	},

	//all registered object creaters.
	_creators: {},

	//all registered object filters.
	_filters: {},

	//all registered shadow painters.
	_shadowPainters: {},

	registerCreator: function(type, creator) {
		this._creators[type] = creator;
	},

	getCreator: function(type) {
		return this._creators[type];
	},

	registerFilter: function(type, filter) {
		this._filters[type] = filter;
	},

	getFilter: function(type) {
		return this._filters[type];
	},

	registerShadowPainter: function(type, painter) {
		this._shadowPainters[type] = painter;
	},

	getShadowPainter: function(type) {
		return this._shadowPainters[type];
	},

	initOverview: function(network) {
		var overView = new mono.Overview3D(network);
	},

	init: function(htmlElementId) {
		// Network3D是一个用于交互的视图组件，可以展示3D场景，
		// 并实现用户和3D场景之间的交互，比如旋转镜头，选中3D对象，通过鼠标或键盘移动3D对象等		
		// mono.Network3D ( dataBox  camera  canvas  parameters )
		var network = window.network = new mono.Network3D();
		// 速查器通过构造函数来绑定数据容器和需要进行索引的属性，一旦绑定之后，
		// 当数据容器中索引的属性值发生变化时，速查器中数据也会进行相应的修改
		demo.typeFinder = new mono.QuickFinder(network.getDataBox(), 'type', 'client');
		demo.labelFinder = new mono.QuickFinder(network.getDataBox(), 'label', 'client');
		// 透视镜头对象,视场角、近切面、远切面等是透视镜头的重要概念
		// 在nomo中，3D中的物体只有出现在fov、near、far组成的四棱锥空间内，才可能被镜头看到，否则看不见
		// mono.PerspectiveCamera ( 视场角，默认为50度,  横纵比;是镜头水平方向和竖直方向长度的比值，通常设为canvas的横纵比例，默认值为1;
		//   near  far ) 
		var camera = new mono.PerspectiveCamera(30, 1.5, 30, 50000);
		network.setCamera(camera);
		// 默认的交互模式，mono中提供的默认交互模式包括可以在3D场景中旋转镜头，通过鼠标滚轮缩放镜头，键盘操作镜头等。
		var interaction = new mono.DefaultInteraction(network);
		interaction.yLowerLimitAngle = Math.PI / 180 * 2;
		interaction.yUpLimitAngle = Math.PI / 2;
		interaction.maxDistance = 20000;
		interaction.minDistance = 50;
		interaction.zoomSpeed = 3;
		interaction.panSpeed = 0.2;
		// 编辑交互模式，在此模式下可以编辑3D对象，例如平移，缩放，旋转等
		var editInteraction = new mono.EditInteraction(network);
		editInteraction.setShowHelpers(true);
		editInteraction.setScaleable(false);
		editInteraction.setRotateable(false);
		editInteraction.setTranslateable(true);
		network.setInteractions([interaction, new mono.SelectionInteraction(network), editInteraction]);
		network.isSelectable = function(element) {
			return network.moveView && element.getClient('type') === 'rack';
		};
		network.editableFunction = function(element) {
			return network.moveView && element.getClient('type') === 'rack';
		}

		document.getElementById(htmlElementId).appendChild(network.getRootView());
		var tooltip = new Tooltip(['BusinessId'], ['000000']);
		document.body.appendChild(tooltip.getView());

		var personLoaded = false;

		var buttons = [{
			label: '场景复位',
			icon: 'reset.png',
			class: 'reset',
			clickFunction: function() {
				demo.resetView(network);
				var img = document.getElementById('toolbar').childNodes;
				for (var i = 0; i < img.length; i++) {
					img[0].setAttribute('class', 'reset');
					img[1].setAttribute('class', 'temp')
				}
				this.setAttribute('class', 'reset active');
			},
		}, {
			label: '温度图',
			icon: 'temperature.png',
			class: 'temp',
			clickFunction: function() {
				demo.resetView(network);
				var showing = network.temperatureView;
				var img = document.getElementById('toolbar').childNodes;
				for (var i = 0; i < img.length; i++) {
					img[0].setAttribute('class', 'reset');
					img[1].setAttribute('class', 'temp')
				}
				this.setAttribute('class', 'temp active');
			}
		}, {
			label: '温度图全景',
			icon: 'edit.png',
			class: 'allTemp',
			clickFunction: function() {
				demo.resetView(network);
				var showing = network.temperatureView;
				if (!showing) {
					demo.toggleTemperatureView(network);
				}
			}
		}];

		demo.setupToolbar(buttons);

		this.setupControlBar(network);

		mono.Utils.autoAdjustNetworkBounds(network, document.documentElement, 'clientWidth', 'clientHeight');
		network.getRootView().addEventListener('dblclick', function(e) {
			demo.handleDoubleClick(e, network);
		});
		network.getRootView().addEventListener('mousemove', function(e) {
			demo.handleMouseMove(e, network, tooltip);
		});

		demo.setupLights(network.getDataBox());
		network.getDataBox().getAlarmBox().addDataBoxChangeListener(function(e) {
			var alarm = e.data;
			if (e.kind === 'add') {
				var node = network.getDataBox().getDataById(alarm.getElementId());
				node.setStyle('m.alarmColor', null);
			}
		});

		network.getDataBox().addDataPropertyChangeListener(function(e) {
			var element = e.source,
				property = e.property,
				oldValue = e.oldValue,
				newValue = e.newValue;
			if (property == 'position' && network.moveView) {
				if (oldValue.y != newValue.y) {
					element.setPositionY(oldValue.y);
				}
			}

		});

		network.addInteractionListener(function(e) {
			if (e.kind == 'liveMoveEnd') {
				demo.dirtyShadowMap(network);
			}
		});

		var time1 = new Date().getTime();
		demo.loadData(network);
		var time2 = new Date().getTime();
		console.log('time:  ' + (time2 - time1));

		// demo.startSmokeAnimation(network);
		// demo.startFpsAnimation(network);
		demo.resetCamera(network);

		this.initOverview(network);
	},

	resetCamera: function(network) {
		network.getCamera().setPosition(2000, 1200, 3000);
		network.getCamera().lookAt(new mono.Vec3(0, 0, 0));
	},

	dirtyShadowMap: function(network) {
		var floor = network.getDataBox().shadowHost;
		var floorCombo = demo.typeFinder.findFirst('floorCombo');
		demo.updateShadowMap(floorCombo, floor, floor.getId(), network.getDataBox());
	},

	togglePersonVisible: function(visible, network) {
		var camera = network.getCamera();
		var databox = network.getDataBox();
		if (!visible) {
			this.loadObj(camera, databox);
		} else {
			this.removeObj(databox);
		}
	},

	removeObj: function(box) {
		var person = demo.typeFinder.find('person').get(0);
		person.animate.stop();
		box.removeByDescendant(person);

		var trail = demo.typeFinder.find('trail').get(0);
		box.removeByDescendant(trail);
	},

	_playRackDoorAnimate: function(label) {
		var element = demo.labelFinder.findFirst(label);
		var rackDoor = element.getChildren().get(0);
		if (rackDoor.getClient('animation')) {
			demo.playAnimation(rackDoor, rackDoor.getClient('animation'));
		}
	},

	loadObj: function(camera, box) {
		var obj = demo.getRes('worker.obj');
		var mtl = demo.getRes('worker.mtl');

		var loader = new mono.OBJMTLLoader();
		loader.load(obj, mtl, {
			'worker': demo.getRes('worker.png'),
		}, function(object) {
			object.setScale(3, 3, 3);
			object.setClient('type', 'person');
			box.addByDescendant(object);

			var updater = function(element) {
				if (element && element.getChildren()) {
					element.getChildren().forEach(function(child) {
						child.setStyle('m.normalType', mono.NormalTypeSmooth);
						updater(child);
					});
				}
			}
			updater(object);

			var x = -650,
				z = 600,
				angle = 0;
			object.setPosition(x, 0, z);
			object.setRotationY(angle);
			//var points=[[650, 600], [650, -300], [130, -300], [130, -600], [-650, -600], [-650, 580], [-450, 580], [-400, 550]];
			var points = [
				[-350, 600],
				[-350, 400],
				[450, 400],
				[450, 100],
				[-200, 100],
				[-200, -100],
				[-370, -100],
				[-370, -150]
			];

			var cameraFollow = new CameraFollow(camera);

			cameraFollow.setHost(object);

			var leftDoor = demo.typeFinder.findFirst('left-door');
			var rightDoor = demo.typeFinder.findFirst('right-door');
			demo.playAnimation(leftDoor, leftDoor.getClient('animation'));
			demo.playAnimation(rightDoor, rightDoor.getClient('animation'), function() {
				object.animate = demo.createPathAnimates(camera, object, points, false, null, function() {
					demo._playRackDoorAnimate('1A03')
				});
				object.animate.play();
			});

			var path = new mono.Path();
			path.moveTo(object.getPositionX(), object.getPositionZ());
			for (var i = 0; i < points.length; i++) {
				path.lineTo(points[i][0], points[i][1]);
			}
			path = mono.PathNode.prototype.adjustPath(path, 5);

			var trail = new mono.PathCube(path, 3, 1);
			trail.s({
				'm.type': 'phong',
				'm.specularStrength': 30,
				'm.color': '#298A08',
				'm.ambient': '#298A08',
				'm.texture.image': demo.getRes('flow.jpg'),
				'm.texture.repeat': new mono.Vec2(150, 1),
			});
			trail.setRotationX(Math.PI);
			trail.setPositionY(5);
			trail.setClient('type', 'trail');
			box.add(trail);
		});
	},

	createPathAnimates: function(camera, element, points, loop, finalAngle, done) {
		var animates = [];

		if (points && points.length > 0) {
			var x = element.getPositionX();
			var z = element.getPositionZ();
			var angle = element.getRotationY();

			var createRotateAnimate = function(camera, element, toAngle, angle) {
				if (toAngle != angle && toAngle != NaN) {
					if (toAngle - angle > Math.PI) {
						toAngle -= Math.PI * 2;
					}
					if (toAngle - angle < -Math.PI) {
						toAngle += Math.PI * 2;
					}
					//console.log(angle, toAngle);
					var rotateAnimate = new twaver.Animate({
						from: angle,
						to: toAngle,
						type: 'number',
						dur: Math.abs(toAngle - angle) * 300,
						easing: 'easeNone',
						onPlay: function() {
							element.animate = this;
						},
						onUpdate: function(value) {
							element.setRotationY(value);
						},

					});
					rotateAnimate.toAngle = toAngle;
					return rotateAnimate;
				}
			}

			for (var i = 0; i < points.length; i++) {
				var point = points[i];
				var x1 = point[0];
				var z1 = point[1];
				var rotate = Math.atan2(-(z1 - z), x1 - x);

				var rotateAnimate = createRotateAnimate(camera, element, rotate, angle);
				if (rotateAnimate) {
					animates.push(rotateAnimate);
					angle = rotateAnimate.toAngle;
				}

				var moveAnimate = new twaver.Animate({
					from: {
						x: x,
						y: z
					},
					to: {
						x: x1,
						y: z1
					},
					type: 'point',
					dur: Math.sqrt((x1 - x) * (x1 - x) + (z1 - z) * (z1 - z)) * 5,
					easing: 'easeNone',
					onPlay: function() {
						element.animate = this;
					},
					onUpdate: function(value) {
						element.setPositionX(value.x);
						element.setPositionZ(value.y);
					},
				});
				animates.push(moveAnimate);

				x = x1;
				z = z1;
			}

			if (finalAngle != undefined && angle != finalAngle) {
				var rotateAnimate = createRotateAnimate(camera, element, finalAngle, angle);
				if (rotateAnimate) {
					animates.push(rotateAnimate);
				}
			}
		}
		animates[animates.length - 1].onDone = done;
		var animate;
		for (var i = 0; i < animates.length; i++) {
			if (i > 0) {
				animates[i - 1].chain(animates[i]);
				if (loop && i == animates.length - 1) {
					animates[i].chain(animate);
				}
			} else {
				animate = animates[i];
			}
		}
		return animate;
	},

	toggleConnectionView: function(network) {
		network.connectionView = !network.connectionView;

		var connectionView = network.connectionView;
		var box = network.getDataBox();
		var connections = demo.typeFinder.find('connection');
		var rails = demo.typeFinder.find('rail');
		connections.forEach(function(connection) {
			connection.setVisible(connectionView);
			if (!connection.billboard) {
				connection.billboard = new mono.Billboard();
				connection.billboard.s({
					'm.texture.image': demo.createConnectionBillboardImage('0'),
					'm.vertical': true,
				});
				connection.billboard.setScale(60, 30, 1);
				connection.billboard.setPosition(400, 230, 330);
				box.add(connection.billboard);
			}
			connection.billboard.setVisible(connectionView);
			if (connection.isVisible()) {
				var offsetAnimate = new twaver.Animate({
					from: 0,
					to: 1,
					type: 'number',
					dur: 1000,
					repeat: Number.POSITIVE_INFINITY,
					reverse: false,
					onUpdate: function(value) {
						connection.s({
							'm.texture.offset': new mono.Vec2(value, 0),
						});
						if (value === 1) {
							var text = '54' + parseInt(Math.random() * 10) + '.' + parseInt(Math.random() * 100);
							connection.billboard.s({
								'm.texture.image': demo.createConnectionBillboardImage(text),
							});
						}
					},
				});
				offsetAnimate.play();
				connection.offsetAnimate = offsetAnimate;
			} else {
				if (connection.offsetAnimate) {
					connection.offsetAnimate.stop();
				}
			}
		});
		rails.forEach(function(rail) {
			rail.setVisible(connectionView);
		});
	},

	setupLights: function(box) {
		var pointLight = new mono.PointLight(0xFFFFFF, 0.3);
		pointLight.setPosition(0, 1000, -1000);
		box.add(pointLight);

		var pointLight = new mono.PointLight(0xFFFFFF, 0.3);
		pointLight.setPosition(0, 1000, 1000);
		box.add(pointLight);

		var pointLight = new mono.PointLight(0xFFFFFF, 0.3);
		pointLight.setPosition(1000, -1000, 1000);
		box.add(pointLight);

		box.add(new mono.AmbientLight('white'));
	},

	handleDoubleClick: function(e, network) {
		var camera = network.getCamera();
		var interaction = network.getDefaultInteraction();
		var firstClickObject = demo.findFirstObjectByMouse(network, e);
		if (firstClickObject) {
			var element = firstClickObject.element;
			var newTarget = firstClickObject.point;
			var oldTarget = camera.getTarget();
			if (element.getClient('animation')) {
				demo.playAnimation(element, element.getClient('animation'));
			} else if (element.getClient('dbl.func')) {
				var func = element.getClient('dbl.func');
				func();
			} else {
				demo.animateCamera(camera, interaction, oldTarget, newTarget);
			}
		} else {
			var oldTarget = camera.getTarget();
			var newTarget = new mono.Vec3(0, 0, 0);
			demo.animateCamera(camera, interaction, oldTarget, newTarget);
		}
	},

	//鼠标移动到网元上1S后显示tooltip
	handleMouseMove: function(e, network, tooltipObj) {
		var objects = network.getElementsByMouseEvent(e);
		//获取当前网元，如果当前鼠标下有对象并且类型为group，那么就设置currentElement为鼠标下的网元
		var currentElement = null;
		var tooltip = tooltipObj.getView();
		// var tooltip = document.getElementById('tooltip');
		if (objects.length) {
			var first = objects[0];
			var object3d = first.element;
			if (object3d.getClient('type') === 'card' && object3d.getClient('isAlarm')) {
				currentElement = object3d;
				tooltipObj.setValues([object3d.getClient('BID')]);
			}
		}
		//如果当前和上一次的网元不一致，先清除timer。
		//如果当前网元有值，起一个timer，2S后显示tooltip。
		//tooltip显示的位置为最近一次鼠标移动时的位置
		if (demo.lastElement != currentElement) {
			clearTimeout(demo.timer);
			if (currentElement) {
				demo.timer = setTimeout(function() {
					tooltip.style.display = 'block';
					tooltip.style.position = 'absolute';
					tooltip.style.left = (window.lastEvent.pageX - tooltip.clientWidth / 2) + 'px';
					tooltip.style.top = (window.lastEvent.pageY - tooltip.clientHeight - 15) + 'px';
				}, 1000);
			}
		}
		//设置上一次的网元为当前网元
		demo.lastElement = currentElement;
		//如果当前鼠标下没有网元，隐藏tooltip
		if (currentElement == null) {
			tooltip.style.display = 'none';
		}
		//设置每次移动时鼠标的事件对象
		window.lastEvent = e;
	},

	copyProperties: function(from, to, ignores) {
		if (from && to) {
			for (var name in from) {
				if (ignores && ignores.indexOf(name) >= 0) {
					//ignore.
				} else {
					to[name] = from[name];
				}
			}
		}
	},

	createCubeObject: function(json) {
		var translate = json.translate || [0, 0, 0];
		var width = json.width;
		var height = json.height;
		var depth = json.depth;
		var sideColor = json.sideColor;
		var topColor = json.topColor;

		var object3d = new mono.Cube(width, height, depth);
		object3d.setPosition(translate[0], translate[1] + height / 2, translate[2]);
		object3d.s({
			'm.color': sideColor,
			'm.ambient': sideColor,
			'left.m.lightmap.image': demo.getRes('inside_lightmap.jpg'),
			'right.m.lightmap.image': demo.getRes('outside_lightmap.jpg'),
			'front.m.lightmap.image': demo.getRes('outside_lightmap.jpg'),
			'back.m.lightmap.image': demo.getRes('inside_lightmap.jpg'),
			'top.m.color': topColor,
			'top.m.ambient': topColor,
			'bottom.m.color': topColor,
			'bottom.m.ambient': topColor,
		});
		object3d.setClient('type', 'rack');
		return object3d;
	},

	create2DPath: function(pathData) {
		var path;
		for (var j = 0; j < pathData.length; j++) {
			var point = pathData[j];
			if (path) {
				path.lineTo(point[0], point[1], 0);
			} else {
				path = new mono.Path();
				path.moveTo(point[0], point[1], 0);
			}
		}

		return path;
	},

	create3DPath: function(pathData) {
		var path;
		for (var j = 0; j < pathData.length; j++) {
			var point = pathData[j];
			if (path) {
				path.lineTo(point[0], point[1], point[2]);
			} else {
				path = new mono.Path();
				path.moveTo(point[0], point[1], point[2]);
			}
		}

		return path;
	},

	createPathObject: function(json) {
		var translate = json.translate || [0, 0, 0];
		var pathWidth = json.width;
		var pathHeight = json.height;
		var pathData = json.data;
		var path = this.create2DPath(pathData);
		var pathInsideColor = json.insideColor;
		var pathOutsideColor = json.outsideColor;
		var pathTopColor = json.topColor;

		var object3d = this.createWall(path, pathWidth, pathHeight, pathInsideColor, pathOutsideColor, pathTopColor);
		object3d.setPosition(translate[0], translate[1], -translate[2]);
		object3d.shadow = json.shadow;

		return object3d;
	},

	filterJson: function(box, objects) {
		var newObjects = [];

		for (var i = 0; i < objects.length; i++) {
			var object = objects[i];
			var type = object.type;
			var filter = this.getFilter(type);
			if (filter) {
				var filteredObject = filter(box, object);
				if (filteredObject) {
					if (filteredObject instanceof Array) {
						newObjects = newObjects.concat(filteredObject);
					} else {
						this.copyProperties(object, filteredObject, ['type']);
						newObjects.push(filteredObject);
					}
				}
			} else {
				newObjects.push(object);
			}
		}

		return newObjects;
	},

	createCombo: function(parts) {
		var children = [];
		var ops = [];
		var ids = [];
		for (var i = 0; i < parts.length; i++) {
			var object = parts[i];
			var op = object.op || '+';
			var style = object.style;
			var translate = object.translate || [0, 0, 0];
			var rotate = object.rotate || [0, 0, 0];
			var object3d = null;
			if (object.type === 'path') {
				object3d = this.createPathObject(object);
			}
			if (object.type === 'cube') {
				object3d = this.createCubeObject(object);
			}
			if (object3d) {
				object3d.setRotation(rotate[0], rotate[1], rotate[2]);
				if (style) {
					object3d.s(style);
				}
				children.push(object3d);
				if (children.length > 1) {
					ops.push(op);
				}
				ids.push(object3d.getId());
			}
		}

		if (children.length > 0) {
			var combo = new mono.ComboNode(children, ops);
			combo.setNames(ids);
			return combo;
		}
		return null;
	},

	loadData: function(network) {
		var json = demo.filterJson(network.getDataBox(), dataJson.objects);
		var box = network.getDataBox();

		network.setClearColor(demo.CLEAR_COLOR);

		var children = [];
		var ops = [];
		var ids = [];
		var shadowHost;
		var shadowHostId;
		for (var i = 0; i < json.length; i++) {
			var object = json[i];
			var op = object.op;
			var style = object.style;
			var client = object.client;
			var translate = object.translate || [0, 0, 0];
			var rotate = object.rotate || [0, 0, 0];
			var object3d = null;

			if (object.type === 'path') {
				object3d = this.createPathObject(object);
			}
			if (object.type === 'cube') {
				object3d = this.createCubeObject(object);
			}

			if (object.shadowHost) {
				shadowHost = object3d;
				shadowHostId = object3d.getId();
				box.shadowHost = shadowHost;
			}

			var creator = demo.getCreator(object.type);
			if (creator) {
				creator(box, object);
				continue;
			}

			if (object3d) {
				object3d.shadow = object.shadow;
				object3d.setRotation(rotate[0], rotate[1], rotate[2]);
				if (style) {
					object3d.s(style);
				}
				if (client) {
					for (var key in client) {
						object3d.setClient(key, client[key]);
					}
				}
				if (op) {
					children.push(object3d);
					if (children.length > 1) {
						ops.push(op);
					}
					ids.push(object3d.getId());
				} else {
					box.add(object3d);
				}
			}
		}

		if (children.length > 0) {
			var combo = new mono.ComboNode(children, ops);
			combo.setNames(ids);
			combo.setClient('type', 'floorCombo');
			box.add(combo);

			//lazy load floor shadow map.
			if (shadowHost && shadowHostId) {
				setTimeout(function() {
					demo.updateShadowMap(combo, shadowHost, shadowHostId, box)
				}, demo.LAZY_MAX);
			}
		}
	},

	updateShadowMap: function(combo, shadowHost, shadowHostId, box) {
		var shadowMapImage = demo.createShadowImage(box, shadowHost.getWidth(), shadowHost.getDepth());
		var floorTopFaceId = shadowHostId + '-top.m.lightmap.image';
		combo.setStyle(floorTopFaceId, shadowMapImage);
	},
	// demo.loadRackContent(box, x, y, z, width, height, depth,cube, cut, json, newRack, rack);
	loadRackContent: function(box, x, y, z, width, height, depth, cube, cut, json, parent, oldRack) {
		var servers = json.servers;
		var chassis = json.chassises
		var Acolor = ['#18ff00', '#fff600', '#0012ff', '#ff00d2', '#00f0ff', '#fff000', '#4b83b3', '#6bb34b', '#b3a34b', '#b36d4b', '#b34b9c', '#ff0000'];
		var Tempcolor = Acolor[parseInt(Math.random() * 10)];
		var id = oldRack.getClient('rackid');
		for (var jsonkey in servers) {
			if (id == jsonkey && servers[jsonkey].length > 0) {
				create(servers[jsonkey]);
			}
		}
		for (var jsonkey in chassis) {
			if (id == jsonkey && chassis[jsonkey].length > 0) {
				create(chassis[jsonkey]);
			}
		}

		function create(obj) {
			for (var i = 0; i < obj.length; i++) {
				var temp_Y = obj[i].position;
				var temp_H = obj[i].u;
				var server_type = obj[i].type;
				var id = obj[i].id;
				var server_img = obj[i].img || null;
				var card_json = obj[i];

				var idtext = "serverid";
				if (obj[i].type == "chassis") {
					idtext = "chassisid";
				}

				var number = temp_H;
				var pic = 'server' + number + '.jpg';
				var color = null;
				var server = demo.createServer(box, cube, cut, pic, color, oldRack, Tempcolor, server_img, server_type, card_json,id);

				server.setClient(idtext, id);

				var size = server.getBoundingBox().size();
				server.setPositionY(demo.setServerP(temp_Y, temp_H))
				server.setPositionZ(server.getPositionZ() + 4.5);
				server.setParent(parent);
			}
		}
	},
	// 创建机柜横向节点
	createServer: function(box, cube, cut, pic, color, oldRack, Tempcolor, server_img, server_type, card_json,id) {
		var nodes_id=id;
        var XHR=null;
        if (window.XMLHttpRequest) {
            XHR = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            XHR = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            XHR = null;
        }
        if(XHR){
            XHR.open("GET", url);
            XHR.onreadystatechange = function () {
                // readyState值说明
                // 0,初始化,XHR对象已经创建,还未执行open
                // 1,载入,已经调用open方法,但是还没发送请求
                // 2,载入完成,请求已经发送完成
                // 3,交互,可以接收到部分数据

                // status值说明
                // 200:成功
                // 404:没有发现文件、查询或URl
                // 500:服务器产生内部错误
                if (XHR.readyState == 4 && XHR.status == 200) {
                    // 这里可以对返回的内容做处理
                    // 一般会返回JSON或XML数据格式
                    console.log(XHR.responseText);
                    // 主动释放,JS本身也会回收的
                    XHR = null;
                }
            };
            XHR.send();
        }
		var picMap = {
			'server1.jpg': 4.45 * 1,
			'server2.jpg': 4.45 * 2,
			'server3.jpg': 4.45 * 3,
			'server4.jpg': 4.45 * 4,
			'server5.jpg': 4.45 * 5,
			'server6.jpg': 4.45 * 6,
			'server7.jpg': 4.45 * 7,
			'server8.jpg': 4.45 * 8,
			'server9.jpg': 4.45 * 9,
			'server10.jpg': 4.45 * 10,
		}
		var x = cube.getPositionX();
		var z = cube.getPositionZ();
		var width = cut.getWidth() - 2.5;
		var height = picMap[pic];
		var depth = cut.getDepth();

		var serverBody = new mono.Cube(width - 2, height - 2, depth - 4);
		var bodyColor = color ? color : '#5B6976';
		serverBody.s({
			'm.color': bodyColor,
			'm.ambient': bodyColor,
			'm.type': 'phong',
			'm.texture.image': demo.getRes('rack_inside.jpg'),
		});
		serverBody.setPosition(-0.5, 0.5, (cube.getDepth() - serverBody.getDepth()) / 2);

		var serverPanel = new mono.Cube(width + 2, height, 0.5);
		if (!!document.getElementsByClassName('temp')[0] && document.getElementsByClassName('temp')[0].getAttribute("class") == 'temp active') {
			color = Tempcolor;
			serverPanel.s({
				'm.texture.image': demo.getRes('rack_inside.jpg'),
				'front.m.texture.color': color,
				'front.m.texture.repeat': new mono.Vec2(1, 1),
				'm.specularStrength': 100,
				'm.transparent': false,
				'm.color': color,
				'm.ambient': color,
			});
		} else {
			color = color ? color : '#FFFFFF';
			serverPanel.s({
				'm.texture.image': demo.getRes('rack_inside.jpg'),
				'front.m.texture.image': demo.RES_PATH + '/' + (server_img || pic),
				'front.m.texture.repeat': new mono.Vec2(1, 1),
				'm.specularStrength': 100,
				'm.transparent': true,
				'm.color': color,
				'm.ambient': color,
			});
		};
		serverPanel.setPosition(-0.5, 0, serverBody.getDepth() / 2 + (cube.getDepth() - serverBody.getDepth()) / 2);
		if (server_type == 'chassis') {
			var serverColor = null;
			if (!!document.getElementsByClassName('temp')[0] && document.getElementsByClassName('temp')[0].getAttribute("class") == 'temp active') {
				serverPanel.s({
					'm.color': serverColor,
					'm.ambient': serverColor,
					'm.transparent': true,
					'm.texture.image': demo.getRes('servers-img/re_chassis.png'),
				});
			} else {
				serverPanel.s({
					'm.color': serverColor,
					'm.ambient': serverColor,
					'm.transparent': true,
					'm.texture.image': demo.getRes('servers-img/re_chassis.png'),
				});
			}
		}

		// ComboNode  组合体 —— 由运算体封装而来的组合体，使用起来更加方便，只需传入运算符即可完成复杂的运算
		var server = new mono.ComboNode([serverBody, serverPanel], ['+']);
		//server.setRotation(0, Math.PI/180 * 90, 0);
		server.setClient('animation', 'pullOut.z');
		server.setClient('type', 'drawer');
		server.setClient('dbl.func', demo.showCardTable);
		server.setPosition(0.5, 0, -5);
		box.add(server);

		if (server_type == 'chassis') {
			var cards = card_json.cards;
			var xoffset = 2.1008,
				yoffset = 0.9897;
			var width = width + 2;
			var height = height + 1;
			var cardWidth = (width - xoffset * 2) / 2;
			var count = cards.length;

			var cha_colors = ['#18ff00', '#fff600', '#0012ff', '#ff00d2', '#00f0ff', '#fff000', '#4b83b3', '#6bb34b', '#b3a34b', '#b36d4b', '#b34b9c', '#ff0000'];

			for (var i = 0; i < count; i++) {
				var cha_color = cha_colors[parseInt(Math.random() * 10)];
				var position = cards[i].position;
				var params = {
					'height': ((height - yoffset * 2) / 7) - 1.35,
					'width': cardWidth - 0.5,
					'depth': depth * 0.9,
					'pic': demo.RES_PATH + '/' + (cards[i].img || 'servers-img/1.FSM ITME.png'),
					'cha_color': cha_color
				};
				var card = demo.createCard(params);
				box.add(card);
				var cardX = -11.7
				if (position % 2 == 0) {
					position = position / 2;
					cardX = 10.8;
				} else {
					position = (position + 1) / 2
				}
				var cardY = -16.2 + (3.5958 * (position - 1)) + position;
				card.setParent(server);
				card.setClient('cardid', cards[i].id);
				card.setClient('type', 'card');
				card.setClient('dbl.func', demo.showCardTable);
				card.setClient('BID', 'card-' + i);
				card.p(cardX, cardY, serverPanel.getPositionZ() - 1);
				card.setClient('animation', 'pullOut.z');
			}
		}
		return server;
	},

	createCard: function(json) {
		var translate = json.translate || [0, 0, 0];
		var x = translate[0],
			y = translate[1],
			z = translate[2];
		var width = json.width || 10,
			height = json.height || 50,
			depth = json.depth || 50;
		var rotate = json.rotate || [0, 0, 0];
		var color = json.cha_color || 'white';
		var pic = json.pic || demo.getRes('card1.png');
		if (!!document.getElementsByClassName('temp')[0] && document.getElementsByClassName('temp')[0].getAttribute("class") == 'temp active') {
			var style = {
				'm.color': color,
				'm.ambient': color,
				'm.texture.image': demo.getRes('gray.png'),
				'front.m.texture.color': color,
				'back.m.texture.image': pic,
			}
		} else {
			var style = {
				'm.color': null,
				'm.ambient': null,
				'm.texture.image': demo.getRes('gray.png'),
				'front.m.texture.image': pic,
				'back.m.texture.image': pic,
			}
		}

		var parts = [{
			//card panel
			type: 'cube',
			width: width,
			height: height,
			depth: 1,
			translate: [x, y, z + 1],
			rotate: rotate,
			op: '+',
			style: style
		}, {
			//card body
			type: 'cube',
			width: width * 0.95,
			height: 1,
			depth: depth,
			translate: [x, y + 1.5, z - depth / 2 + 1],
			rotate: rotate,
			op: '+',
			style: {
				'm.color': 'gray',
				'm.ambient': 'gray',
				'm.texture.image': demo.getRes('gray.png'),
				'top.m.texture.image': demo.getRes('card_body.png'),
				'bottom.m.texture.image': demo.getRes('card_body.png'),
				'left.m.texture.flipX': true,
				'm.lightmap.image': demo.getRes('outside_lightmap.jpg'),
			}
		}];

		return demo.createCombo(parts);
	},

	setServerP: function(temp_Y, temp_H) {
		var number, temp;
		switch (temp_H) {
			case 1:
				temp = 0;
				break
			case 2:
				temp = 0.55;
				break
			case 3:
				temp = 1.1;
				break
			case 4:
				temp = 1.65;
				break
			case 5:
				temp = 2;
				break
			case 6:
				temp = 2.55;
				break
			case 7:
				temp = 3.1;
				break
			case 8:
				temp = 3.55;
				break
			case 9:
				temp = 4.1;
				break
			case 10:
				temp = 4.6;
				break
		}
		return number = -94.5 + (4.6 * ((temp_Y - temp_H) + temp))
	},

	createShadowImage: function(box, floorWidth, floorHeight) {
		var canvas = document.createElement('canvas');
		canvas['width'] = floorWidth;
		canvas['height'] = floorHeight;
		var context = canvas.getContext('2d');
		context.beginPath();
		context.rect(0, 0, floorWidth, floorHeight);
		context.fillStyle = 'white';
		context.fill();

		var marker = function(context, text, text2, x, y) {
				var color = '#0B2F3A'; //'#0B2F3A';//'#FE642E';
				context.font = 60 + 'px "Microsoft Yahei" ';
				context.fillStyle = color;
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				//context.shadowBlur = 30;
				context.fillText(text, x, y);
				context.strokeStyle = color;
				context.lineWidth = 3;
				context.strokeText(text, x, y);

				if (!text2) return;
				y += 52;
				color = '#FE642E';
				context.font = 26 + 'px "Microsoft Yahei" ';
				context.fillStyle = color;
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillText(text2, x, y);
			}
			// marker(context, '阿里巴巴', '192.168.1.100', 530, 500);
			// marker(context, '乐视', '192.168.1.150', 590, 1000);
			// marker(context, '亚马逊', 'ip待分配', 1020, 1000);

		box.forEach(function(object) {
			if (object instanceof mono.Entity && object.shadow) {
				var translate = object.getPosition() || {
					x: 0,
					y: 0,
					z: 0
				};
				var rotate = object.getRotation() || {
					x: 0,
					y: 0,
					z: 0
				};
				var rotate = -rotate[1];

				demo.paintShadow(object, context, floorWidth, floorHeight, translate, rotate);
			}
		});

		return canvas;
	},

	paintShadow: function(object, context, floorWidth, floorHeight, translate, rotate) {
		var type = object.getClient('type');
		var shadowPainter = demo.getShadowPainter(type);

		if (shadowPainter) {
			shadowPainter(object, context, floorWidth, floorHeight, translate, rotate);
		}
	},

	findFirstObjectByMouse: function(network, e) {
		var objects = network.getElementsByMouseEvent(e);
		if (objects.length) {
			for (var i = 0; i < objects.length; i++) {
				var first = objects[i];
				var object3d = first.element;
				if (!(object3d instanceof mono.Billboard)) {
					return first;
				}
			}
		}
		return null;
	},

	animateCamera: function(camera, interaction, oldPoint, newPoint, onDone) {
		//twaver.Util.stopAllAnimates(true);

		var offset = camera.getPosition().sub(camera.getTarget());
		var animation = new twaver.Animate({
			from: 0,
			to: 1,
			dur: 500,
			easing: 'easeBoth',
			onUpdate: function(value) {
				var x = oldPoint.x + (newPoint.x - oldPoint.x) * value;
				var y = oldPoint.y + (newPoint.y - oldPoint.y) * value;
				var z = oldPoint.z + (newPoint.z - oldPoint.z) * value;
				var target = new mono.Vec3(x, y, z);
				camera.lookAt(target);
				interaction.target = target;
				var position = new mono.Vec3().addVectors(offset, target);
				camera.setPosition(position);
			},
		});
		animation.onDone = onDone;
		animation.play();
	},

	playAnimation: function(element, animation, done) {
		var params = animation.split('.');
		if (params[0] === 'pullOut') {
			var direction = params[1];
			demo.animatePullOut(element, direction, done);
		}
		if (params[0] === 'rotate') {
			var anchor = params[1];
			var angle = params[2];
			var easing = params[3];
			demo.animateRotate(element, anchor, angle, easing, done);
		}
	},

	animatePullOut: function(object, direction, done) {
		//twaver.Util.stopAllAnimates(true);

		var size = object.getBoundingBox().size().multiply(object.getScale());

		var movement = 0.8;

		var directionVec = new mono.Vec3(0, 0, 1);
		var distance = 0;
		if (direction === 'x') {
			directionVec = new mono.Vec3(1, 0, 0);
			distance = size.x;
		}
		if (direction === '-x') {
			directionVec = new mono.Vec3(-1, 0, 0);
			distance = size.x;
		}
		if (direction === 'y') {
			directionVec = new mono.Vec3(0, 1, 0);
			distance = size.y;
		}
		if (direction === '-y') {
			directionVec = new mono.Vec3(0, -1, 0);
			distance = size.y;
		}
		if (direction === 'z') {
			directionVec = new mono.Vec3(0, 0, 1);
			distance = size.z;
		}
		if (direction === '-z') {
			directionVec = new mono.Vec3(0, 0, -1);
			distance = size.z;
		}

		distance = distance * movement;
		if (object.getClient('animated')) {
			directionVec = directionVec.negate();
		}

		var fromPosition = object.getPosition().clone();
		object.setClient('animated', !object.getClient('animated'));

		new twaver.Animate({
			from: 0,
			to: 1,
			dur: 2000,
			easing: 'bounceOut',
			onUpdate: function(value) {
				//don't forget to clone new instance before use them!
				object.setPosition(fromPosition.clone().add(directionVec.clone().multiplyScalar(distance * value)));
			},
			onDone: function() {
				demo.animationFinished(object);

				if (done) {
					done();
				}
			},
		}).play();
	},

	animateRotate: function(object, anchor, angle, easing, done) {
		//twaver.Util.stopAllAnimates(true);
		easing = easing || 'easeInStrong';

		var size = object.getBoundingBox().size().multiply(object.getScale());

		var from = 0;
		var to = 1;
		if (object.getClient('animated')) {
			to = -1;
		}
		object.setClient('animated', !object.getClient('animated'));

		var position;
		var axis;
		if (anchor === 'left') {
			position = new mono.Vec3(-size.x / 2, 0, 0);
			var axis = new mono.Vec3(0, 1, 0);
		}
		if (anchor === 'right') {
			position = new mono.Vec3(size.x / 2, 0, 0);
			var axis = new mono.Vec3(0, 1, 0);
		}

		var animation = new twaver.Animate({
			from: from,
			to: to,
			dur: 1500,
			easing: easing,
			onUpdate: function(value) {
				if (this.lastValue === undefined) {
					this.lastValue = 0;
				}
				object.rotateFromAxis(axis.clone(), position.clone(), Math.PI / 180 * angle * (value - this.lastValue));
				this.lastValue = value;
			},
			onDone: function() {
				delete this.lastValue;
				demo.animationFinished(object);

				if (done) {
					done();
				}
			},
		});
		animation.play();
	},

	animationFinished: function(element) {
		var animationDoneFuc = element.getClient('animation.done.func');
		if (animationDoneFuc) {
			animationDoneFuc();
		}
	},

	getRandomInt: function(max) {
		return parseInt(Math.random() * max);
	},

	getRandomLazyTime: function() {
		var time = demo.LAZY_MAX - demo.LAZY_MIN;
		return demo.getRandomInt(time) + demo.LAZY_MIN;
	},
	// rack顶部canvas画字
	generateAssetImage: function(text, pos) {
		var width = 512,
			height = 256;

		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		var ctx = canvas.getContext('2d');
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, width, height);

		ctx.font = 150 + 'px "Microsoft Yahei" ';
		ctx.fillStyle = 'black';
		ctx.textAlign = pos;
		ctx.textBaseline = 'middle';
		ctx.fillText(text, width / 2, height / 2);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 15;
		ctx.strokeText(text, width / 2, height / 2);

		return canvas;
	},
	createColor: function(stmp, num_min, num) {
		if (num < stmp + num_min) {
			return "#F6EFA6";
		}
		if (num >= stmp + num_min && num < stmp * 2 + num_min) {
			return "#EFD79B";
		}
		if (num >= stmp * 2 + num_min && num < stmp * 3 + num_min) {
			return "#E9BF8F";
		}
		if (num >= stmp * 3 + num_min && num < stmp * 4 + num_min) {
			return "#E2A684";
		}
		if (num >= stmp * 4 + num_min && num < stmp * 5 + num_min) {
			return "#DB8E79";
		}
		if (num >= stmp * 5 + num_min && num < stmp * 6 + num_min) {
			return "#D57B6F";
		}
		if (num >= stmp * 6 + num_min && num < stmp * 7 + num_min) {
			return "#D06D66";
		}
		if (num >= stmp * 7 + num_min && num < stmp * 8 + num_min) {
			return "#CA605D";
		}
		if (num >= stmp * 8 + num_min && num < stmp * 9 + num_min) {
			return "#C55255";
		}
		if (num >= stmp * 9 + num_min) {
			return "#BF444C";
		}
	},

	toggleTemperatureView: function(network) {
		// 默认png图片从上往下
		function draw(obj) {
			var ctx = document.getElementById('canvas').getContext('2d');
			var single = 200 / 42;
			for (var i = 0; i < 42; i++) {
				ctx.fillStyle = obj[i][1];
				ctx.fillRect(0, i * single, 1, 200);
			}
		};

		function base64Img2Blob(code) {
			var parts = code.split(';base64,');
			var contentType = parts[0].split(':')[1];
			// console.log(parts + " \n " + parts[0] + "\n " + parts[1])
			// 解码 window.atob
			var raw = window.atob(parts[1]);
			var rawLength = raw.length;

			var uInt8Array = new Uint8Array(rawLength);

			for (var i = 0; i < rawLength; ++i) {
				uInt8Array[i] = raw.charCodeAt(i);
			}

			return new Blob([uInt8Array], {
				type: contentType
			});
		}

		function createRackImage(fileName, content) {

			var aLink = document.createElement('img');
			var blob = base64Img2Blob(content);
			aLink.src = URL.createObjectURL(blob);
			return aLink.src;
		}

		function getImage(filename, obj) {
			draw(obj)
			return createRackImage(filename + '.png', canvas.toDataURL("image/png"));
		}



		network.temperatureView = !network.temperatureView;

		network.getDataBox().forEach(function(element) {
			var type = element.getClient('type');

			if (type === 'rack' || type === 'rack.door') {
				element.setVisible(!network.temperatureView);
				if (type === 'rack') {
					var rackid = element.getClient('rackid');
					if (!element.temperatureFake1 && !element.temperatureFake2) {
						var server = element.getClient('server');
						var chassis = element.getClient('chassis');
						// 高度随机分成arrTemp.length层,从上往下填充色带
						// 拿到所有temp的值
						// var tempValue = [];
						// for (var j = 0; j < server.length; j++) {
						// 	tempValue.push(server[j].temp);
						// }
						// for (var j = 0; j < chassis.length; j++) {
						// 	var cards = chassis[j].cards;
						// 	for (var k = 0; k < cards.length; k++) {
						// 		tempValue.push(cards[k].temp);
						// 	}
						// }
						// var num_min = Math.min.apply(null, tempValue);
						// var num_max = Math.max.apply(null, tempValue);
						// var num;
						// num = (num_max - num_min) / 10;
						// 假数据
						var num_min = 0;
						var num_max = 120;
						var num;
						num = (num_max - num_min) / 10;
						// console.log(JSON.stringify(tempValue))
						// var Acolor = ['#18ff00', '#fff600', '#0012ff', '#ff00d2', '#00f0ff', '#fff000', '#4b83b3', '#6bb34b', '#b3a34b', '#b36d4b', '#b34b9c', '#ff0000'];

						var fake1 = new mono.Cube(element.getWidth() / 2, element.getHeight(), element.getDepth());

						element.temperatureFake1 = fake1;
						var item_left = [],
							item_right = [];
						for (var i = 42; i > 0; i--) {

							for (var j = 0; j < server.length; j++) {
								if (server[j].position == i) {
									var u = server[j].u;
									// var tempValue = server[j].temp;
									var tempValue = Math.random() * 100 + 20;
									var Tempcolor = demo.createColor(num, num_min, tempValue);
									for (var h = 0; h < u; h++) {
										item_left.push([i - h, Tempcolor, 'server']);
										item_right.push([i - h, Tempcolor, 'server']);
									}
									i = i - u;
								}
							};
							for (var j = 0; j < chassis.length; j++) {
								var cha_pos = chassis[j].position;
								var cards = chassis[j].cards;
								if (cha_pos == i) {
									for (var h = 13; h >= 0; h--) {
										for (var k = cards.length - 1; k >= 0; k--) {
											if (cards[k].position - 1 == h) {
												if (cards[k].position % 2 != 0) {
													// var tempValue = cards[k].temp;
													var tempValue = Math.random() * 100 + 20;
													var Tempcolor = demo.createColor(num, num_min, tempValue);
													var card_pos = cha_pos + (cards[k].position + 1) / 2 - 7;
													item_left.push([card_pos, Tempcolor, 'chassis']);
													h = h - 1;
												} else {
													// var tempValue = cards[k].temp;
													var tempValue = Math.random() * 100 + 20;
													var Tempcolor = demo.createColor(num, num_min, tempValue);
													var card_pos = cha_pos + cards[k].position / 2 - 7;
													item_right.push([card_pos, Tempcolor, 'chassis']);
													h = h - 1;
												}
											}
										}
										// 在chassis的左边
										if (h % 2 == 0 && h >= 0) {
											var card_pos_left = cha_pos + h / 2 - 6;
											item_left.push([card_pos_left, '#fff', 'chassis']);
										} else if (h >= 0) {
											var card_pos_right = cha_pos + (h - 1) / 2 - 6;
											item_right.push([card_pos_right, '#fff', 'chassis']);
										}
									}
									item_left.push([i - 7, '#ccc', 'null']);
									item_right.push([i - 7, '#ccc', 'null']);
									i = i - 8;
									break;
								}
							};
							for (var j = 0; j < server.length; j++) {
								if (server[j].position == i) {
									var u = server[j].u;
									// var tempValue = server[j].temp;
									var tempValue = Math.random() * 100 + 20;
									var Tempcolor = demo.createColor(num, num_min, tempValue);
									for (var h = 0; h < u; h++) {
										item_left.push([i - h, Tempcolor, 'server']);
										item_right.push([i - h, Tempcolor, 'server']);
									}
									i = i - u;
								}
							};
							item_left.push([i, '#fff', 'server']);
							item_right.push([i, '#fff', 'server']);
						}
						// console.log(JSON.stringify(item_left)+" length"+item_left.length)
						// console.log(JSON.stringify(item_right)+" length"+item_right.length)

						var sideImage1 = getImage(rackid + 'left', item_left);
						var label = element.getClient('label');
						label_l = label.split("").splice(0, 2).join(" ");
						var labelCanvas_l = demo.generateAssetImage(label_l, "left");
						fake1.setStyle('top.m.texture.image', labelCanvas_l);
						fake1.setStyle('top.m.specularmap.image', labelCanvas_l);

						fake1.s({
							// 6面的温度image
							'left.m.texture.image': sideImage1,
							'right.m.texture.image': null,
							'front.m.texture.image': sideImage1,
							'back.m.texture.image': sideImage1,
							'top.m.texture.image': fake1.getStyle('top.m.texture.image'),
							// 头上的颜色
							'top.m.normalmap.image': demo.getRes('metal_normalmap_l.jpg'),
							'top.m.specularmap.image': fake1.getStyle('top.m.texture.image'),
							'top.m.envmap.image': demo.getEnvMap(),
							'top.m.type': 'phong',
						});
						network.getDataBox().add(fake1);


						// fake2
						var fake2 = new mono.Cube(element.getWidth() / 2, element.getHeight(), element.getDepth());
						element.temperatureFake2 = fake2;
						// 高度随机分成10层
						var sideImage2 = getImage(rackid + 'right', item_right);;

						label_r = label.split("").splice(2, 2).join(" ");
						var labelCanvas_r = demo.generateAssetImage(label_r, "right");
						fake2.setStyle('top.m.texture.image', labelCanvas_r);
						fake2.setStyle('top.m.specularmap.image', labelCanvas_r);

						fake2.s({
							'left.m.texture.image': null,
							'right.m.texture.image': sideImage2,
							'front.m.texture.image': sideImage2,
							'back.m.texture.image': sideImage2,
							'top.m.texture.image': fake2.getStyle('top.m.texture.image'),
							// 头上的颜色
							'top.m.normalmap.image': demo.getRes('metal_normalmap_r.jpg'),
							'top.m.specularmap.image': fake2.getStyle('top.m.texture.image'),
							'top.m.envmap.image': demo.getEnvMap(),
							'top.m.type': 'phong',
						});
						network.getDataBox().add(fake2);
					};
					var x = element.getPositionX();
					var y = element.getPositionY();
					var z = element.getPositionZ();
					element.temperatureFake1.setPosition(x - 15, y, z);
					element.temperatureFake1.setVisible(network.temperatureView);

					element.temperatureFake2.setPosition(x + element.getWidth() / 2 - 15, y, z);
					element.temperatureFake2.setVisible(network.temperatureView);
				}
			}

		});
	},


	resetView: function(network) {
		demo.resetCamera(network);

		//reset all racks. unload contents, close door.
		var loadedRacks = [];
		network.getDataBox().forEach(function(element) {
			if (element.getClient('type') === 'rack' && element.oldRack) {
				loadedRacks.push(element);
			}
		});
		for (var i = 0; i < loadedRacks.length; i++) {
			//restore the old rack.
			var newRack = loadedRacks[i];
			var oldRack = newRack.oldRack;

			if (newRack.alarm) {
				network.getDataBox().getAlarmBox().remove(newRack.alarm);
			}
			network.getDataBox().removeByDescendant(newRack, true);

			network.getDataBox().add(oldRack);
			if (oldRack.alarm) {
				network.getDataBox().getAlarmBox().add(oldRack.alarm);
			}
			oldRack.door.setParent(oldRack);
			oldRack.setClient('loaded', false);

			//reset door.
			var door = oldRack.door;
			network.getDataBox().add(door);
			if (door.getClient('animated')) {
				demo.playAnimation(door, door.getClient('animation'));
			}
		}

		//reset room door.
		var doors = [];
		network.getDataBox().forEach(function(element) {
			if (element.getClient('type') === 'left-door' || element.getClient('type') === 'right-door') {
				doors.push(element);
			}
		});
		for (var i = 0; i < doors.length; i++) {
			var door = doors[i];
			if (door.getClient('animated')) {
				demo.playAnimation(door, door.getClient('animation'));
			}
		}

		//reset all views.
		if (network.temperatureView) {
			demo.toggleTemperatureView(network);
		}
	},

	setupControlBar: function(network) {
		var div = document.createElement('div');

		div.setAttribute('id', 'toolbar');
		div.style.display = 'block';
		div.style.position = 'absolute';
		div.style.left = '20px';
		div.style.top = '10px';
		div.style.width = 'auto';
		document.body.appendChild(div);
	},

	setupToolbar: function(buttons) {
		var count = buttons.length;
		var step = 32;

		var div = document.createElement('div');
		div.setAttribute('id', 'toolbar');
		div.style.display = 'block';
		div.style.position = 'absolute';
		div.style.left = '10px';
		div.style.top = '75px';
		div.style.width = '32px';
		div.style.height = (count * step + step) + 'px';
		div.style.background = 'rgba(255,255,255,0.75)';
		div.style['border-radius'] = '5px';
		document.body.appendChild(div);

		for (var i = 0; i < count; i++) {
			var button = buttons[i];
			var icon = button.icon;
			var img = document.createElement('img');
			img.style.position = 'absolute';
			img.style.left = '4px';
			img.style.top = (step / 2 + (i * step)) + 'px';
			img.style['pointer-events'] = 'auto';
			img.style['cursor'] = 'pointer';
			img.setAttribute('src', demo.getRes(icon));
			img.style.width = '24px';
			img.style.height = '24px';
			img.setAttribute('title', button.label);
			img.onclick = button.clickFunction;
			div.appendChild(img);
		}
	},
}