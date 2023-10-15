
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately after the component has been updated.
     *
     * The first time the callback runs will be after the initial `onMount`
     */
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.59.1 */

    const { Error: Error_1, console: console_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[71] = list[i];
    	child_ctx[73] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[74] = list[i];
    	child_ctx[76] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[77] = list[i];
    	child_ctx[76] = i;
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[71] = list[i];
    	child_ctx[73] = i;
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[71] = list[i];
    	child_ctx[73] = i;
    	return child_ctx;
    }

    function get_each_context_5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[81] = list[i];
    	child_ctx[76] = i;
    	return child_ctx;
    }

    // (612:3) {#each item.tags as tags, INDEX}
    function create_each_block_5(ctx) {
    	let button;
    	let t_value = /*tags*/ ctx[81].tag + "";
    	let t;
    	let mounted;
    	let dispose;

    	function click_handler_3() {
    		return /*click_handler_3*/ ctx[32](/*tags*/ ctx[81]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text(t_value);
    			add_location(button, file, 614, 3, 18863);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler_3, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*hello_fetch_data*/ 1 && t_value !== (t_value = /*tags*/ ctx[81].tag + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_5.name,
    		type: "each",
    		source: "(612:3) {#each item.tags as tags, INDEX}",
    		ctx
    	});

    	return block;
    }

    // (622:4) {#each ALL_TAGS as item, index}
    function create_each_block_4(ctx) {
    	let option;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			option.__value = option_value_value = /*item*/ ctx[71].tag;
    			option.value = option.__value;
    			add_location(option, file, 622, 4, 19212);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*ALL_TAGS*/ 128 && option_value_value !== (option_value_value = /*item*/ ctx[71].tag)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(622:4) {#each ALL_TAGS as item, index}",
    		ctx
    	});

    	return block;
    }

    // (648:2) {#each item.likes as item, index}
    function create_each_block_3(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "😇";
    			add_location(span, file, 648, 2, 20004);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(648:2) {#each item.likes as item, index}",
    		ctx
    	});

    	return block;
    }

    // (693:8) {#each comments_and_reply['comment_replies'] as comment_reply, INDEX}
    function create_each_block_2(ctx) {
    	let li;
    	let t0_value = /*comment_reply*/ ctx[77]['reply'] + "";
    	let t0;
    	let t1;
    	let button0;
    	let t2_value = /*comment_reply*/ ctx[77]['username'] + "";
    	let t2;
    	let t3;
    	let button1;
    	let t5;
    	let mounted;
    	let dispose;

    	function click_handler_6() {
    		return /*click_handler_6*/ ctx[39](/*comment_reply*/ ctx[77]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = space();
    			button0 = element("button");
    			t2 = text(t2_value);
    			t3 = space();
    			button1 = element("button");
    			button1.textContent = "fetch_delete_comment_reply";
    			t5 = space();
    			add_location(button0, file, 700, 6, 22302);
    			add_location(button1, file, 701, 6, 22418);
    			add_location(li, file, 698, 5, 22260);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    			append_dev(li, button0);
    			append_dev(button0, t2);
    			append_dev(li, t3);
    			append_dev(li, button1);
    			insert_dev(target, t5, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler_6, false, false, false, false),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(/*fetch_delete_comment_reply*/ ctx[19](/*comment_reply*/ ctx[77]['id']))) /*fetch_delete_comment_reply*/ ctx[19](/*comment_reply*/ ctx[77]['id']).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*hello_fetch_data*/ 1 && t0_value !== (t0_value = /*comment_reply*/ ctx[77]['reply'] + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*hello_fetch_data*/ 1 && t2_value !== (t2_value = /*comment_reply*/ ctx[77]['username'] + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (detaching) detach_dev(t5);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(693:8) {#each comments_and_reply['comment_replies'] as comment_reply, INDEX}",
    		ctx
    	});

    	return block;
    }

    // (658:27) {#each item.comments_and_replies as comments_and_reply, INDEX}
    function create_each_block_1(ctx) {
    	let li0;
    	let t0_value = /*comments_and_reply*/ ctx[74][/*INDEX*/ ctx[76]]['comment'] + "";
    	let t0;
    	let t1;
    	let button0;
    	let t2_value = /*comments_and_reply*/ ctx[74][/*INDEX*/ ctx[76]]['username'] + "";
    	let t2;
    	let t3;
    	let button1;
    	let t5;
    	let input;
    	let t6;
    	let button2;
    	let t8;
    	let li1;
    	let ul;
    	let t9;
    	let mounted;
    	let dispose;

    	function click_handler_5() {
    		return /*click_handler_5*/ ctx[37](/*comments_and_reply*/ ctx[74], /*INDEX*/ ctx[76]);
    	}

    	let each_value_2 = /*comments_and_reply*/ ctx[74]['comment_replies'];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			li0 = element("li");
    			t0 = text(t0_value);
    			t1 = space();
    			button0 = element("button");
    			t2 = text(t2_value);
    			t3 = space();
    			button1 = element("button");
    			button1.textContent = "fetch_delete_comment";
    			t5 = space();
    			input = element("input");
    			t6 = space();
    			button2 = element("button");
    			button2.textContent = "fetch_insert_comment_reply";
    			t8 = space();
    			li1 = element("li");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t9 = space();
    			add_location(button0, file, 665, 4, 20693);
    			add_location(button1, file, 666, 4, 20831);
    			add_location(li0, file, 663, 3, 20641);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "comment_reply");
    			add_location(input, file, 685, 4, 21660);
    			add_location(button2, file, 686, 4, 21739);
    			add_location(ul, file, 692, 4, 21940);
    			attr_dev(li1, "class", "reply_zone svelte-1mb8pst");
    			add_location(li1, file, 689, 3, 21859);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li0, anchor);
    			append_dev(li0, t0);
    			append_dev(li0, t1);
    			append_dev(li0, button0);
    			append_dev(button0, t2);
    			append_dev(li0, t3);
    			append_dev(li0, button1);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*COMMENT_REPLY*/ ctx[5]);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, button2, anchor);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, li1, anchor);
    			append_dev(li1, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}

    			insert_dev(target, t9, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler_5, false, false, false, false),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(/*fetch_delete_comment*/ ctx[17](/*comments_and_reply*/ ctx[74][/*INDEX*/ ctx[76]]['id']))) /*fetch_delete_comment*/ ctx[17](/*comments_and_reply*/ ctx[74][/*INDEX*/ ctx[76]]['id']).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[38]),
    					listen_dev(
    						button2,
    						"click",
    						function () {
    							if (is_function(/*fetch_insert_comment_reply*/ ctx[18](/*comments_and_reply*/ ctx[74][/*INDEX*/ ctx[76]]['id']))) /*fetch_insert_comment_reply*/ ctx[18](/*comments_and_reply*/ ctx[74][/*INDEX*/ ctx[76]]['id']).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*hello_fetch_data*/ 1 && t0_value !== (t0_value = /*comments_and_reply*/ ctx[74][/*INDEX*/ ctx[76]]['comment'] + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*hello_fetch_data*/ 1 && t2_value !== (t2_value = /*comments_and_reply*/ ctx[74][/*INDEX*/ ctx[76]]['username'] + "")) set_data_dev(t2, t2_value);

    			if (dirty[0] & /*COMMENT_REPLY*/ 32 && input.value !== /*COMMENT_REPLY*/ ctx[5]) {
    				set_input_value(input, /*COMMENT_REPLY*/ ctx[5]);
    			}

    			if (dirty[0] & /*fetch_delete_comment_reply, hello_fetch_data, user_and_fetch_hello*/ 34078721) {
    				each_value_2 = /*comments_and_reply*/ ctx[74]['comment_replies'];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(input);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(button2);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(li1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t9);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(658:27) {#each item.comments_and_replies as comments_and_reply, INDEX}",
    		ctx
    	});

    	return block;
    }

    // (604:1) {#each hello_fetch_data as item, index}
    function create_each_block(ctx) {
    	let br0;
    	let t0;
    	let br1;
    	let t1;
    	let li1;
    	let div0;
    	let t2;
    	let div1;
    	let input0;
    	let t3;
    	let datalist;
    	let t4;
    	let button0;
    	let t6;
    	let ul0;
    	let li0;
    	let a;
    	let t7_value = /*item*/ ctx[71].link + "";
    	let t7;
    	let a_href_value;
    	let t8;
    	let button1;
    	let t10;
    	let button2;
    	let t11_value = /*item*/ ctx[71].username + "";
    	let t11;
    	let t12;
    	let t13;
    	let button3;
    	let t15;
    	let div2;
    	let input1;
    	let t16;
    	let button4;
    	let t18;
    	let ul1;
    	let t19;
    	let mounted;
    	let dispose;
    	let each_value_5 = /*item*/ ctx[71].tags;
    	validate_each_argument(each_value_5);
    	let each_blocks_3 = [];

    	for (let i = 0; i < each_value_5.length; i += 1) {
    		each_blocks_3[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
    	}

    	let each_value_4 = /*ALL_TAGS*/ ctx[7];
    	validate_each_argument(each_value_4);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks_2[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	function click_handler_4() {
    		return /*click_handler_4*/ ctx[35](/*item*/ ctx[71]);
    	}

    	let each_value_3 = /*item*/ ctx[71].likes;
    	validate_each_argument(each_value_3);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks_1[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	let each_value_1 = /*item*/ ctx[71].comments_and_replies;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			br0 = element("br");
    			t0 = space();
    			br1 = element("br");
    			t1 = space();
    			li1 = element("li");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				each_blocks_3[i].c();
    			}

    			t2 = space();
    			div1 = element("div");
    			input0 = element("input");
    			t3 = space();
    			datalist = element("datalist");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t4 = space();
    			button0 = element("button");
    			button0.textContent = "fetch_insert_tag";
    			t6 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			a = element("a");
    			t7 = text(t7_value);
    			t8 = space();
    			button1 = element("button");
    			button1.textContent = "fetch_delete_link";
    			t10 = space();
    			button2 = element("button");
    			t11 = text(t11_value);
    			t12 = space();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t13 = space();
    			button3 = element("button");
    			button3.textContent = "like_increment_or_decrement";
    			t15 = space();
    			div2 = element("div");
    			input1 = element("input");
    			t16 = space();
    			button4 = element("button");
    			button4.textContent = "fetch_insert_comment";
    			t18 = space();
    			ul1 = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t19 = space();
    			add_location(br0, file, 604, 1, 18661);
    			add_location(br1, file, 605, 1, 18667);
    			attr_dev(div0, "class", "svelte-1mb8pst");
    			add_location(div0, file, 610, 2, 18741);
    			attr_dev(input0, "list", "autocomplete_list");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "");
    			attr_dev(input0, "id", "hoge");
    			attr_dev(input0, "placeholder", "tag");
    			add_location(input0, file, 619, 3, 18974);
    			attr_dev(datalist, "id", "autocomplete_list");
    			add_location(datalist, file, 620, 3, 19138);
    			add_location(button0, file, 625, 3, 19268);
    			attr_dev(div1, "class", "svelte-1mb8pst");
    			add_location(div1, file, 618, 2, 18965);
    			attr_dev(a, "href", a_href_value = /*item*/ ctx[71].link);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "class", "link_text svelte-1mb8pst");
    			add_location(a, file, 631, 3, 19368);
    			add_location(button1, file, 632, 3, 19441);
    			add_location(li0, file, 630, 3, 19360);
    			add_location(ul0, file, 629, 2, 19352);
    			add_location(button2, file, 642, 2, 19736);
    			add_location(button3, file, 650, 2, 20032);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "");
    			attr_dev(input1, "id", "");
    			attr_dev(input1, "placeholder", "comment");
    			add_location(input1, file, 653, 3, 20143);
    			add_location(button4, file, 654, 3, 20223);
    			attr_dev(div2, "class", "svelte-1mb8pst");
    			add_location(div2, file, 652, 2, 20134);
    			attr_dev(ul1, "class", "comment_zone svelte-1mb8pst");
    			add_location(ul1, file, 657, 2, 20314);
    			add_location(li1, file, 607, 1, 18674);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, li1, anchor);
    			append_dev(li1, div0);

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				if (each_blocks_3[i]) {
    					each_blocks_3[i].m(div0, null);
    				}
    			}

    			append_dev(li1, t2);
    			append_dev(li1, div1);
    			append_dev(div1, input0);
    			/*input0_binding*/ ctx[33](input0);
    			set_input_value(input0, /*TAG*/ ctx[6]);
    			append_dev(div1, t3);
    			append_dev(div1, datalist);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				if (each_blocks_2[i]) {
    					each_blocks_2[i].m(datalist, null);
    				}
    			}

    			append_dev(div1, t4);
    			append_dev(div1, button0);
    			append_dev(li1, t6);
    			append_dev(li1, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a);
    			append_dev(a, t7);
    			append_dev(li0, t8);
    			append_dev(li0, button1);
    			append_dev(li1, t10);
    			append_dev(li1, button2);
    			append_dev(button2, t11);
    			append_dev(li1, t12);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(li1, null);
    				}
    			}

    			append_dev(li1, t13);
    			append_dev(li1, button3);
    			append_dev(li1, t15);
    			append_dev(li1, div2);
    			append_dev(div2, input1);
    			set_input_value(input1, /*COMMENT*/ ctx[4]);
    			append_dev(div2, t16);
    			append_dev(div2, button4);
    			append_dev(li1, t18);
    			append_dev(li1, ul1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul1, null);
    				}
    			}

    			append_dev(li1, t19);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler_1*/ ctx[34]),
    					listen_dev(input0, "input", /*fetch_get_tags_for_autocomplete*/ ctx[21], false, false, false, false),
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(/*fetch_insert_tag*/ ctx[20](/*item*/ ctx[71].id))) /*fetch_insert_tag*/ ctx[20](/*item*/ ctx[71].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(/*fetch_delete_link*/ ctx[14](/*item*/ ctx[71].id))) /*fetch_delete_link*/ ctx[14](/*item*/ ctx[71].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(button2, "click", click_handler_4, false, false, false, false),
    					listen_dev(
    						button3,
    						"click",
    						function () {
    							if (is_function(/*fetch_like_increment_or_decrement*/ ctx[15](/*item*/ ctx[71].id))) /*fetch_like_increment_or_decrement*/ ctx[15](/*item*/ ctx[71].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(input1, "input", /*input1_input_handler_1*/ ctx[36]),
    					listen_dev(
    						button4,
    						"click",
    						function () {
    							if (is_function(/*fetch_insert_comment*/ ctx[16](/*item*/ ctx[71].id))) /*fetch_insert_comment*/ ctx[16](/*item*/ ctx[71].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*req_tag_and_fetch_hello, hello_fetch_data*/ 16777217) {
    				each_value_5 = /*item*/ ctx[71].tags;
    				validate_each_argument(each_value_5);
    				let i;

    				for (i = 0; i < each_value_5.length; i += 1) {
    					const child_ctx = get_each_context_5(ctx, each_value_5, i);

    					if (each_blocks_3[i]) {
    						each_blocks_3[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_3[i] = create_each_block_5(child_ctx);
    						each_blocks_3[i].c();
    						each_blocks_3[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks_3.length; i += 1) {
    					each_blocks_3[i].d(1);
    				}

    				each_blocks_3.length = each_value_5.length;
    			}

    			if (dirty[0] & /*TAG*/ 64 && input0.value !== /*TAG*/ ctx[6]) {
    				set_input_value(input0, /*TAG*/ ctx[6]);
    			}

    			if (dirty[0] & /*ALL_TAGS*/ 128) {
    				each_value_4 = /*ALL_TAGS*/ ctx[7];
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_4(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(datalist, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_4.length;
    			}

    			if (dirty[0] & /*hello_fetch_data*/ 1 && t7_value !== (t7_value = /*item*/ ctx[71].link + "")) set_data_dev(t7, t7_value);

    			if (dirty[0] & /*hello_fetch_data*/ 1 && a_href_value !== (a_href_value = /*item*/ ctx[71].link)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty[0] & /*hello_fetch_data*/ 1 && t11_value !== (t11_value = /*item*/ ctx[71].username + "")) set_data_dev(t11, t11_value);

    			if (dirty[0] & /*hello_fetch_data*/ 1) {
    				each_value_3 = /*item*/ ctx[71].likes;
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_3(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(li1, t13);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_3.length;
    			}

    			if (dirty[0] & /*COMMENT*/ 16 && input1.value !== /*COMMENT*/ ctx[4]) {
    				set_input_value(input1, /*COMMENT*/ ctx[4]);
    			}

    			if (dirty[0] & /*hello_fetch_data, fetch_delete_comment_reply, user_and_fetch_hello, fetch_insert_comment_reply, COMMENT_REPLY, fetch_delete_comment*/ 34471969) {
    				each_value_1 = /*item*/ ctx[71].comments_and_replies;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(li1);
    			destroy_each(each_blocks_3, detaching);
    			/*input0_binding*/ ctx[33](null);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(604:1) {#each hello_fetch_data as item, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let t0;
    	let input0;
    	let t1;
    	let input1;
    	let t2;
    	let div;
    	let t3;
    	let input2;
    	let t4;
    	let button0;
    	let t6;
    	let button1;
    	let t8;
    	let button2;
    	let t9;
    	let t10;
    	let t11;
    	let button3;
    	let t12;
    	let t13;
    	let t14;
    	let ul;
    	let t15;
    	let br;
    	let t16;
    	let button4;
    	let t18;
    	let footer;
    	let p0;
    	let t20;
    	let p1;
    	let a0;
    	let t23;
    	let p2;
    	let a1;
    	let t26;
    	let p3;
    	let p4;
    	let a2;
    	let t29;
    	let p5;
    	let p6;
    	let a3;
    	let mounted;
    	let dispose;
    	let each_value = /*hello_fetch_data*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			t0 = text("name: ");
    			input0 = element("input");
    			t1 = text("\npassword: ");
    			input1 = element("input");
    			t2 = space();
    			div = element("div");
    			t3 = text("link: ");
    			input2 = element("input");
    			t4 = space();
    			button0 = element("button");
    			button0.textContent = "insert_link";
    			t6 = space();
    			button1 = element("button");
    			button1.textContent = "CLEAR";
    			t8 = space();
    			button2 = element("button");
    			t9 = text("ORDER_BY: ");
    			t10 = text(/*ORDER_BY*/ ctx[9]);
    			t11 = space();
    			button3 = element("button");
    			t12 = text("ORDER_BY_COLUMN: ");
    			t13 = text(/*ORDER_BY_COLUMN*/ ctx[10]);
    			t14 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t15 = space();
    			br = element("br");
    			t16 = space();
    			button4 = element("button");
    			button4.textContent = "toggle_footer";
    			t18 = space();
    			footer = element("footer");
    			p0 = element("p");
    			p0.textContent = "Version 0.0.0.1";
    			t20 = space();
    			p1 = element("p");
    			p1.textContent = "client side hosting: ";
    			a0 = element("a");
    			a0.textContent = "https://taroyanaka.github.io/svelte/";
    			t23 = space();
    			p2 = element("p");
    			p2.textContent = "server side hosting: ";
    			a1 = element("a");
    			a1.textContent = "https://glitch.com/edit/#!/spectrum-whip-sulfur?path=server.js%3A3%3A0";
    			t26 = space();
    			p3 = element("p");
    			p3.textContent = "client side source code: ";
    			p4 = element("p");
    			a2 = element("a");
    			a2.textContent = "https://github.com/taroyanaka/svelte/";
    			t29 = space();
    			p5 = element("p");
    			p5.textContent = "server side source code: ";
    			p6 = element("p");
    			a3 = element("a");
    			a3.textContent = "https://github.com/taroyanaka/duct/";
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "placeholder", "name");
    			add_location(input0, file, 544, 6, 16070);
    			attr_dev(input1, "type", "password");
    			attr_dev(input1, "placeholder", "password");
    			add_location(input1, file, 545, 10, 16137);
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "placeholder", "link_url");
    			attr_dev(input2, "class", "link");
    			add_location(input2, file, 587, 7, 17494);
    			attr_dev(button0, "class", "insert_link");
    			add_location(button0, file, 588, 1, 17569);
    			add_location(button1, file, 589, 1, 17648);
    			add_location(button2, file, 594, 1, 17954);
    			add_location(button3, file, 599, 1, 18503);
    			attr_dev(div, "class", "svelte-1mb8pst");
    			add_location(div, file, 586, 0, 17481);
    			add_location(ul, file, 602, 0, 18614);
    			add_location(br, file, 722, 0, 22956);
    			add_location(button4, file, 724, 0, 22985);
    			add_location(p0, file, 726, 2, 23108);
    			add_location(p1, file, 727, 2, 23133);
    			attr_dev(a0, "href", "https://taroyanaka.github.io/svelte/");
    			add_location(a0, file, 727, 30, 23161);
    			add_location(p2, file, 728, 2, 23251);
    			attr_dev(a1, "href", "https://glitch.com/edit/#!/spectrum-whip-sulfur?path=server.js%3A3%3A0");
    			add_location(a1, file, 728, 30, 23279);
    			add_location(p3, file, 729, 2, 23437);
    			attr_dev(a2, "href", "https://github.com/taroyanaka/svelte/");
    			add_location(a2, file, 729, 33, 23468);
    			add_location(p4, file, 729, 30, 23465);
    			add_location(p5, file, 730, 2, 23560);
    			attr_dev(a3, "href", "https://github.com/taroyanaka/duct/");
    			add_location(a3, file, 730, 33, 23591);
    			add_location(p6, file, 730, 30, 23588);
    			attr_dev(footer, "class", "footer_open");
    			attr_dev(footer, "id", "footer");
    			set_style(footer, "display", "block");
    			add_location(footer, file, 725, 0, 23041);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, input0, anchor);
    			set_input_value(input0, /*NAME*/ ctx[1]);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, input1, anchor);
    			set_input_value(input1, /*PASSWORD*/ ctx[2]);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, t3);
    			append_dev(div, input2);
    			set_input_value(input2, /*LINK*/ ctx[3]);
    			append_dev(div, t4);
    			append_dev(div, button0);
    			append_dev(div, t6);
    			append_dev(div, button1);
    			append_dev(div, t8);
    			append_dev(div, button2);
    			append_dev(button2, t9);
    			append_dev(button2, t10);
    			append_dev(div, t11);
    			append_dev(div, button3);
    			append_dev(button3, t12);
    			append_dev(button3, t13);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}

    			insert_dev(target, t15, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, button4, anchor);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, footer, anchor);
    			append_dev(footer, p0);
    			append_dev(footer, t20);
    			append_dev(footer, p1);
    			append_dev(footer, a0);
    			append_dev(footer, t23);
    			append_dev(footer, p2);
    			append_dev(footer, a1);
    			append_dev(footer, t26);
    			append_dev(footer, p3);
    			append_dev(footer, p4);
    			append_dev(p4, a2);
    			append_dev(p4, t29);
    			append_dev(footer, p5);
    			append_dev(footer, p6);
    			append_dev(p6, a3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[26]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[27]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[28]),
    					listen_dev(button0, "click", /*fetch_insert_link*/ ctx[13], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler*/ ctx[29], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_1*/ ctx[30], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_2*/ ctx[31], false, false, false, false),
    					listen_dev(button4, "click", /*toggle_footer*/ ctx[11], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*NAME*/ 2 && input0.value !== /*NAME*/ ctx[1]) {
    				set_input_value(input0, /*NAME*/ ctx[1]);
    			}

    			if (dirty[0] & /*PASSWORD*/ 4 && input1.value !== /*PASSWORD*/ ctx[2]) {
    				set_input_value(input1, /*PASSWORD*/ ctx[2]);
    			}

    			if (dirty[0] & /*LINK*/ 8 && input2.value !== /*LINK*/ ctx[3]) {
    				set_input_value(input2, /*LINK*/ ctx[3]);
    			}

    			if (dirty[0] & /*ORDER_BY*/ 512) set_data_dev(t10, /*ORDER_BY*/ ctx[9]);
    			if (dirty[0] & /*ORDER_BY_COLUMN*/ 1024) set_data_dev(t13, /*ORDER_BY_COLUMN*/ ctx[10]);

    			if (dirty[0] & /*hello_fetch_data, fetch_delete_comment_reply, user_and_fetch_hello, fetch_insert_comment_reply, COMMENT_REPLY, fetch_delete_comment, fetch_insert_comment, COMMENT, fetch_like_increment_or_decrement, fetch_delete_link, fetch_insert_tag, ALL_TAGS, TAG_VAL, TAG, fetch_get_tags_for_autocomplete, req_tag_and_fetch_hello*/ 54510065) {
    				each_value = /*hello_fetch_data*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(input0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(input1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(button4);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(footer);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let hello_fetch_data = [];
    	let NAME = 'user1';
    	let TEST_MODE = 'TEST_MODE';

    	// let TEST_MODE = 'PRODUCTION_MODE';
    	let PASSWORD = 'user_pass1';

    	let LINK = 'https://yanaka.dev/';
    	let COMMENT = 'comment1';
    	let COMMENT_REPLY = 'reply1';
    	let TAG = 'tag1';
    	let ALL_TAGS = [];
    	let RESPONSE;
    	let TAG_VAL = "";

    	const WHITE_LIST_URL_ARRAY = [
    		'https://www.yahoo.co.jp/',
    		'https://www.google.co.jp/',
    		'https://www.youtube.com/'
    	];

    	let ORDER_BY = 'ASC';

    	// let ORDER_BY_COLUMN = 'links.id';
    	let ORDER_BY_COLUMN = 'id';

    	let REQ_TAG = '';
    	let USER = '';
    	let ERROR_MESSAGE = "";
    	let SUCCESS_MESSAGE = '';
    	let ERROR_MESSAGE_STACK = [];
    	let SUCCESS_MESSAGE_STACK = [];
    	let COLLECT_VALUE = [{ 'value': 0 }, { 'value2': 1 }];
    	let DOMAIN_NAME = 'http://localhost:8000/';

    	// let DOMAIN_NAME = 'https://spectrum-whip-sulfur.glitch.me/';
    	// footerを開閉可能にする関数
    	const toggle_footer = () => {
    		// openはcssのクラス名footer_openが適用される
    		// closeはcssのクラス名footer_closeが適用される
    		// footerの要素を取得
    		const footer = document.getElementById('footer');

    		footer.style = footer.className.includes('footer_open')
    		? 'display: none;'
    		: 'display: block;';

    		footer.className = footer.className.includes('footer_open')
    		? 'footer_close'
    		: 'footer_open';
    	};

    	const test_db_init_only_set_name_password_test_mode = async () => {
    		($$invalidate(1, NAME = 'testuser'), $$invalidate(2, PASSWORD = 'duct_mean_fuckst1ck'), TEST_MODE = 'TEST_MODE');
    	};

    	const test_db_init_on_start = async () => {
    		try {
    			($$invalidate(1, NAME = 'testuser'), $$invalidate(2, PASSWORD = 'duct_mean_fuckst1ck'), TEST_MODE = 'TEST_MODE');

    			RESPONSE = await (await fetch(DOMAIN_NAME + 'test_db_init', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				test_mode: TEST_MODE
    			}))).json();

    			RESPONSE.result === 'fail'
    			? (() => {
    					throw new Error(RESPONSE.error);
    				})()
    			: null;
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const test_db_init_on_end = async () => {
    		try {
    			($$invalidate(1, NAME = 'testuser'), $$invalidate(2, PASSWORD = 'duct_mean_fuckst1ck'), TEST_MODE = 'TEST_MODE');

    			RESPONSE = await (await fetch(DOMAIN_NAME + 'test_db_init', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				test_mode: TEST_MODE
    			}))).json();

    			RESPONSE.result === 'fail'
    			? (() => {
    					throw new Error(RESPONSE.error);
    				})()
    			: null;
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const message_stacker = (Data, Expect_result) => {
    		SUCCESS_MESSAGE === 'success'
    		? (console.log('OK'), SUCCESS_MESSAGE_STACK.push(['OK', (Data ? Data + 'は' : '') + 'OK']))
    		: null;

    		ERROR_MESSAGE === Expect_result
    		? (console.log('OK'), ERROR_MESSAGE_STACK.push(['OK', Expect_result]))
    		: console.log('NG');
    	};

    	const test_for_LINK = async ({ Data = 'SELECT', Expect_result = 'SQLの予約語を含む場合はエラー' }) => {
    		$$invalidate(3, LINK = Data);
    		await fetch_insert_link();
    		message_stacker(Data, Expect_result);
    	};

    	const test_for_TAG = async ({ Data = 'test!', Param_of_link_id = 1, Expect_result = '記号を含む場合はエラー' }) => {
    		await fetch_insert_tag(Param_of_link_id, Data);
    		message_stacker(Data, Expect_result);
    	};

    	const test_for_COMMENT = async ({ Data = ('a').repeat(51), Param_of_link_id = 1, Expect_result = 'commentの文字数がdata_limitを超える場合はエラー' }) => {
    		$$invalidate(4, COMMENT = Data);
    		await fetch_insert_comment(Param_of_link_id);
    		message_stacker(Data, Expect_result);
    	};

    	const test_for_COMMENT_REPLY = async ({ Data = ('a').repeat(51), Param_of_comment_id = 1, Expect_result = 'commentの文字数がdata_limitを超える場合はエラー' }) => {
    		$$invalidate(5, COMMENT_REPLY = Data);
    		await fetch_insert_comment_reply(Param_of_comment_id);
    		message_stacker(Data, Expect_result);
    	};

    	const test_for_LIKE_INCREMENT_OR_DECREMENT = async ({ Data = '', Param_of_link_id = 1, Expect_result = 'success' }) => {
    		await fetch_like_increment_or_decrement(Param_of_link_id);
    		message_stacker(Data, Expect_result);
    	};

    	const test_sample_exe = async () => {
    		await test_db_init_on_start();

    		await test_for_LINK({
    			Data: 'SELECT',
    			Expect_result: 'SQLの予約語を含む場合はエラー'
    		});

    		await test_for_LINK({
    			Data: 'https::///google.co.jp',
    			Expect_result: 'URLの形式が正しくありません'
    		});

    		await test_for_LINK({
    			Data: 'https://hogehoge.com/',
    			Expect_result: '許可されていないURLです'
    		});

    		await test_for_LINK({
    			Data: 'https://www.yahoo.co.jp/',
    			Expect_result: 'OK'
    		});

    		await test_for_LINK({
    			Data: 'https://www.google.co.jp/',
    			Expect_result: 'OK'
    		});

    		await test_for_LINK({
    			Data: 'https://www.youtube.com/',
    			Expect_result: 'OK'
    		});

    		await test_for_LINK({
    			Data: 'https://www.google.co.jp/',
    			Expect_result: '同じlinkが存在します'
    		});

    		console.log(ERROR_MESSAGE_STACK);
    		console.log(SUCCESS_MESSAGE_STACK);
    	};

    	const test_sample_exe2 = async () => {
    		await test_for_TAG({
    			Param_of_link_id: 1,
    			Expect_result: '記号を含む場合はエラー'
    		});

    		await test_for_TAG({
    			Data: 'test!',
    			Param_of_link_id: 1,
    			Expect_result: '記号を含む場合はエラー'
    		});

    		await test_for_TAG({
    			Data: 'test tag',
    			Param_of_link_id: 1,
    			Expect_result: '空白を含む場合はエラー'
    		});

    		await test_for_TAG({
    			Data: 'testlong',
    			Param_of_link_id: 1,
    			Expect_result: '7文字以上はエラー'
    		});

    		await test_for_TAG({
    			Data: 'SELECT',
    			Param_of_link_id: 1,
    			Expect_result: 'SQLの予約語を含む場合はエラー'
    		});

    		await test_for_TAG({
    			Data: 'test',
    			Param_of_link_id: 1,
    			Expect_result: 'OK'
    		});

    		// 既に同じタグがついています
    		await test_for_TAG({
    			Data: 'test',
    			Param_of_link_id: 1,
    			Expect_result: '既に同じタグがついています'
    		});

    		// 別のlinkへのtagはエラーにならない
    		await test_for_TAG({
    			Data: 'test',
    			Param_of_link_id: 2,
    			Expect_result: 'OK'
    		});

    		// 既に同じタグがついています
    		await test_for_TAG({
    			Data: 'test',
    			Param_of_link_id: 2,
    			Expect_result: '既に同じタグがついています'
    		});

    		await test_for_TAG({
    			Data: 'TEST',
    			Param_of_link_id: 1,
    			Expect_result: 'OK'
    		});

    		console.log(ERROR_MESSAGE_STACK);
    		console.log(SUCCESS_MESSAGE_STACK);
    	};

    	const test_sample_exe3 = async () => {
    		// 'commentの文字数がdata_limitを超える場合はエラー'
    		// 'should return "commentの文字数がdata_limit(test userは1000)を超える場合はエラー" when comment length is greater than data limit'
    		// error_check_insert_comment('a'.repeat(1500), 50);
    		await test_for_COMMENT({
    			Data: ('a').repeat(1500),
    			Param_of_link_id: 1,
    			Expect_result: 'commentの文字数がdata_limit(test userは50)を超える場合はエラー'
    		});

    		// 'should return "0文字の場合はエラー" when comment length is 0'
    		// error_check_insert_comment('', 100);
    		await test_for_COMMENT({
    			Data: '',
    			Param_of_link_id: 1,
    			Expect_result: '0文字の場合はエラー'
    		});

    		// 'should return "空白を含む場合はエラー" when comment contains spaces'
    		// error_check_insert_comment('This is a comment with spaces', 100);
    		await test_for_COMMENT({
    			Data: 'This is a comment with spaces',
    			Param_of_link_id: 1,
    			Expect_result: '空白を含む場合はエラー'
    		});

    		// 'should return "記号を含む場合はエラー" when comment contains symbols'
    		// error_check_insert_comment('This is a comment with ! symbol', 100);
    		await test_for_COMMENT({
    			Data: 'This!Symbol',
    			Param_of_link_id: 1,
    			Expect_result: '記号を含む場合はエラー'
    		});

    		// 'should return "300文字以上はエラー" when comment length is greater than 300'
    		// error_check_insert_comment('a'.repeat(301), 100);
    		await test_for_COMMENT({
    			Data: ('a').repeat(301),
    			Param_of_link_id: 1,
    			Expect_result: '300文字以上はエラー'
    		});

    		// 'should return "SQLの予約語を含む場合はエラー" when comment contains SQL reserved words'
    		// error_check_insert_comment('SELECT * FROM comments', 100);
    		await test_for_COMMENT({
    			Data: 'SELECT * FROM comments',
    			Param_of_link_id: 1,
    			Expect_result: 'SQLの予約語を含む場合はエラー'
    		});

    		// 'should return "OK" when comment is valid'
    		// error_check_insert_comment('This is a valid comment', 100);
    		await test_for_COMMENT({
    			Data: 'ThisIsaValidComment',
    			Param_of_link_id: 1,
    			Expect_result: 'OK'
    		});
    	};

    	const test_sample_exe4 = async () => {
    		// 'comment_replyが空の場合はエラー'
    		// 'comment_replyの文字数がdata_limitを超える場合はエラー'
    		await test_for_COMMENT_REPLY({
    			Data: ('a').repeat(1500),
    			Param_of_comment_id: 1,
    			Expect_result: 'comment_replyの文字数がdata_limit(test userは50)を超える場合はエラー'
    		});

    		// '0文字の場合はエラー'
    		await test_for_COMMENT_REPLY({
    			Data: '',
    			Param_of_comment_id: 1,
    			Expect_result: '0文字の場合はエラー'
    		});

    		// '記号を含む場合はエラー'
    		await test_for_COMMENT_REPLY({
    			Data: 'This!Symbol',
    			Param_of_comment_id: 1,
    			Expect_result: '記号を含む場合はエラー'
    		});

    		// '空白を含む場合はエラー'
    		await test_for_COMMENT_REPLY({
    			Data: 'spa ces',
    			Param_of_comment_id: 1,
    			Expect_result: '空白を含む場合はエラー'
    		});

    		// '10文字以上はエラー'
    		await test_for_COMMENT_REPLY({
    			Data: ('a').repeat(11),
    			Param_of_comment_id: 1,
    			Expect_result: '10文字以上はエラー'
    		});

    		// 'SQLの予約語を含む場合はエラー'
    		await test_for_COMMENT_REPLY({
    			Data: 'SELECT * FROM comments',
    			Param_of_comment_id: 1,
    			Expect_result: 'SQLの予約語を含む場合はエラー'
    		});

    		// 'OK'
    		await test_for_COMMENT_REPLY({
    			Data: 'ValidRep',
    			Param_of_comment_id: 1,
    			Expect_result: 'OK'
    		});

    		// 同じユーザーから同じcommentへのreplyが既に存在する場合はエラー
    		await test_for_COMMENT_REPLY({
    			Data: 'ValidRep',
    			Param_of_comment_id: 1,
    			Expect_result: '同じユーザーから同じcommentへのreplyが既に存在する場合はエラー'
    		});
    	};

    	const test_sample_exe5 = async () => {
    		// link_idがありません
    		await test_for_LIKE_INCREMENT_OR_DECREMENT({
    			Param_of_link_id: 1000000000,
    			Expect_result: 'link_idがありません'
    		});

    		// message.response = 'increment_it';
    		await test_for_LIKE_INCREMENT_OR_DECREMENT({
    			Param_of_link_id: 1,
    			Expect_result: 'success'
    		});

    		// message.response = 'decrement_it';
    		await test_for_LIKE_INCREMENT_OR_DECREMENT({
    			Param_of_link_id: 1,
    			Expect_result: 'success'
    		});

    		// do like again
    		await test_for_LIKE_INCREMENT_OR_DECREMENT({
    			Param_of_link_id: 1,
    			Expect_result: 'success'
    		});
    	};

    	const fetch_hello = async ({ ORDER_BY_PARAM = 'DESC', ORDER_BY_COLUMN_PARAM = 'id', REQ_TAG_PARAM, USER_PARAM }) => {
    		console.log(ORDER_BY_COLUMN_PARAM);

    		try {
    			$$invalidate(9, ORDER_BY = ORDER_BY_PARAM); // ? ORDER_BY_PARAM : 'DESC';
    			$$invalidate(10, ORDER_BY_COLUMN = ORDER_BY_COLUMN_PARAM); // ? ORDER_BY_COLUMN_PARAM : 'links.id';
    			REQ_TAG = REQ_TAG_PARAM; // ? REQ_TAG_PARAM : null;
    			USER = USER_PARAM; // ? USER_PARAM : null;

    			const make_get_param = () => {
    				const get_param_array = [];

    				if (ORDER_BY) {
    					get_param_array.push(`order_by=${ORDER_BY}`);
    				}

    				;

    				if (ORDER_BY_COLUMN) {
    					get_param_array.push(`order_by_column=${ORDER_BY_COLUMN}`);
    				}

    				;

    				if (REQ_TAG) {
    					get_param_array.push(`tag=${REQ_TAG}`);
    				}

    				;

    				if (USER) {
    					get_param_array.push(`user=${USER}`);
    				}

    				;
    				const endpoint = DOMAIN_NAME + 'read_all';
    				const get_param = get_param_array.join('&');
    				return `${endpoint}?${get_param}`;
    			};

    			const res = await (await fetch(make_get_param())).json();
    			if (res.result === 'fail') throw new Error(res.error);
    			const pre_result = await (await fetch(make_get_param())).json();

    			// pre_resultが空の場合はエラーを投げる
    			if (pre_result.length === 0) throw new Error('条件に一致するデータがありませんでした');

    			$$invalidate(0, hello_fetch_data = pre_result.message);
    		} catch(error) {
    			console.log(error);
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const get_POST_object = BODY_OBJ => {
    		return {
    			method: 'POST',
    			headers: { 'Content-Type': 'application/json' },
    			body: JSON.stringify(BODY_OBJ)
    		};
    	};

    	const response_handling = async RESPONSE => {
    		try {
    			// RESPONSE.status === 400 ? console.log('RESPONSE.status: RESPONSE.status === 400') : null;
    			RESPONSE.status === 200
    			? SUCCESS_MESSAGE = RESPONSE.result
    			: null;

    			RESPONSE.result === 'fail' || RESPONSE.status === 400
    			? (() => {
    					throw new Error(RESPONSE.message);
    				})()
    			: await fetch_hello({});
    		} catch(error) {
    			(() => {
    				throw new Error(error.message);
    			})();
    		}
    	};

    	// URLの配列の文字列から始まる場合はtrueを返す関数を1行で
    	const is_include_WHITE_LIST_URL = (target_url_str, WHITE_LIST_URL_ARRAY) => WHITE_LIST_URL_ARRAY.some(WHITE_LIST_URL => target_url_str.startsWith(WHITE_LIST_URL));

    	let hoge = null;

    	const fetch_insert_link = async () => {
    		try {
    			RESPONSE = await (await fetch(DOMAIN_NAME + 'insert_link', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				link: LINK
    			}))).json();

    			await response_handling(RESPONSE);
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const fetch_delete_link = async LINK_ID => {
    		try {
    			RESPONSE = await (await fetch(DOMAIN_NAME + 'delete_link', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				id: LINK_ID
    			}))).json();

    			await response_handling(RESPONSE);
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const fetch_like_increment_or_decrement = async LINK_ID => {
    		try {
    			RESPONSE = await (await fetch(DOMAIN_NAME + 'like_increment_or_decrement', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				link_id: LINK_ID
    			}))).json();

    			await response_handling(RESPONSE);
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const fetch_insert_comment = async Link_id => {
    		try {
    			RESPONSE = await (await fetch(DOMAIN_NAME + 'insert_comment', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				link_id: Link_id,
    				comment: COMMENT
    			}))).json();

    			await response_handling(RESPONSE);
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const fetch_delete_comment = async COMMENT_ID => {
    		try {
    			RESPONSE = await (await fetch(DOMAIN_NAME + 'delete_comment', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				comment_id: COMMENT_ID
    			}))).json();

    			await response_handling(RESPONSE);
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const fetch_insert_comment_reply = async Comment_id => {
    		try {
    			RESPONSE = await (await fetch(DOMAIN_NAME + 'insert_comment_reply', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				comment_id: Comment_id,
    				comment_reply: COMMENT_REPLY
    			}))).json();

    			await response_handling(RESPONSE);
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const fetch_delete_comment_reply = async Comment_reply_id => {
    		try {
    			RESPONSE = await (await fetch(DOMAIN_NAME + 'delete_comment_reply', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				comment_reply_id: Comment_reply_id
    			}))).json();

    			await response_handling(RESPONSE);
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const fetch_insert_tag = async (LINK_ID, TAG_PARAM) => {
    		try {
    			$$invalidate(6, TAG = TAG_PARAM || TAG_VAL.value);

    			RESPONSE = await (await fetch(DOMAIN_NAME + 'insert_tag', get_POST_object({
    				name: NAME,
    				password: PASSWORD,
    				link_id: LINK_ID,
    				tag: TAG
    			}))).json();

    			await response_handling(RESPONSE);
    		} catch(error) {
    			ERROR_MESSAGE = error.message;
    		}
    	};

    	const fetch_get_collect_value_for_test = async () => {
    		try {
    			const RESULT_OF_TEST = await (await fetch(DOMAIN_NAME + 'get_collect_value_for_test', get_POST_object({ name: NAME, password: PASSWORD }))).json();
    			COLLECT_VALUE = RESULT_OF_TEST.message;
    		} catch(error) {
    			console.log(error);
    		}
    	};

    	const fetch_get_tags_for_autocomplete = async () => {
    		const json = await (await fetch(DOMAIN_NAME + 'get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD }))).json();
    		const RES = await json;
    		$$invalidate(7, ALL_TAGS = await RES.message);
    	};

    	const remove_error_message = () => ERROR_MESSAGE = "";

    	// <button on:click={() => ORDER_BY_COLUMN === 'links.id' ? ORDER_BY_COLUMN = 'created_at' : ORDER_BY_COLUMN === 'created_at' ? ORDER_BY_COLUMN = 'updated_at' : ORDER_BY_COLUMN = 'links.id'}>ORDER_BY_COLUMN: {ORDER_BY_COLUMN}</button>
    	// const fetch_hello = async ({ORDER_BY_PARAM='DESC', ORDER_BY_COLUMN_PARAM='links.id', REQ_TAG_PARAM, USER_PARAM}) => {
    	const order_by_column_and_fetch_hello = async () => {
    		switch (true) {
    			case ORDER_BY_COLUMN === 'id':
    				$$invalidate(10, ORDER_BY_COLUMN = 'created_at');
    				break;
    			case ORDER_BY_COLUMN === 'created_at':
    				$$invalidate(10, ORDER_BY_COLUMN = 'updated_at');
    				break;
    			case ORDER_BY_COLUMN === 'updated_at':
    				$$invalidate(10, ORDER_BY_COLUMN = 'id');
    				break;
    			default:
    				$$invalidate(10, ORDER_BY_COLUMN = 'id');
    				break;
    		}

    		await fetch_hello({
    			ORDER_BY_PARAM: ORDER_BY,
    			ORDER_BY_COLUMN_PARAM: ORDER_BY_COLUMN,
    			REQ_TAG_PARAM: 'TEST'
    		});
    	};

    	const order_by_and_fetch_hello = async () => {
    		switch (true) {
    			case ORDER_BY === 'ASC':
    				$$invalidate(9, ORDER_BY = 'DESC');
    				break;
    			case ORDER_BY === 'DESC':
    				$$invalidate(9, ORDER_BY = 'ASC');
    				break;
    			default:
    				$$invalidate(10, ORDER_BY_COLUMN = 'DESC');
    				break;
    		}

    		await fetch_hello({
    			ORDER_BY_PARAM: ORDER_BY,
    			ORDER_BY_COLUMN_PARAM: ORDER_BY_COLUMN
    		}); // REQ_TAG_PARAM: 'TEST',
    	};

    	const req_tag_and_fetch_hello = async TAG => {
    		REQ_TAG = TAG;
    		await fetch_hello({ REQ_TAG_PARAM: REQ_TAG });
    	};

    	const user_and_fetch_hello = async USER => {
    		const USER_VAL = USER ? USER : 'user1';
    		await fetch_hello({ USER_PARAM: USER_VAL });
    	};

    	// onMount(fetch_hello({}));
    	onMount(async () => {
    		try {
    			await fetch_hello({});
    			await fetch_get_tags_for_autocomplete();
    		} catch(error) {
    			console.log(error);
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		NAME = this.value;
    		$$invalidate(1, NAME);
    	}

    	function input1_input_handler() {
    		PASSWORD = this.value;
    		$$invalidate(2, PASSWORD);
    	}

    	function input2_input_handler() {
    		LINK = this.value;
    		$$invalidate(3, LINK);
    	}

    	const click_handler = () => fetch_hello({});
    	const click_handler_1 = () => order_by_and_fetch_hello();
    	const click_handler_2 = () => order_by_column_and_fetch_hello();
    	const click_handler_3 = tags => req_tag_and_fetch_hello(tags.tag);

    	function input0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			TAG_VAL = $$value;
    			$$invalidate(8, TAG_VAL);
    		});
    	}

    	function input0_input_handler_1() {
    		TAG = this.value;
    		$$invalidate(6, TAG);
    	}

    	const click_handler_4 = item => user_and_fetch_hello(item.username);

    	function input1_input_handler_1() {
    		COMMENT = this.value;
    		$$invalidate(4, COMMENT);
    	}

    	const click_handler_5 = (comments_and_reply, INDEX) => user_and_fetch_hello(comments_and_reply[INDEX]['username']);

    	function input_input_handler() {
    		COMMENT_REPLY = this.value;
    		$$invalidate(5, COMMENT_REPLY);
    	}

    	const click_handler_6 = comment_reply => user_and_fetch_hello(comment_reply['username']);

    	$$self.$capture_state = () => ({
    		onMount,
    		afterUpdate,
    		hello_fetch_data,
    		NAME,
    		TEST_MODE,
    		PASSWORD,
    		LINK,
    		COMMENT,
    		COMMENT_REPLY,
    		TAG,
    		ALL_TAGS,
    		RESPONSE,
    		TAG_VAL,
    		WHITE_LIST_URL_ARRAY,
    		ORDER_BY,
    		ORDER_BY_COLUMN,
    		REQ_TAG,
    		USER,
    		ERROR_MESSAGE,
    		SUCCESS_MESSAGE,
    		ERROR_MESSAGE_STACK,
    		SUCCESS_MESSAGE_STACK,
    		COLLECT_VALUE,
    		DOMAIN_NAME,
    		toggle_footer,
    		test_db_init_only_set_name_password_test_mode,
    		test_db_init_on_start,
    		test_db_init_on_end,
    		message_stacker,
    		test_for_LINK,
    		test_for_TAG,
    		test_for_COMMENT,
    		test_for_COMMENT_REPLY,
    		test_for_LIKE_INCREMENT_OR_DECREMENT,
    		test_sample_exe,
    		test_sample_exe2,
    		test_sample_exe3,
    		test_sample_exe4,
    		test_sample_exe5,
    		fetch_hello,
    		get_POST_object,
    		response_handling,
    		is_include_WHITE_LIST_URL,
    		hoge,
    		fetch_insert_link,
    		fetch_delete_link,
    		fetch_like_increment_or_decrement,
    		fetch_insert_comment,
    		fetch_delete_comment,
    		fetch_insert_comment_reply,
    		fetch_delete_comment_reply,
    		fetch_insert_tag,
    		fetch_get_collect_value_for_test,
    		fetch_get_tags_for_autocomplete,
    		remove_error_message,
    		order_by_column_and_fetch_hello,
    		order_by_and_fetch_hello,
    		req_tag_and_fetch_hello,
    		user_and_fetch_hello
    	});

    	$$self.$inject_state = $$props => {
    		if ('hello_fetch_data' in $$props) $$invalidate(0, hello_fetch_data = $$props.hello_fetch_data);
    		if ('NAME' in $$props) $$invalidate(1, NAME = $$props.NAME);
    		if ('TEST_MODE' in $$props) TEST_MODE = $$props.TEST_MODE;
    		if ('PASSWORD' in $$props) $$invalidate(2, PASSWORD = $$props.PASSWORD);
    		if ('LINK' in $$props) $$invalidate(3, LINK = $$props.LINK);
    		if ('COMMENT' in $$props) $$invalidate(4, COMMENT = $$props.COMMENT);
    		if ('COMMENT_REPLY' in $$props) $$invalidate(5, COMMENT_REPLY = $$props.COMMENT_REPLY);
    		if ('TAG' in $$props) $$invalidate(6, TAG = $$props.TAG);
    		if ('ALL_TAGS' in $$props) $$invalidate(7, ALL_TAGS = $$props.ALL_TAGS);
    		if ('RESPONSE' in $$props) RESPONSE = $$props.RESPONSE;
    		if ('TAG_VAL' in $$props) $$invalidate(8, TAG_VAL = $$props.TAG_VAL);
    		if ('ORDER_BY' in $$props) $$invalidate(9, ORDER_BY = $$props.ORDER_BY);
    		if ('ORDER_BY_COLUMN' in $$props) $$invalidate(10, ORDER_BY_COLUMN = $$props.ORDER_BY_COLUMN);
    		if ('REQ_TAG' in $$props) REQ_TAG = $$props.REQ_TAG;
    		if ('USER' in $$props) USER = $$props.USER;
    		if ('ERROR_MESSAGE' in $$props) ERROR_MESSAGE = $$props.ERROR_MESSAGE;
    		if ('SUCCESS_MESSAGE' in $$props) SUCCESS_MESSAGE = $$props.SUCCESS_MESSAGE;
    		if ('ERROR_MESSAGE_STACK' in $$props) ERROR_MESSAGE_STACK = $$props.ERROR_MESSAGE_STACK;
    		if ('SUCCESS_MESSAGE_STACK' in $$props) SUCCESS_MESSAGE_STACK = $$props.SUCCESS_MESSAGE_STACK;
    		if ('COLLECT_VALUE' in $$props) COLLECT_VALUE = $$props.COLLECT_VALUE;
    		if ('DOMAIN_NAME' in $$props) DOMAIN_NAME = $$props.DOMAIN_NAME;
    		if ('hoge' in $$props) hoge = $$props.hoge;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		hello_fetch_data,
    		NAME,
    		PASSWORD,
    		LINK,
    		COMMENT,
    		COMMENT_REPLY,
    		TAG,
    		ALL_TAGS,
    		TAG_VAL,
    		ORDER_BY,
    		ORDER_BY_COLUMN,
    		toggle_footer,
    		fetch_hello,
    		fetch_insert_link,
    		fetch_delete_link,
    		fetch_like_increment_or_decrement,
    		fetch_insert_comment,
    		fetch_delete_comment,
    		fetch_insert_comment_reply,
    		fetch_delete_comment_reply,
    		fetch_insert_tag,
    		fetch_get_tags_for_autocomplete,
    		order_by_column_and_fetch_hello,
    		order_by_and_fetch_hello,
    		req_tag_and_fetch_hello,
    		user_and_fetch_hello,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		input0_binding,
    		input0_input_handler_1,
    		click_handler_4,
    		input1_input_handler_1,
    		click_handler_5,
    		input_input_handler,
    		click_handler_6
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	// props: {
    	// 	name: 'Taro!!'
    	// }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
