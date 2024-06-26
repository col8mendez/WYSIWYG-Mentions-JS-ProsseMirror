(() => {
  "use strict";
  var oculto = document.getElementById("hcampo");
  var selcmb = document.getElementById("cmbseleccionado");
  var dvoculto = document.getElementById("divclic");
  var dveditor ;

  var e = {
      717: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.agregarNodosListas = function (e, t, n) {
            return e.append({
              lista_ordenada: l(c, { content: "list_item+", group: n }),
              lista_vinietas: l(u, { content: "list_item+", group: n }),
              list_item: l(s.listItem, { content: t }),
            });
          }),
          (t.dividirElementoListaConMarcas = function (e) {
            return function (t, n) {
              return (0, s.splitListItem)(e)(
                t,
                n &&
                  function (e) {
                    var r =
                      t.storedMarks ||
                      (t.selection.$to.parentOffset &&
                        t.selection.$from.marks());
                    r && e.ensureMarks(r), n(e);
                  }
              );
            };
          }),
          (t.envolverEnLista = function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return function (n, r) {
              var o = n.selection,
                s = o.$from,
                l = o.$to,
                c = s.blockRange(l),
                u = !1,
                f = c;
              if (!c) return !1;
              if (
                c.depth >= 2 &&
                s.node(c.depth - 1).type.compatibleContent(e) &&
                0 == c.startIndex
              ) {
                if (0 == s.index(c.depth - 1)) return !1;
                var d = n.doc.resolve(c.start - 2);
                (f = new i.NodeRange(d, d, c.depth)),
                  c.endIndex < c.parent.childCount &&
                    (c = new i.NodeRange(
                      s,
                      n.doc.resolve(l.end(c.depth)),
                      c.depth
                    )),
                  (u = !0);
              }
              var p = (0, a.findWrapping)(f, e, t, c);
              return !!p && (r && r(h(n.tr, c, p, u, e).scrollIntoView()), !0);
            };
          }),
          (t.tipoListaVinietas =
            t.tipoListaOrdenada =
            t.listaVinietas =
            t.listaOrdenada =
              void 0);
        var r,
          o,
          i = n(443),
          s = n(32),
          a = n(843);
        function l(e, t) {
          var n = {};
          for (var r in e) n[r] = e[r];
          for (var o in t) n[o] = t[o];
          return n;
        }
        (t.tipoListaOrdenada = r),
          (function (e) {
            (e.arabigos = "1"),
              (e.romanosMinusculas = "i"),
              (e.romanosMayusculas = "I"),
              (e.alfabetoMinusculas = "a"),
              (e.alfabetoMayusculas = "A");
          })(r || (t.tipoListaOrdenada = r = {})),
          (t.tipoListaVinietas = o),
          (function (e) {
            (e.disco = "disc"), (e.circulo = "circle"), (e.cuadrado = "square");
          })(o || (t.tipoListaVinietas = o = {}));
        var c = {
          attrs: { order: { default: 1 }, tipo: { default: r.arabigos } },
          parseDOM: [
            {
              tag: "ol",
              getAttrs: function (e) {
                return {
                  order: e.hasAttribute("start") ? +e.getAttribute("start") : 1,
                  tipo: e.hasAttribute("type")
                    ? +e.getAttribute("type")
                    : r.arabigos,
                };
              },
            },
          ],
          toDOM: function (e) {
            return e.attrs.tipo == r.arabigos
              ? 1 == e.attrs.order
                ? ["ol", 0]
                : ["ol", { start: e.attrs.order }, 0]
              : 1 == e.attrs.order
              ? ["ol", { type: e.attrs.tipo }, 0]
              : ["ol", { type: e.attrs.tipo, start: e.attrs.order }, 0];
          },
        };
        t.listaOrdenada = c;
        var u = {
          attrs: { tipo: { default: o.circulo } },
          parseDOM: [
            {
              tag: "ul",
              getAttrs: function (e) {
                return {
                  tipo: e.hasAttribute("type")
                    ? +e.getAttribute("type")
                    : o.disco,
                };
              },
            },
          ],
          toDOM: function (e) {
            return ["ul", { type: e.attrs.tipo }, 0];
          },
        };
        function h(e, t, n, r, o) {
          for (var s = i.Fragment.empty, l = n.length - 1; l >= 0; l--)
            s = i.Fragment.from(n[l].type.create(n[l].attrs, s));
          e.step(
            new a.ReplaceAroundStep(
              t.start - (r ? 2 : 0),
              t.end,
              t.start,
              t.end,
              new i.Slice(s, 0, 0),
              n.length,
              !0
            )
          );
          for (var c = 0, u = 0; u < n.length; u++)
            n[u].type == o && (c = u + 1);
          for (
            var h = n.length - c,
              f = t.start + n.length - (r ? 2 : 0),
              d = t.parent,
              p = t.startIndex,
              m = t.endIndex,
              v = !0;
            p < m;
            p++, v = !1
          )
            !v && (0, a.canSplit)(e.doc, f, h) && (e.split(f, h), (f += 2 * h)),
              (f += d.child(p).nodeSize);
          return e;
        }
        t.listaVinietas = u;
      },
      141: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.crearPluginMenciones = function (e) {
            return (0, r.getMentionsPlugin)({
              getSuggestions: function (t, n, r) {
                setTimeout(function () {
                  "mention" === t && r([e]);
                }, 0);
              },
              getSuggestionsHTML: function (e, t) { //aqui se genera la lista de menciones
                // console.log(e.name);
                // console.log(e, "t: ",  t);
                return "mention" === t
                  ? (function (e) {
                    // console.log("e",e,"r",r);
                      return '<div id="dvmentions" class="suggestion-item-list">'.concat(
                        e[0].map(function (e) {
                          // console.log(e.name);
                            return '<div ' + 'id=' + e.id + ' class="suggestion-item">'.concat(
                              e.name,
                              "</div>"
                            );
                          })
                          .join(""),
                        "</div>"
                      );
                    })(e)
                  : "";
              },
            });
          });
        var r = n(750);
      },
      966: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.crearMenu = function (e) {
            var t = [
              p(e),
              (0, l.keymap)(y(e)),
              (0, l.keymap)({ Enter: w }),
              (0, l.keymap)(r.baseKeymap),
              (0, o.dropCursor)(),
              (0, i.gapCursor)(),
              (0, s.history)(),
            ];
            return t.push((0, c.menuBar)({ content: k(e) })), t;
          });
        var r = n(270),
          o = n(588),
          i = n(634),
          s = n(638),
          a = n(665),
          l = n(354),
          c = n(371),
          u = n(32),
          h = n(717),
          f = n(209),
          d =
            "undefined" != typeof navigator &&
            /Mac|iP(hone|[oa]d)/.test(navigator.platform);
        function p(e) {
          var t,
            n = a.smartQuotes.concat(a.ellipsis, a.emDash);
          return (
            (t = e.nodes.ordered_list) &&
              n.push(
                (function (e) {
                  return (0, a.wrappingInputRule)(
                    /^(\d+)\.\s$/,
                    e,
                    function (e) {
                      return { order: +e[1] };
                    },
                    function (e, t) {
                      return t.childCount + t.attrs.order == +e[1];
                    }
                  );
                })(t)
              ),
            (t = e.nodes.bullet_list) &&
              n.push(
                (function (e) {
                  return (0, a.wrappingInputRule)(/^\s*([-+*])\s$/, e);
                })(t)
              ),
            (0, a.inputRules)({ rules: n })
          );
        }
        function m(e, t, n, o) {
          // console.log("aquientra");
          var i = (0, r.toggleMark)(e, o),
            s = {
              active: function (t) {
                return (function (e, t) {
                  var n = e.selection,
                    r = n.from,
                    o = n.$from,
                    i = n.to;
                  // console.log(e.storedMarks);
                  return n.empty
                    ? !!t.isInSet(e.storedMarks || o.marks())
                    : e.doc.rangeHasMark(r, i, t);
                })(t, e);
              },
              enable: function (e) {
                return i(e);
              },
              icon: n,
              label: t,
              run: i,
              select: function (e) {
                return i(e);
              },
              title: t,
            };
          return new c.MenuItem(s);
        }
        function v(e, t, n, r) {
          var o = (0, h.envolverEnLista)(e, r),
            i = {
              enable: function (e) {
                return o(e);
              },
              icon: n,
              label: t,
              select: function (e) {
                return o(e);
              },
              title: t,
              run: o,
            };
          return new c.MenuItem(i);
        }
        function g(e, t) {
          return new c.Dropdown(t, { label: e, title: e });
        }
        function y(e) {
          var t = {};
          (t["Mod-z"] = s.undo),
            (t["Shift-Mod-z"] = s.redo),
            (t.Backspace = a.undoInputRule),
            d || (t["Mod-y"] = s.redo),
            (t["Alt-ArrowUp"] = r.joinUp),
            (t["Alt-ArrowDown"] = r.joinDown),
            (t["Mod-BracketLeft"] = r.lift),
            (t.Escape = r.selectParentNode),
            (t["Mod-b"] = (0, r.toggleMark)(e.marks.strong)),
            (t["Mod-B"] = (0, r.toggleMark)(e.marks.strong)),
            (t["Mod-i"] = (0, r.toggleMark)(e.marks.em)),
            (t["Mod-I"] = (0, r.toggleMark)(e.marks.em));
          var n = e.nodes.hard_break,
            o = (0, r.chainCommands)(r.exitCode, function (e, t) {
              return (
                t && t(e.tr.replaceSelectionWith(n.create()).scrollIntoView()),
                !0
              );
            });
          return (
            (t["Mod-Enter"] = o),
            (t["Shift-Enter"] = o),
            d && (t["Ctrl-Enter"] = o),
            (t.Enter = (0, h.dividirElementoListaConMarcas)(e.nodes.list_item)),
            (t.Tab = (0, u.sinkListItem)(e.nodes.list_item)),
            (t["Shift-Tab"] = (0, u.liftListItem)(e.nodes.list_item)),
            t
          );
        }
        function k(e) {
          return [
            [ //estos tamaños son eqiovalentes a los tamaños de letra en word
              g("Tamaño de fuente", [
                m(e.marks.tamanio_fuente, "1", void 0, { tamanioFuente: 1 }),
                m(e.marks.tamanio_fuente, "2", void 0, { tamanioFuente: 2 }),
                m(e.marks.tamanio_fuente, "3", void 0, { tamanioFuente: 3 }),
                m(e.marks.tamanio_fuente, "4", void 0, { tamanioFuente: 4 }),
                m(e.marks.tamanio_fuente, "5", void 0, { tamanioFuente: 5 }),
                m(e.marks.tamanio_fuente, "6", void 0, { tamanioFuente: 6 }),
                m(e.marks.tamanio_fuente, "7", void 0, { tamanioFuente: 7 }),
                m(e.marks.tamanio_fuente, "8", void 0, { tamanioFuente: 8 }),
                m(e.marks.tamanio_fuente, "9", void 0, { tamanioFuente: 9 }),
                m(e.marks.tamanio_fuente, "10", void 0, { tamanioFuente: 10 }),
                m(e.marks.tamanio_fuente, "11", void 0, { tamanioFuente: 11 }),
                m(e.marks.tamanio_fuente, "12", void 0, { tamanioFuente: 12 }),
                m(e.marks.tamanio_fuente, "13", void 0, { tamanioFuente: 13 }),
                m(e.marks.tamanio_fuente, "14", void 0, { tamanioFuente: 14 }),
                m(e.marks.tamanio_fuente, "15", void 0, { tamanioFuente: 15 }),
                m(e.marks.tamanio_fuente, "16", void 0, { tamanioFuente: 16 }),
                m(e.marks.tamanio_fuente, "17", void 0, { tamanioFuente: 17 }),
                m(e.marks.tamanio_fuente, "18", void 0, { tamanioFuente: 18 }),
                m(e.marks.tamanio_fuente, "19", void 0, { tamanioFuente: 19 }),
                m(e.marks.tamanio_fuente, "20", void 0, { tamanioFuente: 20 }),
              ]),
            ],
            [
              g("Tipo de fuente", [
                m(e.marks.tipo_fuente, "Arial", void 0, {
                  tipoFuente: f.tipoFuente.arial,
                }),            
                m(e.marks.tipo_fuente, "Candara", void 0, {
                  tipoFuente: f.tipoFuente.courierNew,
                }),
                m(e.marks.tipo_fuente, "Comic Sans MS", void 0, {
                  tipoFuente: f.tipoFuente.courierNew,
                }),
                
                m(e.marks.tipo_fuente, "Courier New", void 0, {
                  tipoFuente: f.tipoFuente.courierNew,
                }),
                m(e.marks.tipo_fuente, "Helvetica", void 0, {
                  tipoFuente: f.tipoFuente.Helvetica,
                }),
                m(e.marks.tipo_fuente, "Times New Roman", void 0, {
                  tipoFuente: f.tipoFuente.timesNewRoman,
                }),
              ]),
            ],
            [
              m(e.marks.strong, "Negrita", c.icons.strong),
              m(e.marks.em, "Cursiva", c.icons.em),  
                          
            ],
            [
              g("Listas numeradas", [
                v(e.nodes.lista_ordenada, "Números arábigos", void 0, {
                  tipo: h.tipoListaOrdenada.arabigos,
                }),
                v(
                  e.nodes.lista_ordenada,
                  "Números romanos en mayúsculas",
                  void 0,
                  { tipo: h.tipoListaOrdenada.romanosMayusculas }
                ),
                v(
                  e.nodes.lista_ordenada,
                  "Números romanos en minúsculas",
                  void 0,
                  { tipo: h.tipoListaOrdenada.romanosMinusculas }
                ),
                v(e.nodes.lista_ordenada, "Alfabético en mayúsculas", void 0, {
                  tipo: h.tipoListaOrdenada.alfabetoMayusculas,
                }),
                v(e.nodes.lista_ordenada, "Alfabético en minúsculas", void 0, {
                  tipo: h.tipoListaOrdenada.alfabetoMinusculas,
                }),
              ]),
            ],
            [
              g("Viñetas", [
                v(e.nodes.lista_vinietas, "Disco", void 0, {
                  tipo: h.tipoListaVinietas.disco,
                }),
                v(e.nodes.lista_vinietas, "Círculo", void 0, {
                  tipo: h.tipoListaVinietas.circulo,
                }),
                v(e.nodes.lista_vinietas, "Cuadrado", void 0, {
                  tipo: h.tipoListaVinietas.cuadrado,
                }),
              ]),
            ],
            [],
          ];
        }
        function w(e, t, n) {
          return (
            (0, r.chainCommands)(
              r.newlineInCode,
              r.createParagraphNear,
              r.liftEmptyBlock,
              r.splitBlockKeepMarks
            )(e, t, n),
            !0
          );
        }
      },
      394: (e, t) => {
        // console.log(e,t);
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.agregarMarcaTamanioFuente = function (e) {
            return e.append({
              tamanio_fuente: {
                attrs: { tamanioFuente: {} },
                toDOM: function (e) {
                  return [
                    "span",
                    {
                      style: "font-size: ".concat(e.attrs.tamanioFuente, "pt;"),
                    },
                    0,
                  ];
                },
              },
            });
          });
      },
      209: (e, t) => {
        var n;
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.agregarMarcaTipoFuente = function (e) {
            return e.append({
              tipo_fuente: {
                attrs: { tipoFuente: {} },
                toDOM: function (e) {
                  return [
                    "span",
                    { style: "font-family: ".concat(e.attrs.tipoFuente, ";") },
                    0,
                  ];
                },
              },
            });
          }),
          (t.tipoFuente = void 0),
          (t.tipoFuente = n),
          (function (e) {
            (e.arial = '"Arial"'),
              (e.Helvetica = '"Helvetica"'),
              (e.sansserif = '"sans-serif"'),
              (e.timesNewRoman = '"Times New Roman"'),
              (e.courierNew = '"Courier New"'),
              (e.LucidaConsole = '"Lucida Console"'),
              (e.monospace = '"monospace"');
          })(n || (t.tipoFuente = n = {}));
      },
      41: (e, t, n) => {
        n.d(t, { Z: () => a });
        var r = n(81),
          o = n.n(r),
          i = n(645),
          s = n.n(i)()(o());
        s.push([
          e.id,
          '/* Add space around the hr to make clicking it easier */\n\n.ProseMirror-example-setup-style hr {\n  padding: 2px 10px;\n  border: none;\n  margin: 1em 0;\n}\n\n.ProseMirror-example-setup-style hr:after {\n  content: "";\n  display: block;\n  height: 1px;\n  background-color: silver;\n  line-height: 2px;\n}\n\n.ProseMirror ul, .ProseMirror ol {\n  padding-left: 30px;\n}\n\n.ProseMirror blockquote {\n  padding-left: 1em;\n  border-left: 3px solid #eee;\n  margin-left: 0; margin-right: 0;\n}\n\n.ProseMirror-example-setup-style img {\n  cursor: default;\n}\n\n.ProseMirror-prompt {\n  background: white;\n  padding: 5px 10px 5px 15px;\n  border: 1px solid silver;\n  position: fixed;\n  border-radius: 3px;\n  z-index: 11;\n  box-shadow: -.5px 2px 5px rgba(0, 0, 0, .2);\n}\n\n.ProseMirror-prompt h5 {\n  margin: 0;\n  font-weight: normal;\n  font-size: 100%;\n  color: #444;\n}\n\n.ProseMirror-prompt input[type="text"],\n.ProseMirror-prompt textarea {\n  background: #eee;\n  border: none;\n  outline: none;\n}\n\n.ProseMirror-prompt input[type="text"] {\n  padding: 0 4px;\n}\n\n.ProseMirror-prompt-close {\n  position: absolute;\n  left: 2px; top: 1px;\n  color: #666;\n  border: none; background: transparent; padding: 0;\n}\n\n.ProseMirror-prompt-close:after {\n  content: "✕";\n  font-size: 12px;\n}\n\n.ProseMirror-invalid {\n  background: #ffc;\n  border: 1px solid #cc7;\n  border-radius: 4px;\n  padding: 5px 10px;\n  position: absolute;\n  min-width: 10em;\n}\n\n.ProseMirror-prompt-buttons {\n  margin-top: 5px;\n  display: none;\n}\n',
          "",
        ]);
        const a = s;
      },
      210: (e, t, n) => {
        n.d(t, { Z: () => a });
        var r = n(81),
          o = n.n(r),
          i = n(645),
          s = n.n(i)()(o());
        s.push([
          e.id,
          '.ProseMirror-textblock-dropdown {\n  min-width: 3em;\n}\n\n.ProseMirror-menu {\n  margin: 0 -4px;\n  line-height: 1;\n}\n\n.ProseMirror-tooltip .ProseMirror-menu {\n  width: -webkit-fit-content;\n  width: fit-content;\n  white-space: pre;\n}\n\n.ProseMirror-menuitem {\n  margin-right: 3px;\n  display: inline-block;\n}\n\n.ProseMirror-menuseparator {\n  border-right: 1px solid #ddd;\n  margin-right: 3px;\n}\n\n.ProseMirror-menu-dropdown, .ProseMirror-menu-dropdown-menu {\n  font-size: 90%;\n white-space: break-space;\n}\n\n.ProseMirror-menu-dropdown {\n  vertical-align: 1px;\n  cursor: pointer;\n  position: relative;\n padding-right: 15px;\n}\n\n.ProseMirror-menu-dropdown-wrap {\n  padding: 1px 0 1px 4px;\n  display: inline-block;\n  position: relative;\n}\n\n.ProseMirror-menu-dropdown:after {\n  content: "";\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-top: 4px solid currentColor;\n  opacity: .6;\n  position: absolute;\n  right: 4px;\n  top: calc(50% - 2px);\n}\n\n.ProseMirror-menu-dropdown-menu, .ProseMirror-menu-submenu {\n  position: absolute;\n  background: white;\n  color: #666;\n  border: 1px solid #aaa;\n  padding: 2px;\n}\n\n.ProseMirror-menu-dropdown-menu {\n  z-index: 15;\n  min-width: 6em;\n \n height: 40vh; \n overflow-y: auto; \n overflow-x: hidden; \n border-radius: 5px; \n}\n\n.ProseMirror-menu-dropdown-item {\n  cursor: pointer;\n  padding: 2px 8px 2px 4px;\n border-bottom: 1px solid; \n border-image: linear-gradient(to right, white,  #2c6787, white); \n border-image-slice: 1; width:100px;}\n\n.ProseMirror-menu-dropdown-item:hover {\n  background: #049de0; \n border-radius: 5px; color: #fff;\n}\n\n.ProseMirror-menu-submenu-wrap {\n  position: relative;\n  margin-right: -4px;\n}\n\n.ProseMirror-menu-submenu-label:after {\n  content: "";\n  border-top: 4px solid transparent;\n  border-bottom: 4px solid transparent;\n  border-left: 4px solid currentColor;\n  opacity: .6;\n  position: absolute;\n  right: 4px;\n  top: calc(50% - 4px);\n}\n\n.ProseMirror-menu-submenu {\n  display: none;\n  min-width: 4em;\n  left: 100%;\n  top: -3px;\n}\n\n.ProseMirror-menu-active {\n  background: #51c8f8;\n color:#fff; \n  border-radius: 4px;\n}\n\n.ProseMirror-menu-disabled {\n  opacity: .3;\n}\n\n.ProseMirror-menu-submenu-wrap:hover .ProseMirror-menu-submenu, .ProseMirror-menu-submenu-wrap-active .ProseMirror-menu-submenu {\n  display: block;\n}\n\n.ProseMirror-menubar {\n border-radius: 5px; padding: 5px; \n  position: relative;\n  min-height: 1em;\n  color: #666;\n  top: 0; left: 0; right: 0;\n  border-bottom: 1px solid silver;\n  background: white;\n  z-index: 10;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: visible;\n}\n\n.ProseMirror-icon {\n  display: inline-block;\n  line-height: .8;\n  vertical-align: -2px; /* Compensate for padding */\n  padding: 2px 8px;\n  cursor: pointer;\n}\n\n.ProseMirror-menu-disabled.ProseMirror-icon {\n  cursor: default;\n}\n\n.ProseMirror-icon svg {\n  fill: currentColor;\n  height: 1em;\n}\n\n.ProseMirror-icon span {\n  vertical-align: text-top;\n}\n',
          "",
        ]);
        const a = s;
      },
      363: (e, t, n) => {
        n.d(t, { Z: () => a });
        var r = n(81),
          o = n.n(r),
          i = n(645),
          s = n.n(i)()(o());
        s.push([
          e.id,
          '.ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: "liga" 0; /* the above doesn\'t seem to work in Edge */\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\n.ProseMirror li {\n  position: relative;\n}\n\n.ProseMirror-hideselection *::selection { background: transparent; }\n.ProseMirror-hideselection *::-moz-selection { background: transparent; }\n.ProseMirror-hideselection { caret-color: transparent; }\n\n.ProseMirror-selectednode {\n  outline: 2px solid #8cf;\n}\n\n/* Make sure li selections wrap around markers */\n\nli.ProseMirror-selectednode {\n  outline: none;\n}\n\nli.ProseMirror-selectednode:after {\n  content: "";\n  position: absolute;\n  left: -32px;\n  right: -2px; top: -2px; bottom: -2px;\n  border: 2px solid #8cf;\n  pointer-events: none;\n}\n\n/* Protect against generic img rules */\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n}\n',
          "",
        ]);
        const a = s;
      },
      645: (e) => {
        e.exports = function (e) {
          var t = [];
          return (
            (t.toString = function () {
              return this.map(function (t) {
                var n = "",
                  r = void 0 !== t[5];
                return (
                  t[4] && (n += "@supports (".concat(t[4], ") {")),
                  t[2] && (n += "@media ".concat(t[2], " {")),
                  r &&
                    (n += "@layer".concat(
                      t[5].length > 0 ? " ".concat(t[5]) : "",
                      " {"
                    )),
                  (n += e(t)),
                  r && (n += "}"),
                  t[2] && (n += "}"),
                  t[4] && (n += "}"),
                  n
                );
              }).join("");
            }),
            (t.i = function (e, n, r, o, i) {
              "string" == typeof e && (e = [[null, e, void 0]]);
              var s = {};
              if (r)
                for (var a = 0; a < this.length; a++) {
                  var l = this[a][0];
                  null != l && (s[l] = !0);
                }
              for (var c = 0; c < e.length; c++) {
                var u = [].concat(e[c]);
                (r && s[u[0]]) ||
                  (void 0 !== i &&
                    (void 0 === u[5] ||
                      (u[1] = "@layer"
                        .concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {")
                        .concat(u[1], "}")),
                    (u[5] = i)),
                  n &&
                    (u[2]
                      ? ((u[1] = "@media "
                          .concat(u[2], " {")
                          .concat(u[1], "}")),
                        (u[2] = n))
                      : (u[2] = n)),
                  o &&
                    (u[4]
                      ? ((u[1] = "@supports ("
                          .concat(u[4], ") {")
                          .concat(u[1], "}")),
                        (u[4] = o))
                      : (u[4] = "".concat(o))),
                  t.push(u));
              }
            }),
            t
          );
        };
      },
      81: (e) => {
        e.exports = function (e) {
          return e[1];
        };
      },
      750: (e, t, n) => {
        function r(e, t, n) {
          for (let o = 0; ; o++) {
            if (o == e.childCount || o == t.childCount)
              return e.childCount == t.childCount ? null : n;
            let i = e.child(o),
              s = t.child(o);
            if (i != s) {
              if (!i.sameMarkup(s)) return n;
              if (i.isText && i.text != s.text) {
                for (let e = 0; i.text[e] == s.text[e]; e++) n++;
                return n;
              }
              if (i.content.size || s.content.size) {
                let e = r(i.content, s.content, n + 1);
                if (null != e) return e;
              }
              n += i.nodeSize;
            } else n += i.nodeSize;
          }
        }
        function o(e, t, n, r) {
          for (let i = e.childCount, s = t.childCount; ; ) {
            if (0 == i || 0 == s) return i == s ? null : { a: n, b: r };
            let a = e.child(--i),
              l = t.child(--s),
              c = a.nodeSize;
            if (a != l) {
              if (!a.sameMarkup(l)) return { a: n, b: r };
              if (a.isText && a.text != l.text) {
                let e = 0,
                  t = Math.min(a.text.length, l.text.length);
                for (
                  ;
                  e < t &&
                  a.text[a.text.length - e - 1] ==
                    l.text[l.text.length - e - 1];

                )
                  e++, n--, r--;
                return { a: n, b: r };
              }
              if (a.content.size || l.content.size) {
                let e = o(a.content, l.content, n - 1, r - 1);
                if (e) return e;
              }
              (n -= c), (r -= c);
            } else (n -= c), (r -= c);
          }
        }
        n.r(t),
          n.d(t, {
            addMentionNodes: () => Nn,
            addTagNodes: () => Tn,
            getMentionsPlugin: () => Mn,
            mentionNode: () => On,
            tagNode: () => Cn,
          });
        class i {
          constructor(e, t) {
            if (((this.content = e), (this.size = t || 0), null == t))
              for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize;
          }
          nodesBetween(e, t, n, r = 0, o) {
            for (let i = 0, s = 0; s < t; i++) {
              let a = this.content[i],
                l = s + a.nodeSize;
              if (l > e && !1 !== n(a, r + s, o || null, i) && a.content.size) {
                let o = s + 1;
                a.nodesBetween(
                  Math.max(0, e - o),
                  Math.min(a.content.size, t - o),
                  n,
                  r + o
                );
              }
              s = l;
            }
          }
          descendants(e) {
            this.nodesBetween(0, this.size, e);
          }
          textBetween(e, t, n, r) {
            let o = "",
              i = !0;
            return (
              this.nodesBetween(
                e,
                t,
                (s, a) => {
                  s.isText
                    ? ((o += s.text.slice(Math.max(e, a) - a, t - a)), (i = !n))
                    : s.isLeaf
                    ? (r
                        ? (o += "function" == typeof r ? r(s) : r)
                        : s.type.spec.leafText &&
                          (o += s.type.spec.leafText(s)),
                      (i = !n))
                    : !i && s.isBlock && ((o += n), (i = !0));
                },
                0
              ),
              o
            );
          }
          append(e) {
            if (!e.size) return this;
            if (!this.size) return e;
            let t = this.lastChild,
              n = e.firstChild,
              r = this.content.slice(),
              o = 0;
            for (
              t.isText &&
              t.sameMarkup(n) &&
              ((r[r.length - 1] = t.withText(t.text + n.text)), (o = 1));
              o < e.content.length;
              o++
            )
              r.push(e.content[o]);
            return new i(r, this.size + e.size);
          }
          cut(e, t = this.size) {
            if (0 == e && t == this.size) return this;
            let n = [],
              r = 0;
            if (t > e)
              for (let o = 0, i = 0; i < t; o++) {
                let s = this.content[o],
                  a = i + s.nodeSize;
                a > e &&
                  ((i < e || a > t) &&
                    (s = s.isText
                      ? s.cut(
                          Math.max(0, e - i),
                          Math.min(s.text.length, t - i)
                        )
                      : s.cut(
                          Math.max(0, e - i - 1),
                          Math.min(s.content.size, t - i - 1)
                        )),
                  n.push(s),
                  (r += s.nodeSize)),
                  (i = a);
              }
            return new i(n, r);
          }
          cutByIndex(e, t) {
            return e == t
              ? i.empty
              : 0 == e && t == this.content.length
              ? this
              : new i(this.content.slice(e, t));
          }
          replaceChild(e, t) {
            let n = this.content[e];
            if (n == t) return this;
            let r = this.content.slice(),
              o = this.size + t.nodeSize - n.nodeSize;
            return (r[e] = t), new i(r, o);
          }
          addToStart(e) {
            return new i([e].concat(this.content), this.size + e.nodeSize);
          }
          addToEnd(e) {
            return new i(this.content.concat(e), this.size + e.nodeSize);
          }
          eq(e) {
            if (this.content.length != e.content.length) return !1;
            for (let t = 0; t < this.content.length; t++)
              if (!this.content[t].eq(e.content[t])) return !1;
            return !0;
          }
          get firstChild() {
            return this.content.length ? this.content[0] : null;
          }
          get lastChild() {
            return this.content.length
              ? this.content[this.content.length - 1]
              : null;
          }
          get childCount() {
            return this.content.length;
          }
          child(e) {
            let t = this.content[e];
            if (!t)
              throw new RangeError("Index " + e + " out of range for " + this);
            return t;
          }
          maybeChild(e) {
            return this.content[e] || null;
          }
          forEach(e) {
            for (let t = 0, n = 0; t < this.content.length; t++) {
              let r = this.content[t];
              e(r, n, t), (n += r.nodeSize);
            }
          }
          findDiffStart(e, t = 0) {
            return r(this, e, t);
          }
          findDiffEnd(e, t = this.size, n = e.size) {
            return o(this, e, t, n);
          }
          findIndex(e, t = -1) {
            if (0 == e) return a(0, e);
            if (e == this.size) return a(this.content.length, e);
            if (e > this.size || e < 0)
              throw new RangeError(
                `Position ${e} outside of fragment (${this})`
              );
            for (let n = 0, r = 0; ; n++) {
              let o = r + this.child(n).nodeSize;
              if (o >= e) return o == e || t > 0 ? a(n + 1, o) : a(n, r);
              r = o;
            }
          }
          toString() {
            return "<" + this.toStringInner() + ">";
          }
          toStringInner() {
            return this.content.join(", ");
          }
          toJSON() {
            return this.content.length
              ? this.content.map((e) => e.toJSON())
              : null;
          }
          static fromJSON(e, t) {
            if (!t) return i.empty;
            if (!Array.isArray(t))
              throw new RangeError("Invalid input for Fragment.fromJSON");
            return new i(t.map(e.nodeFromJSON));
          }
          static fromArray(e) {
            if (!e.length) return i.empty;
            let t,
              n = 0;
            for (let r = 0; r < e.length; r++) {
              let o = e[r];
              (n += o.nodeSize),
                r && o.isText && e[r - 1].sameMarkup(o)
                  ? (t || (t = e.slice(0, r)),
                    (t[t.length - 1] = o.withText(
                      t[t.length - 1].text + o.text
                    )))
                  : t && t.push(o);
            }
            return new i(t || e, n);
          }
          static from(e) {
            if (!e) return i.empty;
            if (e instanceof i) return e;
            if (Array.isArray(e)) return this.fromArray(e);
            if (e.attrs) return new i([e], e.nodeSize);
            throw new RangeError(
              "Can not convert " +
                e +
                " to a Fragment" +
                (e.nodesBetween
                  ? " (looks like multiple versions of prosemirror-model were loaded)"
                  : "")
            );
          }
        }
        i.empty = new i([], 0);
        const s = { index: 0, offset: 0 };
        function a(e, t) {
          return (s.index = e), (s.offset = t), s;
        }
        function l(e, t) {
          if (e === t) return !0;
          if (!e || "object" != typeof e || !t || "object" != typeof t)
            return !1;
          let n = Array.isArray(e);
          if (Array.isArray(t) != n) return !1;
          if (n) {
            if (e.length != t.length) return !1;
            for (let n = 0; n < e.length; n++) if (!l(e[n], t[n])) return !1;
          } else {
            for (let n in e) if (!(n in t) || !l(e[n], t[n])) return !1;
            for (let n in t) if (!(n in e)) return !1;
          }
          return !0;
        }
        class c {
          constructor(e, t) {
            (this.type = e), (this.attrs = t);
          }
          addToSet(e) {
            let t,
              n = !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r];
              if (this.eq(o)) return e;
              if (this.type.excludes(o.type)) t || (t = e.slice(0, r));
              else {
                if (o.type.excludes(this.type)) return e;
                !n &&
                  o.type.rank > this.type.rank &&
                  (t || (t = e.slice(0, r)), t.push(this), (n = !0)),
                  t && t.push(o);
              }
            }
            return t || (t = e.slice()), n || t.push(this), t;
          }
          removeFromSet(e) {
            for (let t = 0; t < e.length; t++)
              if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
            return e;
          }
          isInSet(e) {
            for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return !0;
            return !1;
          }
          eq(e) {
            return this == e || (this.type == e.type && l(this.attrs, e.attrs));
          }
          toJSON() {
            let e = { type: this.type.name };
            for (let t in this.attrs) {
              e.attrs = this.attrs;
              break;
            }
            return e;
          }
          static fromJSON(e, t) {
            if (!t) throw new RangeError("Invalid input for Mark.fromJSON");
            let n = e.marks[t.type];
            if (!n)
              throw new RangeError(
                `There is no mark type ${t.type} in this schema`
              );
            return n.create(t.attrs);
          }
          static sameSet(e, t) {
            if (e == t) return !0;
            if (e.length != t.length) return !1;
            for (let n = 0; n < e.length; n++) if (!e[n].eq(t[n])) return !1;
            return !0;
          }
          static setFrom(e) {
            if (!e || (Array.isArray(e) && 0 == e.length)) return c.none;
            if (e instanceof c) return [e];
            let t = e.slice();
            return t.sort((e, t) => e.type.rank - t.type.rank), t;
          }
        }
        c.none = [];
        class u extends Error {}
        class h {
          constructor(e, t, n) {
            (this.content = e), (this.openStart = t), (this.openEnd = n);
          }
          get size() {
            return this.content.size - this.openStart - this.openEnd;
          }
          insertAt(e, t) {
            let n = d(this.content, e + this.openStart, t);
            return n && new h(n, this.openStart, this.openEnd);
          }
          removeBetween(e, t) {
            return new h(
              f(this.content, e + this.openStart, t + this.openStart),
              this.openStart,
              this.openEnd
            );
          }
          eq(e) {
            return (
              this.content.eq(e.content) &&
              this.openStart == e.openStart &&
              this.openEnd == e.openEnd
            );
          }
          toString() {
            return (
              this.content + "(" + this.openStart + "," + this.openEnd + ")"
            );
          }
          toJSON() {
            if (!this.content.size) return null;
            let e = { content: this.content.toJSON() };
            return (
              this.openStart > 0 && (e.openStart = this.openStart),
              this.openEnd > 0 && (e.openEnd = this.openEnd),
              e
            );
          }
          static fromJSON(e, t) {
            if (!t) return h.empty;
            let n = t.openStart || 0,
              r = t.openEnd || 0;
            if ("number" != typeof n || "number" != typeof r)
              throw new RangeError("Invalid input for Slice.fromJSON");
            return new h(i.fromJSON(e, t.content), n, r);
          }
          static maxOpen(e, t = !0) {
            let n = 0,
              r = 0;
            for (
              let r = e.firstChild;
              r && !r.isLeaf && (t || !r.type.spec.isolating);
              r = r.firstChild
            )
              n++;
            for (
              let n = e.lastChild;
              n && !n.isLeaf && (t || !n.type.spec.isolating);
              n = n.lastChild
            )
              r++;
            return new h(e, n, r);
          }
        }
        function f(e, t, n) {
          let { index: r, offset: o } = e.findIndex(t),
            i = e.maybeChild(r),
            { index: s, offset: a } = e.findIndex(n);
          if (o == t || i.isText) {
            if (a != n && !e.child(s).isText)
              throw new RangeError("Removing non-flat range");
            return e.cut(0, t).append(e.cut(n));
          }
          if (r != s) throw new RangeError("Removing non-flat range");
          return e.replaceChild(r, i.copy(f(i.content, t - o - 1, n - o - 1)));
        }
        function d(e, t, n, r) {
          let { index: o, offset: i } = e.findIndex(t),
            s = e.maybeChild(o);
          if (i == t || s.isText)
            return r && !r.canReplace(o, o, n)
              ? null
              : e.cut(0, t).append(n).append(e.cut(t));
          let a = d(s.content, t - i - 1, n);
          return a && e.replaceChild(o, s.copy(a));
        }
        function p(e, t, n) {
          if (n.openStart > e.depth)
            throw new u("Inserted content deeper than insertion position");
          if (e.depth - n.openStart != t.depth - n.openEnd)
            throw new u("Inconsistent open depths");
          return m(e, t, n, 0);
        }
        function m(e, t, n, r) {
          let o = e.index(r),
            s = e.node(r);
          if (o == t.index(r) && r < e.depth - n.openStart) {
            let i = m(e, t, n, r + 1);
            return s.copy(s.content.replaceChild(o, i));
          }
          if (n.content.size) {
            if (n.openStart || n.openEnd || e.depth != r || t.depth != r) {
              let { start: o, end: a } = (function (e, t) {
                let n = t.depth - e.openStart,
                  r = t.node(n).copy(e.content);
                for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(i.from(r));
                return {
                  start: r.resolveNoCache(e.openStart + n),
                  end: r.resolveNoCache(r.content.size - e.openEnd - n),
                };
              })(n, e);
              return w(s, b(e, o, a, t, r));
            }
            {
              let r = e.parent,
                o = r.content;
              return w(
                r,
                o
                  .cut(0, e.parentOffset)
                  .append(n.content)
                  .append(o.cut(t.parentOffset))
              );
            }
          }
          return w(s, S(e, t, r));
        }
        function v(e, t) {
          if (!t.type.compatibleContent(e.type))
            throw new u("Cannot join " + t.type.name + " onto " + e.type.name);
        }
        function g(e, t, n) {
          let r = e.node(n);
          return v(r, t.node(n)), r;
        }
        function y(e, t) {
          let n = t.length - 1;
          n >= 0 && e.isText && e.sameMarkup(t[n])
            ? (t[n] = e.withText(t[n].text + e.text))
            : t.push(e);
        }
        function k(e, t, n, r) {
          let o = (t || e).node(n),
            i = 0,
            s = t ? t.index(n) : o.childCount;
          e &&
            ((i = e.index(n)),
            e.depth > n ? i++ : e.textOffset && (y(e.nodeAfter, r), i++));
          for (let e = i; e < s; e++) y(o.child(e), r);
          t && t.depth == n && t.textOffset && y(t.nodeBefore, r);
        }
        function w(e, t) {
          return e.type.checkContent(t), e.copy(t);
        }
        function b(e, t, n, r, o) {
          let s = e.depth > o && g(e, t, o + 1),
            a = r.depth > o && g(n, r, o + 1),
            l = [];
          return (
            k(null, e, o, l),
            s && a && t.index(o) == n.index(o)
              ? (v(s, a), y(w(s, b(e, t, n, r, o + 1)), l))
              : (s && y(w(s, S(e, t, o + 1)), l),
                k(t, n, o, l),
                a && y(w(a, S(n, r, o + 1)), l)),
            k(r, null, o, l),
            new i(l)
          );
        }
        function S(e, t, n) {
          let r = [];
          return (
            k(null, e, n, r),
            e.depth > n && y(w(g(e, t, n + 1), S(e, t, n + 1)), r),
            k(t, null, n, r),
            new i(r)
          );
        }
        h.empty = new h(i.empty, 0, 0);
        class x {
          constructor(e, t, n) {
            (this.pos = e),
              (this.path = t),
              (this.parentOffset = n),
              (this.depth = t.length / 3 - 1);
          }
          resolveDepth(e) {
            return null == e ? this.depth : e < 0 ? this.depth + e : e;
          }
          get parent() {
            return this.node(this.depth);
          }
          get doc() {
            return this.node(0);
          }
          node(e) {
            return this.path[3 * this.resolveDepth(e)];
          }
          index(e) {
            return this.path[3 * this.resolveDepth(e) + 1];
          }
          indexAfter(e) {
            return (
              (e = this.resolveDepth(e)),
              this.index(e) + (e != this.depth || this.textOffset ? 1 : 0)
            );
          }
          start(e) {
            return 0 == (e = this.resolveDepth(e))
              ? 0
              : this.path[3 * e - 1] + 1;
          }
          end(e) {
            return (
              (e = this.resolveDepth(e)),
              this.start(e) + this.node(e).content.size
            );
          }
          before(e) {
            if (!(e = this.resolveDepth(e)))
              throw new RangeError(
                "There is no position before the top-level node"
              );
            return e == this.depth + 1 ? this.pos : this.path[3 * e - 1];
          }
          after(e) {
            if (!(e = this.resolveDepth(e)))
              throw new RangeError(
                "There is no position after the top-level node"
              );
            return e == this.depth + 1
              ? this.pos
              : this.path[3 * e - 1] + this.path[3 * e].nodeSize;
          }
          get textOffset() {
            return this.pos - this.path[this.path.length - 1];
          }
          get nodeAfter() {
            let e = this.parent,
              t = this.index(this.depth);
            if (t == e.childCount) return null;
            let n = this.pos - this.path[this.path.length - 1],
              r = e.child(t);
            return n ? e.child(t).cut(n) : r;
          }
          get nodeBefore() {
            let e = this.index(this.depth),
              t = this.pos - this.path[this.path.length - 1];
            return t
              ? this.parent.child(e).cut(0, t)
              : 0 == e
              ? null
              : this.parent.child(e - 1);
          }
          posAtIndex(e, t) {
            t = this.resolveDepth(t);
            let n = this.path[3 * t],
              r = 0 == t ? 0 : this.path[3 * t - 1] + 1;
            for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
            return r;
          }
          marks() {
            let e = this.parent,
              t = this.index();
            if (0 == e.content.size) return c.none;
            if (this.textOffset) return e.child(t).marks;
            let n = e.maybeChild(t - 1),
              r = e.maybeChild(t);
            if (!n) {
              let e = n;
              (n = r), (r = e);
            }
            let o = n.marks;
            for (var i = 0; i < o.length; i++)
              !1 !== o[i].type.spec.inclusive ||
                (r && o[i].isInSet(r.marks)) ||
                (o = o[i--].removeFromSet(o));
            return o;
          }
          marksAcross(e) {
            let t = this.parent.maybeChild(this.index());
            if (!t || !t.isInline) return null;
            let n = t.marks,
              r = e.parent.maybeChild(e.index());
            for (var o = 0; o < n.length; o++)
              !1 !== n[o].type.spec.inclusive ||
                (r && n[o].isInSet(r.marks)) ||
                (n = n[o--].removeFromSet(n));
            return n;
          }
          sharedDepth(e) {
            for (let t = this.depth; t > 0; t--)
              if (this.start(t) <= e && this.end(t) >= e) return t;
            return 0;
          }
          blockRange(e = this, t) {
            if (e.pos < this.pos) return e.blockRange(this);
            for (
              let n =
                this.depth -
                (this.parent.inlineContent || this.pos == e.pos ? 1 : 0);
              n >= 0;
              n--
            )
              if (e.pos <= this.end(n) && (!t || t(this.node(n))))
                return new N(this, e, n);
            return null;
          }
          sameParent(e) {
            return this.pos - this.parentOffset == e.pos - e.parentOffset;
          }
          max(e) {
            return e.pos > this.pos ? e : this;
          }
          min(e) {
            return e.pos < this.pos ? e : this;
          }
          toString() {
            let e = "";
            for (let t = 1; t <= this.depth; t++)
              e +=
                (e ? "/" : "") +
                this.node(t).type.name +
                "_" +
                this.index(t - 1);
            return e + ":" + this.parentOffset;
          }
          static resolve(e, t) {
            if (!(t >= 0 && t <= e.content.size))
              throw new RangeError("Position " + t + " out of range");
            let n = [],
              r = 0,
              o = t;
            for (let t = e; ; ) {
              let { index: e, offset: i } = t.content.findIndex(o),
                s = o - i;
              if ((n.push(t, e, r + i), !s)) break;
              if (((t = t.child(e)), t.isText)) break;
              (o = s - 1), (r += i + 1);
            }
            return new x(t, n, o);
          }
          static resolveCached(e, t) {
            for (let n = 0; n < M.length; n++) {
              let r = M[n];
              if (r.pos == t && r.doc == e) return r;
            }
            let n = (M[O] = x.resolve(e, t));
            return (O = (O + 1) % C), n;
          }
        }
        let M = [],
          O = 0,
          C = 12;
        class N {
          constructor(e, t, n) {
            (this.$from = e), (this.$to = t), (this.depth = n);
          }
          get start() {
            return this.$from.before(this.depth + 1);
          }
          get end() {
            return this.$to.after(this.depth + 1);
          }
          get parent() {
            return this.$from.node(this.depth);
          }
          get startIndex() {
            return this.$from.index(this.depth);
          }
          get endIndex() {
            return this.$to.indexAfter(this.depth);
          }
        }
        const T = Object.create(null);
        class D {
          constructor(e, t, n, r = c.none) {
            (this.type = e),
              (this.attrs = t),
              (this.marks = r),
              (this.content = n || i.empty);
          }
          get nodeSize() {
            return this.isLeaf ? 1 : 2 + this.content.size;
          }
          get childCount() {
            return this.content.childCount;
          }
          child(e) {
            return this.content.child(e);
          }
          maybeChild(e) {
            return this.content.maybeChild(e);
          }
          forEach(e) {
            this.content.forEach(e);
          }
          nodesBetween(e, t, n, r = 0) {
            this.content.nodesBetween(e, t, n, r, this);
          }
          descendants(e) {
            this.nodesBetween(0, this.content.size, e);
          }
          get textContent() {
            return this.isLeaf && this.type.spec.leafText
              ? this.type.spec.leafText(this)
              : this.textBetween(0, this.content.size, "");
          }
          textBetween(e, t, n, r) {
            return this.content.textBetween(e, t, n, r);
          }
          get firstChild() {
            return this.content.firstChild;
          }
          get lastChild() {
            return this.content.lastChild;
          }
          eq(e) {
            return (
              this == e || (this.sameMarkup(e) && this.content.eq(e.content))
            );
          }
          sameMarkup(e) {
            return this.hasMarkup(e.type, e.attrs, e.marks);
          }
          hasMarkup(e, t, n) {
            return (
              this.type == e &&
              l(this.attrs, t || e.defaultAttrs || T) &&
              c.sameSet(this.marks, n || c.none)
            );
          }
          copy(e = null) {
            return e == this.content
              ? this
              : new D(this.type, this.attrs, e, this.marks);
          }
          mark(e) {
            return e == this.marks
              ? this
              : new D(this.type, this.attrs, this.content, e);
          }
          cut(e, t = this.content.size) {
            return 0 == e && t == this.content.size
              ? this
              : this.copy(this.content.cut(e, t));
          }
          slice(e, t = this.content.size, n = !1) {
            if (e == t) return h.empty;
            let r = this.resolve(e),
              o = this.resolve(t),
              i = n ? 0 : r.sharedDepth(t),
              s = r.start(i),
              a = r.node(i).content.cut(r.pos - s, o.pos - s);
            return new h(a, r.depth - i, o.depth - i);
          }
          replace(e, t, n) {
            return p(this.resolve(e), this.resolve(t), n);
          }
          nodeAt(e) {
            for (let t = this; ; ) {
              let { index: n, offset: r } = t.content.findIndex(e);
              if (((t = t.maybeChild(n)), !t)) return null;
              if (r == e || t.isText) return t;
              e -= r + 1;
            }
          }
          childAfter(e) {
            let { index: t, offset: n } = this.content.findIndex(e);
            return { node: this.content.maybeChild(t), index: t, offset: n };
          }
          childBefore(e) {
            if (0 == e) return { node: null, index: 0, offset: 0 };
            let { index: t, offset: n } = this.content.findIndex(e);
            if (n < e)
              return { node: this.content.child(t), index: t, offset: n };
            let r = this.content.child(t - 1);
            return { node: r, index: t - 1, offset: n - r.nodeSize };
          }
          resolve(e) {
            return x.resolveCached(this, e);
          }
          resolveNoCache(e) {
            return x.resolve(this, e);
          }
          rangeHasMark(e, t, n) {
            let r = !1;
            return (
              t > e &&
                this.nodesBetween(
                  e,
                  t,
                  (e) => (n.isInSet(e.marks) && (r = !0), !r)
                ),
              r
            );
          }
          get isBlock() {
            return this.type.isBlock;
          }
          get isTextblock() {
            return this.type.isTextblock;
          }
          get inlineContent() {
            return this.type.inlineContent;
          }
          get isInline() {
            return this.type.isInline;
          }
          get isText() {
            return this.type.isText;
          }
          get isLeaf() {
            return this.type.isLeaf;
          }
          get isAtom() {
            return this.type.isAtom;
          }
          toString() {
            if (this.type.spec.toDebugString)
              return this.type.spec.toDebugString(this);
            let e = this.type.name;
            return (
              this.content.size &&
                (e += "(" + this.content.toStringInner() + ")"),
              (function (e, t) {
                for (let n = e.length - 1; n >= 0; n--)
                  t = e[n].type.name + "(" + t + ")";
                return t;
              })(this.marks, e)
            );
          }
          contentMatchAt(e) {
            let t = this.type.contentMatch.matchFragment(this.content, 0, e);
            if (!t)
              throw new Error(
                "Called contentMatchAt on a node with invalid content"
              );
            return t;
          }
          canReplace(e, t, n = i.empty, r = 0, o = n.childCount) {
            let s = this.contentMatchAt(e).matchFragment(n, r, o),
              a = s && s.matchFragment(this.content, t);
            if (!a || !a.validEnd) return !1;
            for (let e = r; e < o; e++)
              if (!this.type.allowsMarks(n.child(e).marks)) return !1;
            return !0;
          }
          canReplaceWith(e, t, n, r) {
            if (r && !this.type.allowsMarks(r)) return !1;
            let o = this.contentMatchAt(e).matchType(n),
              i = o && o.matchFragment(this.content, t);
            return !!i && i.validEnd;
          }
          canAppend(e) {
            return e.content.size
              ? this.canReplace(this.childCount, this.childCount, e.content)
              : this.type.compatibleContent(e.type);
          }
          check() {
            this.type.checkContent(this.content);
            let e = c.none;
            for (let t = 0; t < this.marks.length; t++)
              e = this.marks[t].addToSet(e);
            if (!c.sameSet(e, this.marks))
              throw new RangeError(
                `Invalid collection of marks for node ${
                  this.type.name
                }: ${this.marks.map((e) => e.type.name)}`
              );
            this.content.forEach((e) => e.check());
          }
          toJSON() {
            let e = { type: this.type.name };
            for (let t in this.attrs) {
              e.attrs = this.attrs;
              break;
            }
            return (
              this.content.size && (e.content = this.content.toJSON()),
              this.marks.length &&
                (e.marks = this.marks.map((e) => e.toJSON())),
              e
            );
          }
          static fromJSON(e, t) {
            if (!t) throw new RangeError("Invalid input for Node.fromJSON");
            let n = null;
            if (t.marks) {
              if (!Array.isArray(t.marks))
                throw new RangeError("Invalid mark data for Node.fromJSON");
              n = t.marks.map(e.markFromJSON);
            }
            if ("text" == t.type) {
              if ("string" != typeof t.text)
                throw new RangeError("Invalid text node in JSON");
              return e.text(t.text, n);
            }
            let r = i.fromJSON(e, t.content);
            return e.nodeType(t.type).create(t.attrs, r, n);
          }
        }
        D.prototype.text = void 0;
        class E {
          constructor(e) {
            (this.validEnd = e), (this.next = []), (this.wrapCache = []);
          }
          static parse(e, t) {
            let n = new A(e, t);
            if (null == n.next) return E.empty;
            let r = R(n);
            n.next && n.err("Unexpected trailing text");
            let o = (function (e) {
              let t = Object.create(null);
              return (function n(r) {
                let o = [];
                r.forEach((t) => {
                  e[t].forEach(({ term: t, to: n }) => {
                    if (!t) return;
                    let r;
                    for (let e = 0; e < o.length; e++)
                      o[e][0] == t && (r = o[e][1]);
                    $(e, n).forEach((e) => {
                      r || o.push([t, (r = [])]),
                        -1 == r.indexOf(e) && r.push(e);
                    });
                  });
                });
                let i = (t[r.join(",")] = new E(r.indexOf(e.length - 1) > -1));
                for (let e = 0; e < o.length; e++) {
                  let r = o[e][1].sort(B);
                  i.next.push({ type: o[e][0], next: t[r.join(",")] || n(r) });
                }
                return i;
              })($(e, 0));
            })(
              (function (e) {
                let t = [[]];
                return (
                  o(
                    (function e(t, i) {
                      if ("choice" == t.type)
                        return t.exprs.reduce((t, n) => t.concat(e(n, i)), []);
                      if ("seq" != t.type) {
                        if ("star" == t.type) {
                          let s = n();
                          return r(i, s), o(e(t.expr, s), s), [r(s)];
                        }
                        if ("plus" == t.type) {
                          let s = n();
                          return o(e(t.expr, i), s), o(e(t.expr, s), s), [r(s)];
                        }
                        if ("opt" == t.type) return [r(i)].concat(e(t.expr, i));
                        if ("range" == t.type) {
                          let s = i;
                          for (let r = 0; r < t.min; r++) {
                            let r = n();
                            o(e(t.expr, s), r), (s = r);
                          }
                          if (-1 == t.max) o(e(t.expr, s), s);
                          else
                            for (let i = t.min; i < t.max; i++) {
                              let i = n();
                              r(s, i), o(e(t.expr, s), i), (s = i);
                            }
                          return [r(s)];
                        }
                        if ("name" == t.type) return [r(i, void 0, t.value)];
                        throw new Error("Unknown expr type");
                      }
                      for (let r = 0; ; r++) {
                        let s = e(t.exprs[r], i);
                        if (r == t.exprs.length - 1) return s;
                        o(s, (i = n()));
                      }
                    })(e, 0),
                    n()
                  ),
                  t
                );
                function n() {
                  return t.push([]) - 1;
                }
                function r(e, n, r) {
                  let o = { term: r, to: n };
                  return t[e].push(o), o;
                }
                function o(e, t) {
                  e.forEach((e) => (e.to = t));
                }
              })(r)
            );
            return (
              (function (e, t) {
                for (let n = 0, r = [e]; n < r.length; n++) {
                  let e = r[n],
                    o = !e.validEnd,
                    i = [];
                  for (let t = 0; t < e.next.length; t++) {
                    let { type: n, next: s } = e.next[t];
                    i.push(n.name),
                      !o || n.isText || n.hasRequiredAttrs() || (o = !1),
                      -1 == r.indexOf(s) && r.push(s);
                  }
                  o &&
                    t.err(
                      "Only non-generatable nodes (" +
                        i.join(", ") +
                        ") in a required position (see https://prosemirror.net/docs/guide/#generatable)"
                    );
                }
              })(o, n),
              o
            );
          }
          matchType(e) {
            for (let t = 0; t < this.next.length; t++)
              if (this.next[t].type == e) return this.next[t].next;
            return null;
          }
          matchFragment(e, t = 0, n = e.childCount) {
            let r = this;
            for (let o = t; r && o < n; o++) r = r.matchType(e.child(o).type);
            return r;
          }
          get inlineContent() {
            return 0 != this.next.length && this.next[0].type.isInline;
          }
          get defaultType() {
            for (let e = 0; e < this.next.length; e++) {
              let { type: t } = this.next[e];
              if (!t.isText && !t.hasRequiredAttrs()) return t;
            }
            return null;
          }
          compatible(e) {
            for (let t = 0; t < this.next.length; t++)
              for (let n = 0; n < e.next.length; n++)
                if (this.next[t].type == e.next[n].type) return !0;
            return !1;
          }
          fillBefore(e, t = !1, n = 0) {
            let r = [this];
            return (function o(s, a) {
              let l = s.matchFragment(e, n);
              if (l && (!t || l.validEnd))
                return i.from(a.map((e) => e.createAndFill()));
              for (let e = 0; e < s.next.length; e++) {
                let { type: t, next: n } = s.next[e];
                if (!t.isText && !t.hasRequiredAttrs() && -1 == r.indexOf(n)) {
                  r.push(n);
                  let e = o(n, a.concat(t));
                  if (e) return e;
                }
              }
              return null;
            })(this, []);
          }
          findWrapping(e) {
            for (let t = 0; t < this.wrapCache.length; t += 2)
              if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
            let t = this.computeWrapping(e);
            return this.wrapCache.push(e, t), t;
          }
          computeWrapping(e) {
            let t = Object.create(null),
              n = [{ match: this, type: null, via: null }];
            for (; n.length; ) {
              let r = n.shift(),
                o = r.match;
              if (o.matchType(e)) {
                let e = [];
                for (let t = r; t.type; t = t.via) e.push(t.type);
                return e.reverse();
              }
              for (let e = 0; e < o.next.length; e++) {
                let { type: i, next: s } = o.next[e];
                i.isLeaf ||
                  i.hasRequiredAttrs() ||
                  i.name in t ||
                  (r.type && !s.validEnd) ||
                  (n.push({ match: i.contentMatch, type: i, via: r }),
                  (t[i.name] = !0));
              }
            }
            return null;
          }
          get edgeCount() {
            return this.next.length;
          }
          edge(e) {
            if (e >= this.next.length)
              throw new RangeError(
                `There's no ${e}th edge in this content match`
              );
            return this.next[e];
          }
          toString() {
            let e = [];
            return (
              (function t(n) {
                e.push(n);
                for (let r = 0; r < n.next.length; r++)
                  -1 == e.indexOf(n.next[r].next) && t(n.next[r].next);
              })(this),
              e
                .map((t, n) => {
                  let r = n + (t.validEnd ? "*" : " ") + " ";
                  for (let n = 0; n < t.next.length; n++)
                    r +=
                      (n ? ", " : "") +
                      t.next[n].type.name +
                      "->" +
                      e.indexOf(t.next[n].next);
                  return r;
                })
                .join("\n")
            );
          }
        }
        E.empty = new E(!0);
        class A {
          constructor(e, t) {
            (this.string = e),
              (this.nodeTypes = t),
              (this.inline = null),
              (this.pos = 0),
              (this.tokens = e.split(/\s*(?=\b|\W|$)/)),
              "" == this.tokens[this.tokens.length - 1] && this.tokens.pop(),
              "" == this.tokens[0] && this.tokens.shift();
          }
          get next() {
            return this.tokens[this.pos];
          }
          eat(e) {
            return this.next == e && (this.pos++ || !0);
          }
          err(e) {
            throw new SyntaxError(
              e + " (in content expression '" + this.string + "')"
            );
          }
        }
        function R(e) {
          let t = [];
          do {
            t.push(P(e));
          } while (e.eat("|"));
          return 1 == t.length ? t[0] : { type: "choice", exprs: t };
        }
        function P(e) {
          let t = [];
          do {
            t.push(I(e));
          } while (e.next && ")" != e.next && "|" != e.next);
          return 1 == t.length ? t[0] : { type: "seq", exprs: t };
        }
        function I(e) {
          let t = (function (e) {
            if (e.eat("(")) {
              let t = R(e);
              return e.eat(")") || e.err("Missing closing paren"), t;
            }
            if (!/\W/.test(e.next)) {
              let t = (function (e, t) {
                let n = e.nodeTypes,
                  r = n[t];
                if (r) return [r];
                let o = [];
                for (let e in n) {
                  let r = n[e];
                  r.groups.indexOf(t) > -1 && o.push(r);
                }
                return (
                  0 == o.length &&
                    e.err("No node type or group '" + t + "' found"),
                  o
                );
              })(e, e.next).map(
                (t) => (
                  null == e.inline
                    ? (e.inline = t.isInline)
                    : e.inline != t.isInline &&
                      e.err("Mixing inline and block content"),
                  { type: "name", value: t }
                )
              );
              return (
                e.pos++, 1 == t.length ? t[0] : { type: "choice", exprs: t }
              );
            }
            e.err("Unexpected token '" + e.next + "'");
          })(e);
          for (;;)
            if (e.eat("+")) t = { type: "plus", expr: t };
            else if (e.eat("*")) t = { type: "star", expr: t };
            else if (e.eat("?")) t = { type: "opt", expr: t };
            else {
              if (!e.eat("{")) break;
              t = F(e, t);
            }
          return t;
        }
        function z(e) {
          /\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
          let t = Number(e.next);
          return e.pos++, t;
        }
        function F(e, t) {
          let n = z(e),
            r = n;
          return (
            e.eat(",") && (r = "}" != e.next ? z(e) : -1),
            e.eat("}") || e.err("Unclosed braced range"),
            { type: "range", min: n, max: r, expr: t }
          );
        }
        function B(e, t) {
          return t - e;
        }
        function $(e, t) {
          let n = [];
          return (
            (function t(r) {
              let o = e[r];
              if (1 == o.length && !o[0].term) return t(o[0].to);
              n.push(r);
              for (let e = 0; e < o.length; e++) {
                let { term: r, to: i } = o[e];
                r || -1 != n.indexOf(i) || t(i);
              }
            })(t),
            n.sort(B)
          );
        }
        class V {
          constructor(e, t) {
            (this.schema = e),
              (this.rules = t),
              (this.tags = []),
              (this.styles = []),
              t.forEach((e) => {
                e.tag ? this.tags.push(e) : e.style && this.styles.push(e);
              }),
              (this.normalizeLists = !this.tags.some((t) => {
                if (!/^(ul|ol)\b/.test(t.tag) || !t.node) return !1;
                let n = e.nodes[t.node];
                return n.contentMatch.matchType(n);
              }));
          }
          parse(e, t = {}) {
            let n = new W(this, t, !1);
            return n.addAll(e, t.from, t.to), n.finish();
          }
          parseSlice(e, t = {}) {
            let n = new W(this, t, !0);
            return n.addAll(e, t.from, t.to), h.maxOpen(n.finish());
          }
          matchTag(e, t, n) {
            for (
              let r = n ? this.tags.indexOf(n) + 1 : 0;
              r < this.tags.length;
              r++
            ) {
              let n = this.tags[r];
              if (
                K(e, n.tag) &&
                (void 0 === n.namespace || e.namespaceURI == n.namespace) &&
                (!n.context || t.matchesContext(n.context))
              ) {
                if (n.getAttrs) {
                  let t = n.getAttrs(e);
                  if (!1 === t) continue;
                  n.attrs = t || void 0;
                }
                return n;
              }
            }
          }
          matchStyle(e, t, n, r) {
            for (
              let o = r ? this.styles.indexOf(r) + 1 : 0;
              o < this.styles.length;
              o++
            ) {
              let r = this.styles[o],
                i = r.style;
              if (
                !(
                  0 != i.indexOf(e) ||
                  (r.context && !n.matchesContext(r.context)) ||
                  (i.length > e.length &&
                    (61 != i.charCodeAt(e.length) ||
                      i.slice(e.length + 1) != t))
                )
              ) {
                if (r.getAttrs) {
                  let e = r.getAttrs(t);
                  if (!1 === e) continue;
                  r.attrs = e || void 0;
                }
                return r;
              }
            }
          }
          static schemaRules(e) {
            let t = [];
            function n(e) {
              let n = null == e.priority ? 50 : e.priority,
                r = 0;
              for (; r < t.length; r++) {
                let e = t[r];
                if ((null == e.priority ? 50 : e.priority) < n) break;
              }
              t.splice(r, 0, e);
            }
            for (let t in e.marks) {
              let r = e.marks[t].spec.parseDOM;
              r &&
                r.forEach((e) => {
                  n((e = H(e))),
                    e.mark || e.ignore || e.clearMark || (e.mark = t);
                });
            }
            for (let t in e.nodes) {
              let r = e.nodes[t].spec.parseDOM;
              r &&
                r.forEach((e) => {
                  n((e = H(e))), e.node || e.ignore || e.mark || (e.node = t);
                });
            }
            return t;
          }
          static fromSchema(e) {
            return (
              e.cached.domParser ||
              (e.cached.domParser = new V(e, V.schemaRules(e)))
            );
          }
        }
        const j = {
            address: !0,
            article: !0,
            aside: !0,
            blockquote: !0,
            canvas: !0,
            dd: !0,
            div: !0,
            dl: !0,
            fieldset: !0,
            figcaption: !0,
            figure: !0,
            footer: !0,
            form: !0,
            h1: !0,
            h2: !0,
            h3: !0,
            h4: !0,
            h5: !0,
            h6: !0,
            header: !0,
            hgroup: !0,
            hr: !0,
            li: !0,
            noscript: !0,
            ol: !0,
            output: !0,
            p: !0,
            pre: !0,
            section: !0,
            table: !0,
            tfoot: !0,
            ul: !0,
          },
          q = {
            head: !0,
            noscript: !0,
            object: !0,
            script: !0,
            style: !0,
            title: !0,
          },
          L = { ol: !0, ul: !0 };
        function J(e, t, n) {
          return null != t
            ? (t ? 1 : 0) | ("full" === t ? 2 : 0)
            : e && "pre" == e.whitespace
            ? 3
            : -5 & n;
        }
        class _ {
          constructor(e, t, n, r, o, i, s) {
            (this.type = e),
              (this.attrs = t),
              (this.marks = n),
              (this.pendingMarks = r),
              (this.solid = o),
              (this.options = s),
              (this.content = []),
              (this.activeMarks = c.none),
              (this.stashMarks = []),
              (this.match = i || (4 & s ? null : e.contentMatch));
          }
          findWrapping(e) {
            if (!this.match) {
              if (!this.type) return [];
              let t = this.type.contentMatch.fillBefore(i.from(e));
              if (!t) {
                let t,
                  n = this.type.contentMatch;
                return (t = n.findWrapping(e.type))
                  ? ((this.match = n), t)
                  : null;
              }
              this.match = this.type.contentMatch.matchFragment(t);
            }
            return this.match.findWrapping(e.type);
          }
          finish(e) {
            if (!(1 & this.options)) {
              let e,
                t = this.content[this.content.length - 1];
              if (t && t.isText && (e = /[ \t\r\n\u000c]+$/.exec(t.text))) {
                let n = t;
                t.text.length == e[0].length
                  ? this.content.pop()
                  : (this.content[this.content.length - 1] = n.withText(
                      n.text.slice(0, n.text.length - e[0].length)
                    ));
              }
            }
            let t = i.from(this.content);
            return (
              !e &&
                this.match &&
                (t = t.append(this.match.fillBefore(i.empty, !0))),
              this.type ? this.type.create(this.attrs, t, this.marks) : t
            );
          }
          popFromStashMark(e) {
            for (let t = this.stashMarks.length - 1; t >= 0; t--)
              if (e.eq(this.stashMarks[t]))
                return this.stashMarks.splice(t, 1)[0];
          }
          applyPending(e) {
            for (let t = 0, n = this.pendingMarks; t < n.length; t++) {
              let r = n[t];
              (this.type ? this.type.allowsMarkType(r.type) : U(r.type, e)) &&
                !r.isInSet(this.activeMarks) &&
                ((this.activeMarks = r.addToSet(this.activeMarks)),
                (this.pendingMarks = r.removeFromSet(this.pendingMarks)));
            }
          }
          inlineContext(e) {
            return this.type
              ? this.type.inlineContent
              : this.content.length
              ? this.content[0].isInline
              : e.parentNode &&
                !j.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
          }
        }
        class W {
          constructor(e, t, n) {
            (this.parser = e),
              (this.options = t),
              (this.isOpen = n),
              (this.open = 0);
            let r,
              o = t.topNode,
              i = J(null, t.preserveWhitespace, 0) | (n ? 4 : 0);
            (r = o
              ? new _(
                  o.type,
                  o.attrs,
                  c.none,
                  c.none,
                  !0,
                  t.topMatch || o.type.contentMatch,
                  i
                )
              : new _(
                  n ? null : e.schema.topNodeType,
                  null,
                  c.none,
                  c.none,
                  !0,
                  null,
                  i
                )),
              (this.nodes = [r]),
              (this.find = t.findPositions),
              (this.needsBlock = !1);
          }
          get top() {
            return this.nodes[this.open];
          }
          addDOM(e) {
            if (3 == e.nodeType) this.addTextNode(e);
            else if (1 == e.nodeType) {
              let t = e.getAttribute("style");
              if (t) {
                let n = this.readStyles(
                  (function (e) {
                    let t,
                      n = /\s*([\w-]+)\s*:\s*([^;]+)/g,
                      r = [];
                    for (; (t = n.exec(e)); ) r.push(t[1], t[2].trim());
                    return r;
                  })(t)
                );
                if (!n) return;
                let [r, o] = n,
                  i = this.top;
                for (let e = 0; e < o.length; e++)
                  this.removePendingMark(o[e], i);
                for (let e = 0; e < r.length; e++) this.addPendingMark(r[e]);
                this.addElement(e);
                for (let e = 0; e < r.length; e++)
                  this.removePendingMark(r[e], i);
                for (let e = 0; e < o.length; e++) this.addPendingMark(o[e]);
              } else this.addElement(e);
            }
          }
          addTextNode(e) {
            let t = e.nodeValue,
              n = this.top;
            if (
              2 & n.options ||
              n.inlineContext(e) ||
              /[^ \t\r\n\u000c]/.test(t)
            ) {
              if (1 & n.options)
                t =
                  2 & n.options
                    ? t.replace(/\r\n?/g, "\n")
                    : t.replace(/\r?\n|\r/g, " ");
              else if (
                ((t = t.replace(/[ \t\r\n\u000c]+/g, " ")),
                /^[ \t\r\n\u000c]/.test(t) &&
                  this.open == this.nodes.length - 1)
              ) {
                let r = n.content[n.content.length - 1],
                  o = e.previousSibling;
                (!r ||
                  (o && "BR" == o.nodeName) ||
                  (r.isText && /[ \t\r\n\u000c]$/.test(r.text))) &&
                  (t = t.slice(1));
              }
              t && this.insertNode(this.parser.schema.text(t)),
                this.findInText(e);
            } else this.findInside(e);
          }
          addElement(e, t) {
            let n,
              r = e.nodeName.toLowerCase();
            L.hasOwnProperty(r) &&
              this.parser.normalizeLists &&
              (function (e) {
                for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
                  let e = 1 == t.nodeType ? t.nodeName.toLowerCase() : null;
                  e && L.hasOwnProperty(e) && n
                    ? (n.appendChild(t), (t = n))
                    : "li" == e
                    ? (n = t)
                    : e && (n = null);
                }
              })(e);
            let o =
              (this.options.ruleFromNode && this.options.ruleFromNode(e)) ||
              (n = this.parser.matchTag(e, this, t));
            if (o ? o.ignore : q.hasOwnProperty(r))
              this.findInside(e), this.ignoreFallback(e);
            else if (!o || o.skip || o.closeParent) {
              o && o.closeParent
                ? (this.open = Math.max(0, this.open - 1))
                : o && o.skip.nodeType && (e = o.skip);
              let t,
                n = this.top,
                i = this.needsBlock;
              if (j.hasOwnProperty(r))
                n.content.length &&
                  n.content[0].isInline &&
                  this.open &&
                  (this.open--, (n = this.top)),
                  (t = !0),
                  n.type || (this.needsBlock = !0);
              else if (!e.firstChild) return void this.leafFallback(e);
              this.addAll(e), t && this.sync(n), (this.needsBlock = i);
            } else this.addElementByRule(e, o, !1 === o.consuming ? n : void 0);
          }
          leafFallback(e) {
            "BR" == e.nodeName &&
              this.top.type &&
              this.top.type.inlineContent &&
              this.addTextNode(e.ownerDocument.createTextNode("\n"));
          }
          ignoreFallback(e) {
            "BR" != e.nodeName ||
              (this.top.type && this.top.type.inlineContent) ||
              this.findPlace(this.parser.schema.text("-"));
          }
          readStyles(e) {
            let t = c.none,
              n = c.none;
            e: for (let r = 0; r < e.length; r += 2)
              for (let o; ; ) {
                let i = this.parser.matchStyle(e[r], e[r + 1], this, o);
                if (!i) continue e;
                if (i.ignore) return null;
                if (
                  (i.clearMark
                    ? this.top.pendingMarks.forEach((e) => {
                        i.clearMark(e) && (n = e.addToSet(n));
                      })
                    : (t = this.parser.schema.marks[i.mark]
                        .create(i.attrs)
                        .addToSet(t)),
                  !1 !== i.consuming)
                )
                  break;
                o = i;
              }
            return [t, n];
          }
          addElementByRule(e, t, n) {
            let r, o, i;
            t.node
              ? ((o = this.parser.schema.nodes[t.node]),
                o.isLeaf
                  ? this.insertNode(o.create(t.attrs)) || this.leafFallback(e)
                  : (r = this.enter(o, t.attrs || null, t.preserveWhitespace)))
              : ((i = this.parser.schema.marks[t.mark].create(t.attrs)),
                this.addPendingMark(i));
            let s = this.top;
            if (o && o.isLeaf) this.findInside(e);
            else if (n) this.addElement(e, n);
            else if (t.getContent)
              this.findInside(e),
                t
                  .getContent(e, this.parser.schema)
                  .forEach((e) => this.insertNode(e));
            else {
              let n = e;
              "string" == typeof t.contentElement
                ? (n = e.querySelector(t.contentElement))
                : "function" == typeof t.contentElement
                ? (n = t.contentElement(e))
                : t.contentElement && (n = t.contentElement),
                this.findAround(e, n, !0),
                this.addAll(n);
            }
            r && this.sync(s) && this.open--, i && this.removePendingMark(i, s);
          }
          addAll(e, t, n) {
            let r = t || 0;
            for (
              let o = t ? e.childNodes[t] : e.firstChild,
                i = null == n ? null : e.childNodes[n];
              o != i;
              o = o.nextSibling, ++r
            )
              this.findAtPoint(e, r), this.addDOM(o);
            this.findAtPoint(e, r);
          }
          findPlace(e) {
            let t, n;
            for (let r = this.open; r >= 0; r--) {
              let o = this.nodes[r],
                i = o.findWrapping(e);
              if (
                i &&
                (!t || t.length > i.length) &&
                ((t = i), (n = o), !i.length)
              )
                break;
              if (o.solid) break;
            }
            if (!t) return !1;
            this.sync(n);
            for (let e = 0; e < t.length; e++) this.enterInner(t[e], null, !1);
            return !0;
          }
          insertNode(e) {
            if (e.isInline && this.needsBlock && !this.top.type) {
              let e = this.textblockFromContext();
              e && this.enterInner(e);
            }
            if (this.findPlace(e)) {
              this.closeExtra();
              let t = this.top;
              t.applyPending(e.type),
                t.match && (t.match = t.match.matchType(e.type));
              let n = t.activeMarks;
              for (let r = 0; r < e.marks.length; r++)
                (t.type && !t.type.allowsMarkType(e.marks[r].type)) ||
                  (n = e.marks[r].addToSet(n));
              return t.content.push(e.mark(n)), !0;
            }
            return !1;
          }
          enter(e, t, n) {
            let r = this.findPlace(e.create(t));
            return r && this.enterInner(e, t, !0, n), r;
          }
          enterInner(e, t = null, n = !1, r) {
            this.closeExtra();
            let o = this.top;
            o.applyPending(e), (o.match = o.match && o.match.matchType(e));
            let i = J(e, r, o.options);
            4 & o.options && 0 == o.content.length && (i |= 4),
              this.nodes.push(
                new _(e, t, o.activeMarks, o.pendingMarks, n, null, i)
              ),
              this.open++;
          }
          closeExtra(e = !1) {
            let t = this.nodes.length - 1;
            if (t > this.open) {
              for (; t > this.open; t--)
                this.nodes[t - 1].content.push(this.nodes[t].finish(e));
              this.nodes.length = this.open + 1;
            }
          }
          finish() {
            return (
              (this.open = 0),
              this.closeExtra(this.isOpen),
              this.nodes[0].finish(this.isOpen || this.options.topOpen)
            );
          }
          sync(e) {
            for (let t = this.open; t >= 0; t--)
              if (this.nodes[t] == e) return (this.open = t), !0;
            return !1;
          }
          get currentPos() {
            this.closeExtra();
            let e = 0;
            for (let t = this.open; t >= 0; t--) {
              let n = this.nodes[t].content;
              for (let t = n.length - 1; t >= 0; t--) e += n[t].nodeSize;
              t && e++;
            }
            return e;
          }
          findAtPoint(e, t) {
            if (this.find)
              for (let n = 0; n < this.find.length; n++)
                this.find[n].node == e &&
                  this.find[n].offset == t &&
                  (this.find[n].pos = this.currentPos);
          }
          findInside(e) {
            if (this.find)
              for (let t = 0; t < this.find.length; t++)
                null == this.find[t].pos &&
                  1 == e.nodeType &&
                  e.contains(this.find[t].node) &&
                  (this.find[t].pos = this.currentPos);
          }
          findAround(e, t, n) {
            if (e != t && this.find)
              for (let r = 0; r < this.find.length; r++)
                null == this.find[r].pos &&
                  1 == e.nodeType &&
                  e.contains(this.find[r].node) &&
                  t.compareDocumentPosition(this.find[r].node) & (n ? 2 : 4) &&
                  (this.find[r].pos = this.currentPos);
          }
          findInText(e) {
            if (this.find)
              for (let t = 0; t < this.find.length; t++)
                this.find[t].node == e &&
                  (this.find[t].pos =
                    this.currentPos -
                    (e.nodeValue.length - this.find[t].offset));
          }
          matchesContext(e) {
            if (e.indexOf("|") > -1)
              return e.split(/\s*\|\s*/).some(this.matchesContext, this);
            let t = e.split("/"),
              n = this.options.context,
              r = !(this.isOpen || (n && n.parent.type != this.nodes[0].type)),
              o = -(n ? n.depth + 1 : 0) + (r ? 0 : 1),
              i = (e, s) => {
                for (; e >= 0; e--) {
                  let a = t[e];
                  if ("" == a) {
                    if (e == t.length - 1 || 0 == e) continue;
                    for (; s >= o; s--) if (i(e - 1, s)) return !0;
                    return !1;
                  }
                  {
                    let e =
                      s > 0 || (0 == s && r)
                        ? this.nodes[s].type
                        : n && s >= o
                        ? n.node(s - o).type
                        : null;
                    if (!e || (e.name != a && -1 == e.groups.indexOf(a)))
                      return !1;
                    s--;
                  }
                }
                return !0;
              };
            return i(t.length - 1, this.open);
          }
          textblockFromContext() {
            let e = this.options.context;
            if (e)
              for (let t = e.depth; t >= 0; t--) {
                let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
                if (n && n.isTextblock && n.defaultAttrs) return n;
              }
            for (let e in this.parser.schema.nodes) {
              let t = this.parser.schema.nodes[e];
              if (t.isTextblock && t.defaultAttrs) return t;
            }
          }
          addPendingMark(e) {
            let t = (function (e, t) {
              for (let n = 0; n < t.length; n++) if (e.eq(t[n])) return t[n];
            })(e, this.top.pendingMarks);
            t && this.top.stashMarks.push(t),
              (this.top.pendingMarks = e.addToSet(this.top.pendingMarks));
          }
          removePendingMark(e, t) {
            for (let n = this.open; n >= 0; n--) {
              let r = this.nodes[n];
              if (r.pendingMarks.lastIndexOf(e) > -1)
                r.pendingMarks = e.removeFromSet(r.pendingMarks);
              else {
                r.activeMarks = e.removeFromSet(r.activeMarks);
                let t = r.popFromStashMark(e);
                t &&
                  r.type &&
                  r.type.allowsMarkType(t.type) &&
                  (r.activeMarks = t.addToSet(r.activeMarks));
              }
              if (r == t) break;
            }
          }
        }
        function K(e, t) {
          return (
            e.matches ||
            e.msMatchesSelector ||
            e.webkitMatchesSelector ||
            e.mozMatchesSelector
          ).call(e, t);
        }
        function H(e) {
          let t = {};
          for (let n in e) t[n] = e[n];
          return t;
        }
        function U(e, t) {
          let n = t.schema.nodes;
          for (let r in n) {
            let o = n[r];
            if (!o.allowsMarkType(e)) continue;
            let i = [],
              s = (e) => {
                i.push(e);
                for (let n = 0; n < e.edgeCount; n++) {
                  let { type: r, next: o } = e.edge(n);
                  if (r == t) return !0;
                  if (i.indexOf(o) < 0 && s(o)) return !0;
                }
              };
            if (s(o.contentMatch)) return !0;
          }
        }
        class G {
          constructor(e, t) {
            (this.nodes = e), (this.marks = t);
          }
          serializeFragment(e, t = {}, n) {
            n || (n = X(t).createDocumentFragment());
            let r = n,
              o = [];
            return (
              e.forEach((e) => {
                if (o.length || e.marks.length) {
                  let n = 0,
                    i = 0;
                  for (; n < o.length && i < e.marks.length; ) {
                    let t = e.marks[i];
                    if (this.marks[t.type.name]) {
                      if (!t.eq(o[n][0]) || !1 === t.type.spec.spanning) break;
                      n++, i++;
                    } else i++;
                  }
                  for (; n < o.length; ) r = o.pop()[1];
                  for (; i < e.marks.length; ) {
                    let n = e.marks[i++],
                      s = this.serializeMark(n, e.isInline, t);
                    s &&
                      (o.push([n, r]),
                      r.appendChild(s.dom),
                      (r = s.contentDOM || s.dom));
                  }
                }
                r.appendChild(this.serializeNodeInner(e, t));
              }),
              n
            );
          }
          serializeNodeInner(e, t) {
            let { dom: n, contentDOM: r } = G.renderSpec(
              X(t),
              this.nodes[e.type.name](e)
            );
            if (r) {
              if (e.isLeaf)
                throw new RangeError(
                  "Content hole not allowed in a leaf node spec"
                );
              this.serializeFragment(e.content, t, r);
            }
            return n;
          }
          serializeNode(e, t = {}) {
            let n = this.serializeNodeInner(e, t);
            for (let r = e.marks.length - 1; r >= 0; r--) {
              let o = this.serializeMark(e.marks[r], e.isInline, t);
              o && ((o.contentDOM || o.dom).appendChild(n), (n = o.dom));
            }
            return n;
          }
          serializeMark(e, t, n = {}) {
            let r = this.marks[e.type.name];
            return r && G.renderSpec(X(n), r(e, t));
          }
          static renderSpec(e, t, n = null) {
            if ("string" == typeof t) return { dom: e.createTextNode(t) };
            if (null != t.nodeType) return { dom: t };
            if (t.dom && null != t.dom.nodeType) return t;
            let r,
              o = t[0],
              i = o.indexOf(" ");
            i > 0 && ((n = o.slice(0, i)), (o = o.slice(i + 1)));
            let s = n ? e.createElementNS(n, o) : e.createElement(o),
              a = t[1],
              l = 1;
            if (
              a &&
              "object" == typeof a &&
              null == a.nodeType &&
              !Array.isArray(a)
            ) {
              l = 2;
              for (let e in a)
                if (null != a[e]) {
                  let t = e.indexOf(" ");
                  t > 0
                    ? s.setAttributeNS(e.slice(0, t), e.slice(t + 1), a[e])
                    : s.setAttribute(e, a[e]);
                }
            }
            for (let o = l; o < t.length; o++) {
              let i = t[o];
              if (0 === i) {
                if (o < t.length - 1 || o > l)
                  throw new RangeError(
                    "Content hole must be the only child of its parent node"
                  );
                return { dom: s, contentDOM: s };
              }
              {
                let { dom: t, contentDOM: o } = G.renderSpec(e, i, n);
                if ((s.appendChild(t), o)) {
                  if (r) throw new RangeError("Multiple content holes");
                  r = o;
                }
              }
            }
            return { dom: s, contentDOM: r };
          }
          static fromSchema(e) {
            return (
              e.cached.domSerializer ||
              (e.cached.domSerializer = new G(
                this.nodesFromSchema(e),
                this.marksFromSchema(e)
              ))
            );
          }
          static nodesFromSchema(e) {
            let t = Z(e.nodes);
            return t.text || (t.text = (e) => e.text), t;
          }
          static marksFromSchema(e) {
            return Z(e.marks);
          }
        }
        function Z(e) {
          let t = {};
          for (let n in e) {
            let r = e[n].spec.toDOM;
            r && (t[n] = r);
          }
          return t;
        }
        function X(e) {
          return e.document || window.document;
        }
        const Y = Math.pow(2, 16);
        function Q(e) {
          return 65535 & e;
        }
        class ee {
          constructor(e, t, n) {
            (this.pos = e), (this.delInfo = t), (this.recover = n);
          }
          get deleted() {
            return (8 & this.delInfo) > 0;
          }
          get deletedBefore() {
            return (5 & this.delInfo) > 0;
          }
          get deletedAfter() {
            return (6 & this.delInfo) > 0;
          }
          get deletedAcross() {
            return (4 & this.delInfo) > 0;
          }
        }
        class te {
          constructor(e, t = !1) {
            if (((this.ranges = e), (this.inverted = t), !e.length && te.empty))
              return te.empty;
          }
          recover(e) {
            let t = 0,
              n = Q(e);
            if (!this.inverted)
              for (let e = 0; e < n; e++)
                t += this.ranges[3 * e + 2] - this.ranges[3 * e + 1];
            return (
              this.ranges[3 * n] +
              t +
              (function (e) {
                return (e - (65535 & e)) / Y;
              })(e)
            );
          }
          mapResult(e, t = 1) {
            return this._map(e, t, !1);
          }
          map(e, t = 1) {
            return this._map(e, t, !0);
          }
          _map(e, t, n) {
            let r = 0,
              o = this.inverted ? 2 : 1,
              i = this.inverted ? 1 : 2;
            for (let s = 0; s < this.ranges.length; s += 3) {
              let a = this.ranges[s] - (this.inverted ? r : 0);
              if (a > e) break;
              let l = this.ranges[s + o],
                c = this.ranges[s + i],
                u = a + l;
              if (e <= u) {
                let o =
                  a +
                  r +
                  ((l ? (e == a ? -1 : e == u ? 1 : t) : t) < 0 ? 0 : c);
                if (n) return o;
                let i = e == a ? 2 : e == u ? 1 : 4;
                return (
                  (t < 0 ? e != a : e != u) && (i |= 8),
                  new ee(
                    o,
                    i,
                    e == (t < 0 ? a : u) ? null : s / 3 + (e - a) * Y
                  )
                );
              }
              r += c - l;
            }
            return n ? e + r : new ee(e + r, 0, null);
          }
          touches(e, t) {
            let n = 0,
              r = Q(t),
              o = this.inverted ? 2 : 1,
              i = this.inverted ? 1 : 2;
            for (let t = 0; t < this.ranges.length; t += 3) {
              let s = this.ranges[t] - (this.inverted ? n : 0);
              if (s > e) break;
              let a = this.ranges[t + o];
              if (e <= s + a && t == 3 * r) return !0;
              n += this.ranges[t + i] - a;
            }
            return !1;
          }
          forEach(e) {
            let t = this.inverted ? 2 : 1,
              n = this.inverted ? 1 : 2;
            for (let r = 0, o = 0; r < this.ranges.length; r += 3) {
              let i = this.ranges[r],
                s = i - (this.inverted ? o : 0),
                a = i + (this.inverted ? 0 : o),
                l = this.ranges[r + t],
                c = this.ranges[r + n];
              e(s, s + l, a, a + c), (o += c - l);
            }
          }
          invert() {
            return new te(this.ranges, !this.inverted);
          }
          toString() {
            return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
          }
          static offset(e) {
            return 0 == e ? te.empty : new te(e < 0 ? [0, -e, 0] : [0, 0, e]);
          }
        }
        te.empty = new te([]);
        const ne = Object.create(null);
        class re {
          getMap() {
            return te.empty;
          }
          merge(e) {
            return null;
          }
          static fromJSON(e, t) {
            if (!t || !t.stepType)
              throw new RangeError("Invalid input for Step.fromJSON");
            let n = ne[t.stepType];
            if (!n) throw new RangeError(`No step type ${t.stepType} defined`);
            return n.fromJSON(e, t);
          }
          static jsonID(e, t) {
            if (e in ne)
              throw new RangeError("Duplicate use of step JSON ID " + e);
            return (ne[e] = t), (t.prototype.jsonID = e), t;
          }
        }
        class oe {
          constructor(e, t) {
            (this.doc = e), (this.failed = t);
          }
          static ok(e) {
            return new oe(e, null);
          }
          static fail(e) {
            return new oe(null, e);
          }
          static fromReplace(e, t, n, r) {
            try {
              return oe.ok(e.replace(t, n, r));
            } catch (e) {
              if (e instanceof u) return oe.fail(e.message);
              throw e;
            }
          }
        }
        function ie(e, t, n) {
          let r = [];
          for (let o = 0; o < e.childCount; o++) {
            let i = e.child(o);
            i.content.size && (i = i.copy(ie(i.content, t, i))),
              i.isInline && (i = t(i, n, o)),
              r.push(i);
          }
          return i.fromArray(r);
        }
        class se extends re {
          constructor(e, t, n) {
            super(), (this.from = e), (this.to = t), (this.mark = n);
          }
          apply(e) {
            let t = e.slice(this.from, this.to),
              n = e.resolve(this.from),
              r = n.node(n.sharedDepth(this.to)),
              o = new h(
                ie(
                  t.content,
                  (e, t) =>
                    e.isAtom && t.type.allowsMarkType(this.mark.type)
                      ? e.mark(this.mark.addToSet(e.marks))
                      : e,
                  r
                ),
                t.openStart,
                t.openEnd
              );
            return oe.fromReplace(e, this.from, this.to, o);
          }
          invert() {
            return new ae(this.from, this.to, this.mark);
          }
          map(e) {
            let t = e.mapResult(this.from, 1),
              n = e.mapResult(this.to, -1);
            return (t.deleted && n.deleted) || t.pos >= n.pos
              ? null
              : new se(t.pos, n.pos, this.mark);
          }
          merge(e) {
            return e instanceof se &&
              e.mark.eq(this.mark) &&
              this.from <= e.to &&
              this.to >= e.from
              ? new se(
                  Math.min(this.from, e.from),
                  Math.max(this.to, e.to),
                  this.mark
                )
              : null;
          }
          toJSON() {
            return {
              stepType: "addMark",
              mark: this.mark.toJSON(),
              from: this.from,
              to: this.to,
            };
          }
          static fromJSON(e, t) {
            if ("number" != typeof t.from || "number" != typeof t.to)
              throw new RangeError("Invalid input for AddMarkStep.fromJSON");
            return new se(t.from, t.to, e.markFromJSON(t.mark));
          }
        }
        re.jsonID("addMark", se);
        class ae extends re {
          constructor(e, t, n) {
            super(), (this.from = e), (this.to = t), (this.mark = n);
          }
          apply(e) {
            let t = e.slice(this.from, this.to),
              n = new h(
                ie(
                  t.content,
                  (e) => e.mark(this.mark.removeFromSet(e.marks)),
                  e
                ),
                t.openStart,
                t.openEnd
              );
            return oe.fromReplace(e, this.from, this.to, n);
          }
          invert() {
            return new se(this.from, this.to, this.mark);
          }
          map(e) {
            let t = e.mapResult(this.from, 1),
              n = e.mapResult(this.to, -1);
            return (t.deleted && n.deleted) || t.pos >= n.pos
              ? null
              : new ae(t.pos, n.pos, this.mark);
          }
          merge(e) {
            return e instanceof ae &&
              e.mark.eq(this.mark) &&
              this.from <= e.to &&
              this.to >= e.from
              ? new ae(
                  Math.min(this.from, e.from),
                  Math.max(this.to, e.to),
                  this.mark
                )
              : null;
          }
          toJSON() {
            return {
              stepType: "removeMark",
              mark: this.mark.toJSON(),
              from: this.from,
              to: this.to,
            };
          }
          static fromJSON(e, t) {
            if ("number" != typeof t.from || "number" != typeof t.to)
              throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
            return new ae(t.from, t.to, e.markFromJSON(t.mark));
          }
        }
        re.jsonID("removeMark", ae);
        class le extends re {
          constructor(e, t) {
            super(), (this.pos = e), (this.mark = t);
          }
          apply(e) {
            let t = e.nodeAt(this.pos);
            if (!t) return oe.fail("No node at mark step's position");
            let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
            return oe.fromReplace(
              e,
              this.pos,
              this.pos + 1,
              new h(i.from(n), 0, t.isLeaf ? 0 : 1)
            );
          }
          invert(e) {
            let t = e.nodeAt(this.pos);
            if (t) {
              let e = this.mark.addToSet(t.marks);
              if (e.length == t.marks.length) {
                for (let n = 0; n < t.marks.length; n++)
                  if (!t.marks[n].isInSet(e))
                    return new le(this.pos, t.marks[n]);
                return new le(this.pos, this.mark);
              }
            }
            return new ce(this.pos, this.mark);
          }
          map(e) {
            let t = e.mapResult(this.pos, 1);
            return t.deletedAfter ? null : new le(t.pos, this.mark);
          }
          toJSON() {
            return {
              stepType: "addNodeMark",
              pos: this.pos,
              mark: this.mark.toJSON(),
            };
          }
          static fromJSON(e, t) {
            if ("number" != typeof t.pos)
              throw new RangeError(
                "Invalid input for AddNodeMarkStep.fromJSON"
              );
            return new le(t.pos, e.markFromJSON(t.mark));
          }
        }
        re.jsonID("addNodeMark", le);
        class ce extends re {
          constructor(e, t) {
            super(), (this.pos = e), (this.mark = t);
          }
          apply(e) {
            let t = e.nodeAt(this.pos);
            if (!t) return oe.fail("No node at mark step's position");
            let n = t.type.create(
              t.attrs,
              null,
              this.mark.removeFromSet(t.marks)
            );
            return oe.fromReplace(
              e,
              this.pos,
              this.pos + 1,
              new h(i.from(n), 0, t.isLeaf ? 0 : 1)
            );
          }
          invert(e) {
            let t = e.nodeAt(this.pos);
            return t && this.mark.isInSet(t.marks)
              ? new le(this.pos, this.mark)
              : this;
          }
          map(e) {
            let t = e.mapResult(this.pos, 1);
            return t.deletedAfter ? null : new ce(t.pos, this.mark);
          }
          toJSON() {
            return {
              stepType: "removeNodeMark",
              pos: this.pos,
              mark: this.mark.toJSON(),
            };
          }
          static fromJSON(e, t) {
            if ("number" != typeof t.pos)
              throw new RangeError(
                "Invalid input for RemoveNodeMarkStep.fromJSON"
              );
            return new ce(t.pos, e.markFromJSON(t.mark));
          }
        }
        re.jsonID("removeNodeMark", ce);
        class ue extends re {
          constructor(e, t, n, r = !1) {
            super(),
              (this.from = e),
              (this.to = t),
              (this.slice = n),
              (this.structure = r);
          }
          apply(e) {
            return this.structure && fe(e, this.from, this.to)
              ? oe.fail("Structure replace would overwrite content")
              : oe.fromReplace(e, this.from, this.to, this.slice);
          }
          getMap() {
            return new te([this.from, this.to - this.from, this.slice.size]);
          }
          invert(e) {
            return new ue(
              this.from,
              this.from + this.slice.size,
              e.slice(this.from, this.to)
            );
          }
          map(e) {
            let t = e.mapResult(this.from, 1),
              n = e.mapResult(this.to, -1);
            return t.deletedAcross && n.deletedAcross
              ? null
              : new ue(t.pos, Math.max(t.pos, n.pos), this.slice);
          }
          merge(e) {
            if (!(e instanceof ue) || e.structure || this.structure)
              return null;
            if (
              this.from + this.slice.size != e.from ||
              this.slice.openEnd ||
              e.slice.openStart
            ) {
              if (e.to != this.from || this.slice.openStart || e.slice.openEnd)
                return null;
              {
                let t =
                  this.slice.size + e.slice.size == 0
                    ? h.empty
                    : new h(
                        e.slice.content.append(this.slice.content),
                        e.slice.openStart,
                        this.slice.openEnd
                      );
                return new ue(e.from, this.to, t, this.structure);
              }
            }
            {
              let t =
                this.slice.size + e.slice.size == 0
                  ? h.empty
                  : new h(
                      this.slice.content.append(e.slice.content),
                      this.slice.openStart,
                      e.slice.openEnd
                    );
              return new ue(
                this.from,
                this.to + (e.to - e.from),
                t,
                this.structure
              );
            }
          }
          toJSON() {
            let e = { stepType: "replace", from: this.from, to: this.to };
            return (
              this.slice.size && (e.slice = this.slice.toJSON()),
              this.structure && (e.structure = !0),
              e
            );
          }
          static fromJSON(e, t) {
            if ("number" != typeof t.from || "number" != typeof t.to)
              throw new RangeError("Invalid input for ReplaceStep.fromJSON");
            return new ue(t.from, t.to, h.fromJSON(e, t.slice), !!t.structure);
          }
        }
        re.jsonID("replace", ue);
        class he extends re {
          constructor(e, t, n, r, o, i, s = !1) {
            super(),
              (this.from = e),
              (this.to = t),
              (this.gapFrom = n),
              (this.gapTo = r),
              (this.slice = o),
              (this.insert = i),
              (this.structure = s);
          }
          apply(e) {
            if (
              this.structure &&
              (fe(e, this.from, this.gapFrom) || fe(e, this.gapTo, this.to))
            )
              return oe.fail("Structure gap-replace would overwrite content");
            let t = e.slice(this.gapFrom, this.gapTo);
            if (t.openStart || t.openEnd)
              return oe.fail("Gap is not a flat range");
            let n = this.slice.insertAt(this.insert, t.content);
            return n
              ? oe.fromReplace(e, this.from, this.to, n)
              : oe.fail("Content does not fit in gap");
          }
          getMap() {
            return new te([
              this.from,
              this.gapFrom - this.from,
              this.insert,
              this.gapTo,
              this.to - this.gapTo,
              this.slice.size - this.insert,
            ]);
          }
          invert(e) {
            let t = this.gapTo - this.gapFrom;
            return new he(
              this.from,
              this.from + this.slice.size + t,
              this.from + this.insert,
              this.from + this.insert + t,
              e
                .slice(this.from, this.to)
                .removeBetween(
                  this.gapFrom - this.from,
                  this.gapTo - this.from
                ),
              this.gapFrom - this.from,
              this.structure
            );
          }
          map(e) {
            let t = e.mapResult(this.from, 1),
              n = e.mapResult(this.to, -1),
              r = e.map(this.gapFrom, -1),
              o = e.map(this.gapTo, 1);
            return (t.deletedAcross && n.deletedAcross) ||
              r < t.pos ||
              o > n.pos
              ? null
              : new he(
                  t.pos,
                  n.pos,
                  r,
                  o,
                  this.slice,
                  this.insert,
                  this.structure
                );
          }
          toJSON() {
            let e = {
              stepType: "replaceAround",
              from: this.from,
              to: this.to,
              gapFrom: this.gapFrom,
              gapTo: this.gapTo,
              insert: this.insert,
            };
            return (
              this.slice.size && (e.slice = this.slice.toJSON()),
              this.structure && (e.structure = !0),
              e
            );
          }
          static fromJSON(e, t) {
            if (
              "number" != typeof t.from ||
              "number" != typeof t.to ||
              "number" != typeof t.gapFrom ||
              "number" != typeof t.gapTo ||
              "number" != typeof t.insert
            )
              throw new RangeError(
                "Invalid input for ReplaceAroundStep.fromJSON"
              );
            return new he(
              t.from,
              t.to,
              t.gapFrom,
              t.gapTo,
              h.fromJSON(e, t.slice),
              t.insert,
              !!t.structure
            );
          }
        }
        function fe(e, t, n) {
          let r = e.resolve(t),
            o = n - t,
            i = r.depth;
          for (; o > 0 && i > 0 && r.indexAfter(i) == r.node(i).childCount; )
            i--, o--;
          if (o > 0) {
            let e = r.node(i).maybeChild(r.indexAfter(i));
            for (; o > 0; ) {
              if (!e || e.isLeaf) return !0;
              (e = e.firstChild), o--;
            }
          }
          return !1;
        }
        re.jsonID("replaceAround", he);
        class de extends re {
          constructor(e, t, n) {
            super(), (this.pos = e), (this.attr = t), (this.value = n);
          }
          apply(e) {
            let t = e.nodeAt(this.pos);
            if (!t) return oe.fail("No node at attribute step's position");
            let n = Object.create(null);
            for (let e in t.attrs) n[e] = t.attrs[e];
            n[this.attr] = this.value;
            let r = t.type.create(n, null, t.marks);
            return oe.fromReplace(
              e,
              this.pos,
              this.pos + 1,
              new h(i.from(r), 0, t.isLeaf ? 0 : 1)
            );
          }
          getMap() {
            return te.empty;
          }
          invert(e) {
            return new de(
              this.pos,
              this.attr,
              e.nodeAt(this.pos).attrs[this.attr]
            );
          }
          map(e) {
            let t = e.mapResult(this.pos, 1);
            return t.deletedAfter ? null : new de(t.pos, this.attr, this.value);
          }
          toJSON() {
            return {
              stepType: "attr",
              pos: this.pos,
              attr: this.attr,
              value: this.value,
            };
          }
          static fromJSON(e, t) {
            if ("number" != typeof t.pos || "string" != typeof t.attr)
              throw new RangeError("Invalid input for AttrStep.fromJSON");
            return new de(t.pos, t.attr, t.value);
          }
        }
        re.jsonID("attr", de);
        let pe = class extends Error {};
        (pe = function e(t) {
          let n = Error.call(this, t);
          return (n.__proto__ = e.prototype), n;
        }),
          ((pe.prototype = Object.create(Error.prototype)).constructor = pe),
          (pe.prototype.name = "TransformError");
        const me = Object.create(null);
        class ve {
          constructor(e, t, n) {
            (this.$anchor = e),
              (this.$head = t),
              (this.ranges = n || [new ge(e.min(t), e.max(t))]);
          }
          get anchor() {
            return this.$anchor.pos;
          }
          get head() {
            return this.$head.pos;
          }
          get from() {
            return this.$from.pos;
          }
          get to() {
            return this.$to.pos;
          }
          get $from() {
            return this.ranges[0].$from;
          }
          get $to() {
            return this.ranges[0].$to;
          }
          get empty() {
            let e = this.ranges;
            for (let t = 0; t < e.length; t++)
              if (e[t].$from.pos != e[t].$to.pos) return !1;
            return !0;
          }
          content() {
            return this.$from.doc.slice(this.from, this.to, !0);
          }
          replace(e, t = h.empty) {
            let n = t.content.lastChild,
              r = null;
            for (let e = 0; e < t.openEnd; e++) (r = n), (n = n.lastChild);
            let o = e.steps.length,
              i = this.ranges;
            for (let s = 0; s < i.length; s++) {
              let { $from: a, $to: l } = i[s],
                c = e.mapping.slice(o);
              e.replaceRange(c.map(a.pos), c.map(l.pos), s ? h.empty : t),
                0 == s &&
                  Ne(e, o, (n ? n.isInline : r && r.isTextblock) ? -1 : 1);
            }
          }
          replaceWith(e, t) {
            let n = e.steps.length,
              r = this.ranges;
            for (let o = 0; o < r.length; o++) {
              let { $from: i, $to: s } = r[o],
                a = e.mapping.slice(n),
                l = a.map(i.pos),
                c = a.map(s.pos);
              o
                ? e.deleteRange(l, c)
                : (e.replaceRangeWith(l, c, t), Ne(e, n, t.isInline ? -1 : 1));
            }
          }
          static findFrom(e, t, n = !1) {
            let r = e.parent.inlineContent
              ? new we(e)
              : Ce(e.node(0), e.parent, e.pos, e.index(), t, n);
            if (r) return r;
            for (let r = e.depth - 1; r >= 0; r--) {
              let o =
                t < 0
                  ? Ce(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n)
                  : Ce(
                      e.node(0),
                      e.node(r),
                      e.after(r + 1),
                      e.index(r) + 1,
                      t,
                      n
                    );
              if (o) return o;
            }
            return null;
          }
          static near(e, t = 1) {
            return (
              this.findFrom(e, t) || this.findFrom(e, -t) || new Me(e.node(0))
            );
          }
          static atStart(e) {
            return Ce(e, e, 0, 0, 1) || new Me(e);
          }
          static atEnd(e) {
            return Ce(e, e, e.content.size, e.childCount, -1) || new Me(e);
          }
          static fromJSON(e, t) {
            if (!t || !t.type)
              throw new RangeError("Invalid input for Selection.fromJSON");
            let n = me[t.type];
            if (!n) throw new RangeError(`No selection type ${t.type} defined`);
            return n.fromJSON(e, t);
          }
          static jsonID(e, t) {
            if (e in me)
              throw new RangeError("Duplicate use of selection JSON ID " + e);
            return (me[e] = t), (t.prototype.jsonID = e), t;
          }
          getBookmark() {
            return we.between(this.$anchor, this.$head).getBookmark();
          }
        }
        ve.prototype.visible = !0;
        class ge {
          constructor(e, t) {
            (this.$from = e), (this.$to = t);
          }
        }
        let ye = !1;
        function ke(e) {
          ye ||
            e.parent.inlineContent ||
            ((ye = !0),
            console.warn(
              "TextSelection endpoint not pointing into a node with inline content (" +
                e.parent.type.name +
                ")"
            ));
        }
        class we extends ve {
          constructor(e, t = e) {
            ke(e), ke(t), super(e, t);
          }
          get $cursor() {
            return this.$anchor.pos == this.$head.pos ? this.$head : null;
          }
          map(e, t) {
            let n = e.resolve(t.map(this.head));
            if (!n.parent.inlineContent) return ve.near(n);
            let r = e.resolve(t.map(this.anchor));
            return new we(r.parent.inlineContent ? r : n, n);
          }
          replace(e, t = h.empty) {
            if ((super.replace(e, t), t == h.empty)) {
              let t = this.$from.marksAcross(this.$to);
              t && e.ensureMarks(t);
            }
          }
          eq(e) {
            return (
              e instanceof we && e.anchor == this.anchor && e.head == this.head
            );
          }
          getBookmark() {
            return new be(this.anchor, this.head);
          }
          toJSON() {
            return { type: "text", anchor: this.anchor, head: this.head };
          }
          static fromJSON(e, t) {
            if ("number" != typeof t.anchor || "number" != typeof t.head)
              throw new RangeError("Invalid input for TextSelection.fromJSON");
            return new we(e.resolve(t.anchor), e.resolve(t.head));
          }
          static create(e, t, n = t) {
            let r = e.resolve(t);
            return new this(r, n == t ? r : e.resolve(n));
          }
          static between(e, t, n) {
            let r = e.pos - t.pos;
            if (((n && !r) || (n = r >= 0 ? 1 : -1), !t.parent.inlineContent)) {
              let e = ve.findFrom(t, n, !0) || ve.findFrom(t, -n, !0);
              if (!e) return ve.near(t, n);
              t = e.$head;
            }
            return (
              e.parent.inlineContent ||
                ((0 == r ||
                  (e = (ve.findFrom(e, -n, !0) || ve.findFrom(e, n, !0))
                    .$anchor).pos <
                    t.pos !=
                    r < 0) &&
                  (e = t)),
              new we(e, t)
            );
          }
        }
        ve.jsonID("text", we);
        class be {
          constructor(e, t) {
            (this.anchor = e), (this.head = t);
          }
          map(e) {
            return new be(e.map(this.anchor), e.map(this.head));
          }
          resolve(e) {
            return we.between(e.resolve(this.anchor), e.resolve(this.head));
          }
        }
        class Se extends ve {
          constructor(e) {
            let t = e.nodeAfter,
              n = e.node(0).resolve(e.pos + t.nodeSize);
            super(e, n), (this.node = t);
          }
          map(e, t) {
            let { deleted: n, pos: r } = t.mapResult(this.anchor),
              o = e.resolve(r);
            return n ? ve.near(o) : new Se(o);
          }
          content() {
            return new h(i.from(this.node), 0, 0);
          }
          eq(e) {
            return e instanceof Se && e.anchor == this.anchor;
          }
          toJSON() {
            return { type: "node", anchor: this.anchor };
          }
          getBookmark() {
            return new xe(this.anchor);
          }
          static fromJSON(e, t) {
            if ("number" != typeof t.anchor)
              throw new RangeError("Invalid input for NodeSelection.fromJSON");
            return new Se(e.resolve(t.anchor));
          }
          static create(e, t) {
            return new Se(e.resolve(t));
          }
          static isSelectable(e) {
            return !e.isText && !1 !== e.type.spec.selectable;
          }
        }
        (Se.prototype.visible = !1), ve.jsonID("node", Se);
        class xe {
          constructor(e) {
            this.anchor = e;
          }
          map(e) {
            let { deleted: t, pos: n } = e.mapResult(this.anchor);
            return t ? new be(n, n) : new xe(n);
          }
          resolve(e) {
            let t = e.resolve(this.anchor),
              n = t.nodeAfter;
            return n && Se.isSelectable(n) ? new Se(t) : ve.near(t);
          }
        }
        class Me extends ve {
          constructor(e) {
            super(e.resolve(0), e.resolve(e.content.size));
          }
          replace(e, t = h.empty) {
            if (t == h.empty) {
              e.delete(0, e.doc.content.size);
              let t = ve.atStart(e.doc);
              t.eq(e.selection) || e.setSelection(t);
            } else super.replace(e, t);
          }
          toJSON() {
            return { type: "all" };
          }
          static fromJSON(e) {
            return new Me(e);
          }
          map(e) {
            return new Me(e);
          }
          eq(e) {
            return e instanceof Me;
          }
          getBookmark() {
            return Oe;
          }
        }
        ve.jsonID("all", Me);
        const Oe = {
          map() {
            return this;
          },
          resolve: (e) => new Me(e),
        };
        function Ce(e, t, n, r, o, i = !1) {
          if (t.inlineContent) return we.create(e, n);
          for (
            let s = r - (o > 0 ? 0 : 1);
            o > 0 ? s < t.childCount : s >= 0;
            s += o
          ) {
            let r = t.child(s);
            if (r.isAtom) {
              if (!i && Se.isSelectable(r))
                return Se.create(e, n - (o < 0 ? r.nodeSize : 0));
            } else {
              let t = Ce(e, r, n + o, o < 0 ? r.childCount : 0, o, i);
              if (t) return t;
            }
            n += r.nodeSize * o;
          }
          return null;
        }
        function Ne(e, t, n) {
          let r = e.steps.length - 1;
          if (r < t) return;
          let o,
            i = e.steps[r];
          (i instanceof ue || i instanceof he) &&
            (e.mapping.maps[r].forEach((e, t, n, r) => {
              null == o && (o = r);
            }),
            e.setSelection(ve.near(e.doc.resolve(o), n)));
        }
        function Te(e, t) {
          return t && e ? e.bind(t) : e;
        }
        class De {
          constructor(e, t, n) {
            (this.name = e),
              (this.init = Te(t.init, n)),
              (this.apply = Te(t.apply, n));
          }
        }
        function Ee(e, t, n) {
          for (let r in e) {
            let o = e[r];
            o instanceof Function
              ? (o = o.bind(t))
              : "handleDOMEvents" == r && (o = Ee(o, t, {})),
              (n[r] = o);
          }
          return n;
        }
        new De("doc", {
          init: (e) => e.doc || e.schema.topNodeType.createAndFill(),
          apply: (e) => e.doc,
        }),
          new De("selection", {
            init: (e, t) => e.selection || ve.atStart(t.doc),
            apply: (e) => e.selection,
          }),
          new De("storedMarks", {
            init: (e) => e.storedMarks || null,
            apply: (e, t, n, r) => (r.selection.$cursor ? e.storedMarks : null),
          }),
          new De("scrollToSelection", {
            init: () => 0,
            apply: (e, t) => (e.scrolledIntoView ? t + 1 : t),
          });
        class Ae {
          constructor(e) {
            (this.spec = e),
              (this.props = {}),
              e.props && Ee(e.props, this, this.props),
              (this.key = e.key ? e.key.key : Pe("plugin"));
          }
          getState(e) {
            return e[this.key];
          }
        }
        const Re = Object.create(null);
        function Pe(e) {
          return e in Re ? e + "$" + ++Re[e] : ((Re[e] = 0), e + "$");
        }
        class Ie {
          constructor(e = "key") {
            this.key = Pe(e);
          }
          get(e) {
            return e.config.pluginsByKey[this.key];
          }
          getState(e) {
            return e[this.key];
          }
        }
        const ze = function (e) {
            for (var t = 0; ; t++) if (!(e = e.previousSibling)) return t;
          },
          Fe = function (e, t, n, r) {
            return n && ($e(e, t, n, r, -1) || $e(e, t, n, r, 1));
          },
          Be = /^(img|br|input|textarea|hr)$/i;
        function $e(e, t, n, r, o) {
          for (;;) {
            if (e == n && t == r) return !0;
            if (t == (o < 0 ? 0 : Ve(e))) {
              let n = e.parentNode;
              if (
                !n ||
                1 != n.nodeType ||
                je(e) ||
                Be.test(e.nodeName) ||
                "false" == e.contentEditable
              )
                return !1;
              (t = ze(e) + (o < 0 ? 0 : 1)), (e = n);
            } else {
              if (1 != e.nodeType) return !1;
              if (
                "false" ==
                (e = e.childNodes[t + (o < 0 ? -1 : 0)]).contentEditable
              )
                return !1;
              t = o < 0 ? Ve(e) : 0;
            }
          }
        }
        function Ve(e) {
          return 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length;
        }
        function je(e) {
          let t;
          for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
          return (
            t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e)
          );
        }
        const qe = function (e) {
          return (
            e.focusNode &&
            Fe(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
          );
        };
        function Le(e, t) {
          let n = document.createEvent("Event");
          return (
            n.initEvent("keydown", !0, !0),
            (n.keyCode = e),
            (n.key = n.code = t),
            n
          );
        }
        const Je = "undefined" != typeof navigator ? navigator : null,
          _e = "undefined" != typeof document ? document : null,
          We = (Je && Je.userAgent) || "",
          Ke = /Edge\/(\d+)/.exec(We),
          He = /MSIE \d/.exec(We),
          Ue = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(We),
          Ge = !!(He || Ue || Ke),
          Ze = He ? document.documentMode : Ue ? +Ue[1] : Ke ? +Ke[1] : 0,
          Xe = !Ge && /gecko\/(\d+)/i.test(We);
        Xe && (/Firefox\/(\d+)/.exec(We) || [0, 0])[1];
        const Ye = !Ge && /Chrome\/(\d+)/.exec(We),
          Qe = !!Ye,
          et = Ye ? +Ye[1] : 0,
          tt = !Ge && !!Je && /Apple Computer/.test(Je.vendor),
          nt =
            tt && (/Mobile\/\w+/.test(We) || (!!Je && Je.maxTouchPoints > 2)),
          rt = nt || (!!Je && /Mac/.test(Je.platform)),
          ot = /Android \d/.test(We),
          it = !!_e && "webkitFontSmoothing" in _e.documentElement.style,
          st = it
            ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
            : 0,
          at = function (e) {
            e && (this.nodeName = e);
          };
        function lt(e) {
          return e.editable
            ? e.hasFocus()
            : (function (e) {
                let t = e.domSelectionRange();
                if (!t.anchorNode) return !1;
                try {
                  return (
                    e.dom.contains(
                      3 == t.anchorNode.nodeType
                        ? t.anchorNode.parentNode
                        : t.anchorNode
                    ) &&
                    (e.editable ||
                      e.dom.contains(
                        3 == t.focusNode.nodeType
                          ? t.focusNode.parentNode
                          : t.focusNode
                      ))
                  );
                } catch (e) {
                  return !1;
                }
              })(e) &&
                document.activeElement &&
                document.activeElement.contains(e.dom);
        }
        function ct(e, t = !1) {
          let n = e.state.selection;
          if (
            ((function (e, t) {
              if (t instanceof Se) {
                let n = e.docView.descAt(t.from);
                n != e.lastSelectedViewDesc &&
                  (pt(e), n && n.selectNode(), (e.lastSelectedViewDesc = n));
              } else pt(e);
            })(e, n),
            lt(e))
          ) {
            if (
              !t &&
              e.input.mouseDown &&
              e.input.mouseDown.allowDefault &&
              Qe
            ) {
              let t = e.domSelectionRange(),
                n = e.domObserver.currentSelection;
              if (
                t.anchorNode &&
                n.anchorNode &&
                Fe(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset)
              )
                return (
                  (e.input.mouseDown.delayedSelectionSync = !0),
                  void e.domObserver.setCurSelection()
                );
            }
            if ((e.domObserver.disconnectSelection(), e.cursorWrapper))
              !(function (e) {
                let t = e.domSelection(),
                  n = document.createRange(),
                  r = e.cursorWrapper.dom,
                  o = "IMG" == r.nodeName;
                o ? n.setEnd(r.parentNode, ze(r) + 1) : n.setEnd(r, 0),
                  n.collapse(!1),
                  t.removeAllRanges(),
                  t.addRange(n),
                  !o &&
                    !e.state.selection.visible &&
                    Ge &&
                    Ze <= 11 &&
                    ((r.disabled = !0), (r.disabled = !1));
              })(e);
            else {
              let r,
                o,
                { anchor: i, head: s } = n;
              !ut ||
                n instanceof we ||
                (n.$from.parent.inlineContent || (r = ht(e, n.from)),
                n.empty || n.$from.parent.inlineContent || (o = ht(e, n.to))),
                e.docView.setSelection(i, s, e.root, t),
                ut && (r && dt(r), o && dt(o)),
                n.visible
                  ? e.dom.classList.remove("ProseMirror-hideselection")
                  : (e.dom.classList.add("ProseMirror-hideselection"),
                    "onselectionchange" in document &&
                      (function (e) {
                        let t = e.dom.ownerDocument;
                        t.removeEventListener(
                          "selectionchange",
                          e.input.hideSelectionGuard
                        );
                        let n = e.domSelectionRange(),
                          r = n.anchorNode,
                          o = n.anchorOffset;
                        t.addEventListener(
                          "selectionchange",
                          (e.input.hideSelectionGuard = () => {
                            (n.anchorNode == r && n.anchorOffset == o) ||
                              (t.removeEventListener(
                                "selectionchange",
                                e.input.hideSelectionGuard
                              ),
                              setTimeout(() => {
                                (lt(e) && !e.state.selection.visible) ||
                                  e.dom.classList.remove(
                                    "ProseMirror-hideselection"
                                  );
                              }, 20));
                          })
                        );
                      })(e));
            }
            e.domObserver.setCurSelection(), e.domObserver.connectSelection();
          }
        }
        (at.prototype = Object.create(null)), new at();
        const ut = tt || (Qe && et < 63);
        function ht(e, t) {
          let { node: n, offset: r } = e.docView.domFromPos(t, 0),
            o = r < n.childNodes.length ? n.childNodes[r] : null,
            i = r ? n.childNodes[r - 1] : null;
          if (tt && o && "false" == o.contentEditable) return ft(o);
          if (
            !(
              (o && "false" != o.contentEditable) ||
              (i && "false" != i.contentEditable)
            )
          ) {
            if (o) return ft(o);
            if (i) return ft(i);
          }
        }
        function ft(e) {
          return (
            (e.contentEditable = "true"),
            tt && e.draggable && ((e.draggable = !1), (e.wasDraggable = !0)),
            e
          );
        }
        function dt(e) {
          (e.contentEditable = "false"),
            e.wasDraggable && ((e.draggable = !0), (e.wasDraggable = null));
        }
        function pt(e) {
          e.lastSelectedViewDesc &&
            (e.lastSelectedViewDesc.parent &&
              e.lastSelectedViewDesc.deselectNode(),
            (e.lastSelectedViewDesc = void 0));
        }
        function mt(e, t, n, r) {
          return (
            e.someProp("createSelectionBetween", (r) => r(e, t, n)) ||
            we.between(t, n, r)
          );
        }
        function vt(e, t) {
          let { $anchor: n, $head: r } = e.selection,
            o = t > 0 ? n.max(r) : n.min(r),
            i = o.parent.inlineContent
              ? o.depth
                ? e.doc.resolve(t > 0 ? o.after() : o.before())
                : null
              : o;
          return i && ve.findFrom(i, t);
        }
        function gt(e, t) {
          return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
        }
        function yt(e, t, n) {
          let r = e.state.selection;
          if (!(r instanceof we)) {
            if (r instanceof Se && r.node.isInline)
              return gt(e, new we(t > 0 ? r.$to : r.$from));
            {
              let n = vt(e.state, t);
              return !!n && gt(e, n);
            }
          }
          if (!r.empty || n.indexOf("s") > -1) return !1;
          if (e.endOfTextblock(t > 0 ? "right" : "left")) {
            let n = vt(e.state, t);
            return !!(n && n instanceof Se) && gt(e, n);
          }
          if (!(rt && n.indexOf("m") > -1)) {
            let n,
              o = r.$head,
              i = o.textOffset ? null : t < 0 ? o.nodeBefore : o.nodeAfter;
            if (!i || i.isText) return !1;
            let s = t < 0 ? o.pos - i.nodeSize : o.pos;
            return (
              !!(i.isAtom || ((n = e.docView.descAt(s)) && !n.contentDOM)) &&
              (Se.isSelectable(i)
                ? gt(
                    e,
                    new Se(t < 0 ? e.state.doc.resolve(o.pos - i.nodeSize) : o)
                  )
                : !!it &&
                  gt(
                    e,
                    new we(e.state.doc.resolve(t < 0 ? s : s + i.nodeSize))
                  ))
            );
          }
        }
        function kt(e) {
          return 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length;
        }
        function wt(e) {
          let t = e.pmViewDesc;
          return t && 0 == t.size && (e.nextSibling || "BR" != e.nodeName);
        }
        function bt(e) {
          let t = e.domSelectionRange(),
            n = t.focusNode,
            r = t.focusOffset;
          if (!n) return;
          let o,
            i,
            s = !1;
          for (
            Xe &&
            1 == n.nodeType &&
            r < kt(n) &&
            wt(n.childNodes[r]) &&
            (s = !0);
            ;

          )
            if (r > 0) {
              if (1 != n.nodeType) break;
              {
                let e = n.childNodes[r - 1];
                if (wt(e)) (o = n), (i = --r);
                else {
                  if (3 != e.nodeType) break;
                  (n = e), (r = n.nodeValue.length);
                }
              }
            } else {
              if (xt(n)) break;
              {
                let t = n.previousSibling;
                for (; t && wt(t); )
                  (o = n.parentNode), (i = ze(t)), (t = t.previousSibling);
                if (t) (n = t), (r = kt(n));
                else {
                  if (((n = n.parentNode), n == e.dom)) break;
                  r = 0;
                }
              }
            }
          s ? Mt(e, n, r) : o && Mt(e, o, i);
        }
        function St(e) {
          let t = e.domSelectionRange(),
            n = t.focusNode,
            r = t.focusOffset;
          if (!n) return;
          let o,
            i,
            s = kt(n);
          for (;;)
            if (r < s) {
              if (1 != n.nodeType) break;
              if (!wt(n.childNodes[r])) break;
              (o = n), (i = ++r);
            } else {
              if (xt(n)) break;
              {
                let t = n.nextSibling;
                for (; t && wt(t); )
                  (o = t.parentNode), (i = ze(t) + 1), (t = t.nextSibling);
                if (t) (n = t), (r = 0), (s = kt(n));
                else {
                  if (((n = n.parentNode), n == e.dom)) break;
                  r = s = 0;
                }
              }
            }
          o && Mt(e, o, i);
        }
        function xt(e) {
          let t = e.pmViewDesc;
          return t && t.node && t.node.isBlock;
        }
        function Mt(e, t, n) {
          let r = e.domSelection();
          if (qe(r)) {
            let e = document.createRange();
            e.setEnd(t, n),
              e.setStart(t, n),
              r.removeAllRanges(),
              r.addRange(e);
          } else r.extend && r.extend(t, n);
          e.domObserver.setCurSelection();
          let { state: o } = e;
          setTimeout(() => {
            e.state == o && ct(e);
          }, 50);
        }
        function Ot(e, t, n) {
          let r = e.state.selection;
          if ((r instanceof we && !r.empty) || n.indexOf("s") > -1) return !1;
          if (rt && n.indexOf("m") > -1) return !1;
          let { $from: o, $to: i } = r;
          if (
            !o.parent.inlineContent ||
            e.endOfTextblock(t < 0 ? "up" : "down")
          ) {
            let n = vt(e.state, t);
            if (n && n instanceof Se) return gt(e, n);
          }
          if (!o.parent.inlineContent) {
            let n = t < 0 ? o : i,
              s = r instanceof Me ? ve.near(n, t) : ve.findFrom(n, t);
            return !!s && gt(e, s);
          }
          return !1;
        }
        function Ct(e, t) {
          if (!(e.state.selection instanceof we)) return !0;
          let { $head: n, $anchor: r, empty: o } = e.state.selection;
          if (!n.sameParent(r)) return !0;
          if (!o) return !1;
          if (e.endOfTextblock(t > 0 ? "forward" : "backward")) return !0;
          let i = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter);
          if (i && !i.isText) {
            let r = e.state.tr;
            return (
              t < 0
                ? r.delete(n.pos - i.nodeSize, n.pos)
                : r.delete(n.pos, n.pos + i.nodeSize),
              e.dispatch(r),
              !0
            );
          }
          return !1;
        }
        function Nt(e, t, n) {
          e.domObserver.stop(), (t.contentEditable = n), e.domObserver.start();
        }
        function Tt(e, t) {
          e.someProp("transformCopied", (n) => {
            t = n(t, e);
          });
          let n = [],
            { content: r, openStart: o, openEnd: i } = t;
          for (
            ;
            o > 1 && i > 1 && 1 == r.childCount && 1 == r.firstChild.childCount;

          ) {
            o--, i--;
            let e = r.firstChild;
            n.push(
              e.type.name,
              e.attrs != e.type.defaultAttrs ? e.attrs : null
            ),
              (r = e.content);
          }
          let s =
              e.someProp("clipboardSerializer") || G.fromSchema(e.state.schema),
            a = $t(),
            l = a.createElement("div");
          l.appendChild(s.serializeFragment(r, { document: a }));
          let c,
            u = l.firstChild,
            h = 0;
          for (; u && 1 == u.nodeType && (c = Ft[u.nodeName.toLowerCase()]); ) {
            for (let e = c.length - 1; e >= 0; e--) {
              let t = a.createElement(c[e]);
              for (; l.firstChild; ) t.appendChild(l.firstChild);
              l.appendChild(t), h++;
            }
            u = l.firstChild;
          }
          return (
            u &&
              1 == u.nodeType &&
              u.setAttribute(
                "data-pm-slice",
                `${o} ${i}${h ? ` -${h}` : ""} ${JSON.stringify(n)}`
              ),
            {
              dom: l,
              text:
                e.someProp("clipboardTextSerializer", (n) => n(t, e)) ||
                t.content.textBetween(0, t.content.size, "\n\n"),
            }
          );
        }
        function Dt(e, t, n, r, o) {
          let s,
            a,
            l = o.parent.type.spec.code;
          if (!n && !t) return null;
          let c = t && (r || l || !n);
          if (c) {
            if (
              (e.someProp("transformPastedText", (n) => {
                t = n(t, l || r, e);
              }),
              l)
            )
              return t
                ? new h(
                    i.from(e.state.schema.text(t.replace(/\r\n?/g, "\n"))),
                    0,
                    0
                  )
                : h.empty;
            let n = e.someProp("clipboardTextParser", (n) => n(t, o, r, e));
            if (n) a = n;
            else {
              let n = o.marks(),
                { schema: r } = e.state,
                i = G.fromSchema(r);
              (s = document.createElement("div")),
                t.split(/(?:\r\n?|\n)+/).forEach((e) => {
                  let t = s.appendChild(document.createElement("p"));
                  // console.log("entro");
                  e && t.appendChild(i.serializeNode(r.text(e, n)));
                });
            }
          } else
            e.someProp("transformPastedHTML", (t) => {
              
              n = t(n, e);
            }),
              (s = (function (e) {
                let t = /^(\s*<meta [^>]*>)*/.exec(e);
                t && (e = e.slice(t[0].length));
                let n,
                  r = $t().createElement("div"),
                  o = /<([a-z][^>\s]+)/i.exec(e);
                if (
                  ((n = o && Ft[o[1].toLowerCase()]) &&
                    (e =
                      n.map((e) => "<" + e + ">").join("") +
                      e +
                      n
                        .map((e) => "</" + e + ">")
                        .reverse()
                        .join("")),
                  (r.innerHTML = e),
                  n)
                )
                  for (let e = 0; e < n.length; e++)
                    r = r.querySelector(n[e]) || r;
                return r;
              })(n)),
              it &&
                (function (e) {
                  let t = e.querySelectorAll(
                    Qe
                      ? "span:not([class]):not([style])"
                      : "span.Apple-converted-space"
                  );
                  for (let n = 0; n < t.length; n++) {
                    let r = t[n];
                    1 == r.childNodes.length &&
                      " " == r.textContent &&
                      r.parentNode &&
                      r.parentNode.replaceChild(
                        e.ownerDocument.createTextNode(" "),
                        r
                      );
                  }
                })(s);
          let u = s && s.querySelector("[data-pm-slice]"),
            f =
              u &&
              /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(
                u.getAttribute("data-pm-slice") || ""
              );
          if (f && f[3])
            for (let e = +f[3]; e > 0; e--) {
              let e = s.firstChild;
              for (; e && 1 != e.nodeType; ) e = e.nextSibling;
              if (!e) break;
              s = e;
            }
          if (!a) {
            let t =
              e.someProp("clipboardParser") ||
              e.someProp("domParser") ||
              V.fromSchema(e.state.schema);
            a = t.parseSlice(s, {
              preserveWhitespace: !(!c && !f),
              context: o,
              ruleFromNode: (e) =>
                "BR" != e.nodeName ||
                e.nextSibling ||
                !e.parentNode ||
                Et.test(e.parentNode.nodeName)
                  ? null
                  : { ignore: !0 },
            });
          }
          if (f)
            a = (function (e, t) {
              if (!e.size) return e;
              let n,
                r = e.content.firstChild.type.schema;
              try {
                n = JSON.parse(t);
              } catch (t) {
                return e;
              }
              let { content: o, openStart: s, openEnd: a } = e;
              for (let e = n.length - 2; e >= 0; e -= 2) {
                let t = r.nodes[n[e]];
                if (!t || t.hasRequiredAttrs()) break;
                (o = i.from(t.create(n[e + 1], o))), s++, a++;
              }
              return new h(o, s, a);
            })(zt(a, +f[1], +f[2]), f[4]);
          else if (
            ((a = h.maxOpen(
              (function (e, t) {
                if (e.childCount < 2) return e;
                for (let n = t.depth; n >= 0; n--) {
                  let r,
                    o = t.node(n).contentMatchAt(t.index(n)),
                    s = [];
                  if (
                    (e.forEach((e) => {
                      if (!s) return;
                      let t,
                        n = o.findWrapping(e.type);
                      if (!n) return (s = null);
                      if (
                        (t =
                          s.length &&
                          r.length &&
                          Rt(n, r, e, s[s.length - 1], 0))
                      )
                        s[s.length - 1] = t;
                      else {
                        s.length &&
                          (s[s.length - 1] = Pt(s[s.length - 1], r.length));
                        let t = At(e, n);
                        s.push(t), (o = o.matchType(t.type)), (r = n);
                      }
                    }),
                    s)
                  )
                    return i.from(s);
                }
                return e;
              })(a.content, o),
              !0
            )),
            a.openStart || a.openEnd)
          ) {
            let e = 0,
              t = 0;
            for (
              let t = a.content.firstChild;
              e < a.openStart && !t.type.spec.isolating;
              e++, t = t.firstChild
            );
            for (
              let e = a.content.lastChild;
              t < a.openEnd && !e.type.spec.isolating;
              t++, e = e.lastChild
            );
            a = zt(a, e, t);
          }
          return (
            e.someProp("transformPasted", (t) => {
              a = t(a, e);
            }),
            a
          );
        }
        const Et =
          /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
        function At(e, t, n = 0) {
          for (let r = t.length - 1; r >= n; r--)
            e = t[r].create(null, i.from(e));
          return e;
        }
        function Rt(e, t, n, r, o) {
          if (o < e.length && o < t.length && e[o] == t[o]) {
            let s = Rt(e, t, n, r.lastChild, o + 1);
            if (s) return r.copy(r.content.replaceChild(r.childCount - 1, s));
            if (
              r
                .contentMatchAt(r.childCount)
                .matchType(o == e.length - 1 ? n.type : e[o + 1])
            )
              return r.copy(r.content.append(i.from(At(n, e, o + 1))));
          }
        }
        function Pt(e, t) {
          if (0 == t) return e;
          let n = e.content.replaceChild(
              e.childCount - 1,
              Pt(e.lastChild, t - 1)
            ),
            r = e.contentMatchAt(e.childCount).fillBefore(i.empty, !0);
          return e.copy(n.append(r));
        }
        function It(e, t, n, r, o, s) {
          let a = t < 0 ? e.firstChild : e.lastChild,
            l = a.content;
          return (
            o < r - 1 && (l = It(l, t, n, r, o + 1, s)),
            o >= n &&
              (l =
                t < 0
                  ? a
                      .contentMatchAt(0)
                      .fillBefore(l, e.childCount > 1 || s <= o)
                      .append(l)
                  : l.append(
                      a.contentMatchAt(a.childCount).fillBefore(i.empty, !0)
                    )),
            e.replaceChild(t < 0 ? 0 : e.childCount - 1, a.copy(l))
          );
        }
        function zt(e, t, n) {
          return (
            t < e.openStart &&
              (e = new h(
                It(e.content, -1, t, e.openStart, 0, e.openEnd),
                t,
                e.openEnd
              )),
            n < e.openEnd &&
              (e = new h(It(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)),
            e
          );
        }
        const Ft = {
          thead: ["table"],
          tbody: ["table"],
          tfoot: ["table"],
          caption: ["table"],
          colgroup: ["table"],
          col: ["table", "colgroup"],
          tr: ["table", "tbody"],
          td: ["table", "tbody", "tr"],
          th: ["table", "tbody", "tr"],
        };
        let Bt = null;
        function $t() {
          return (
            Bt || (Bt = document.implementation.createHTMLDocument("title"))
          );
        }
        const Vt = {},
          jt = {};
        function qt(e, t) {
          (e.input.lastSelectionOrigin = t),
            (e.input.lastSelectionTime = Date.now());
        }
        function Lt(e) {
          return { left: e.clientX, top: e.clientY };
        }
        function Jt(e, t, n, r, o) {
          if (-1 == r) return !1;
          let i = e.state.doc.resolve(r);
          for (let r = i.depth + 1; r > 0; r--)
            if (
              e.someProp(t, (t) =>
                r > i.depth
                  ? t(e, n, i.nodeAfter, i.before(r), o, !0)
                  : t(e, n, i.node(r), i.before(r), o, !1)
              )
            )
              return !0;
          return !1;
        }
        function _t(e, t, n) {
          e.focused || e.focus();
          let r = e.state.tr.setSelection(t);
          "pointer" == n && r.setMeta("pointer", !0), e.dispatch(r);
        }
        function Wt(e, t, n, r) {
          return (
            Jt(e, "handleDoubleClickOn", t, n, r) ||
            e.someProp("handleDoubleClick", (n) => n(e, t, r))
          );
        }
        function Kt(e, t, n, r) {
          return (
            Jt(e, "handleTripleClickOn", t, n, r) ||
            e.someProp("handleTripleClick", (n) => n(e, t, r)) ||
            (function (e, t, n) {
              if (0 != n.button) return !1;
              let r = e.state.doc;
              if (-1 == t)
                return (
                  !!r.inlineContent &&
                  (_t(e, we.create(r, 0, r.content.size), "pointer"), !0)
                );
              let o = r.resolve(t);
              for (let t = o.depth + 1; t > 0; t--) {
                let n = t > o.depth ? o.nodeAfter : o.node(t),
                  i = o.before(t);
                if (n.inlineContent)
                  _t(e, we.create(r, i + 1, i + 1 + n.content.size), "pointer");
                else {
                  if (!Se.isSelectable(n)) continue;
                  _t(e, Se.create(r, i), "pointer");
                }
                return !0;
              }
            })(e, n, r)
          );
        }
        function Ht(e) {
          return Qt(e);
        }
        (jt.keydown = (e, t) => {
          let n = t;          
          if (
            ((e.input.shiftKey = 16 == n.keyCode || n.shiftKey),
            !Zt(e, n) &&
              ((e.input.lastKeyCode = n.keyCode),
              (e.input.lastKeyCodeTime = Date.now()),
              !ot || !Qe || 13 != n.keyCode))
          )
            if (
              (229 != n.keyCode && e.domObserver.forceFlush(),
              !nt || 13 != n.keyCode || n.ctrlKey || n.altKey || n.metaKey)
            )
              e.someProp("handleKeyDown", (t) => t(e, n)) ||
              (function (e, t) {
                let n = t.keyCode,
                  r = (function (e) {
                    let t = "";
                    return (
                      e.ctrlKey && (t += "c"),
                      e.metaKey && (t += "m"),
                      e.altKey && (t += "a"),
                      e.shiftKey && (t += "s"),
                      t
                    );
                  })(t);
                return 8 == n || (rt && 72 == n && "c" == r)
                  ? Ct(e, -1) || bt(e)
                  : 46 == n || (rt && 68 == n && "c" == r)
                  ? Ct(e, 1) || St(e)
                  : 13 == n ||
                    27 == n ||
                    (37 == n || (rt && 66 == n && "c" == r)
                      ? yt(e, -1, r) || bt(e)
                      : 39 == n || (rt && 70 == n && "c" == r)
                      ? yt(e, 1, r) || St(e)
                      : 38 == n || (rt && 80 == n && "c" == r)
                      ? Ot(e, -1, r) || bt(e)
                      : 40 == n || (rt && 78 == n && "c" == r)
                      ? (function (e) {
                          if (!tt || e.state.selection.$head.parentOffset > 0)
                            return !1;
                          let { focusNode: t, focusOffset: n } =
                            e.domSelectionRange();
                          if (
                            t &&
                            1 == t.nodeType &&
                            0 == n &&
                            t.firstChild &&
                            "false" == t.firstChild.contentEditable
                          ) {
                            let n = t.firstChild;
                            Nt(e, n, "true"),
                              setTimeout(() => Nt(e, n, "false"), 20);
                          }
                          return !1;
                        })(e) ||
                        Ot(e, 1, r) ||
                        St(e)
                      : r == (rt ? "m" : "c") &&
                        (66 == n || 73 == n || 89 == n || 90 == n));
              })(e, n)
                ? n.preventDefault()
                : qt(e, "key");
            else {
              let t = Date.now();
              (e.input.lastIOSEnter = t),
                (e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
                  e.input.lastIOSEnter == t &&
                    (e.someProp("handleKeyDown", (t) => t(e, Le(13, "Enter"))),
                    (e.input.lastIOSEnter = 0));
                }, 200));
            }
        }),
          (jt.keyup = (e, t) => {
            16 == t.keyCode && (e.input.shiftKey = !1);
          }),
          (jt.keypress = (e, t) => {
            let n = t;
            if (
              Zt(e, n) ||
              !n.charCode ||
              (n.ctrlKey && !n.altKey) ||
              (rt && n.metaKey)
            )
              return;
            if (e.someProp("handleKeyPress", (t) => t(e, n)))
              return void n.preventDefault();
            let r = e.state.selection;
            if (!(r instanceof we && r.$from.sameParent(r.$to))) {
              let t = String.fromCharCode(n.charCode);
              /[\r\n]/.test(t) ||
                e.someProp("handleTextInput", (n) =>
                  n(e, r.$from.pos, r.$to.pos, t)
                ) ||
                e.dispatch(e.state.tr.insertText(t).scrollIntoView()),
                n.preventDefault();
            }
          });
        const Ut = rt ? "metaKey" : "ctrlKey";
        Vt.mousedown = (e, t) => {
          let n = t;
          e.input.shiftKey = n.shiftKey;
          let r = Ht(e),
            o = Date.now(),
            i = "singleClick";
          o - e.input.lastClick.time < 500 &&
            (function (e, t) {
              let n = t.x - e.clientX,
                r = t.y - e.clientY;
              return n * n + r * r < 100;
            })(n, e.input.lastClick) &&
            !n[Ut] &&
            ("singleClick" == e.input.lastClick.type
              ? (i = "doubleClick")
              : "doubleClick" == e.input.lastClick.type && (i = "tripleClick")),
            (e.input.lastClick = {
              time: o,
              x: n.clientX,
              y: n.clientY,
              type: i,
            });
          let s = e.posAtCoords(Lt(n));
          s &&
            ("singleClick" == i
              ? (e.input.mouseDown && e.input.mouseDown.done(),
                (e.input.mouseDown = new Gt(e, s, n, !!r)))
              : ("doubleClick" == i ? Wt : Kt)(e, s.pos, s.inside, n)
              ? n.preventDefault()
              : qt(e, "pointer"));
        };
        class Gt {
          constructor(e, t, n, r) {
            let o, i;
            if (
              ((this.view = e),
              (this.pos = t),
              (this.event = n),
              (this.flushed = r),
              (this.delayedSelectionSync = !1),
              (this.mightDrag = null),
              (this.startDoc = e.state.doc),
              (this.selectNode = !!n[Ut]),
              (this.allowDefault = n.shiftKey),
              t.inside > -1)
            )
              (o = e.state.doc.nodeAt(t.inside)), (i = t.inside);
            else {
              let n = e.state.doc.resolve(t.pos);
              (o = n.parent), (i = n.depth ? n.before() : 0);
            }
            const s = r ? null : n.target,
              a = s ? e.docView.nearestDesc(s, !0) : null;
            this.target = a ? a.dom : null;
            let { selection: l } = e.state;
            ((0 == n.button &&
              o.type.spec.draggable &&
              !1 !== o.type.spec.selectable) ||
              (l instanceof Se && l.from <= i && l.to > i)) &&
              (this.mightDrag = {
                node: o,
                pos: i,
                addAttr: !(!this.target || this.target.draggable),
                setUneditable: !(
                  !this.target ||
                  !Xe ||
                  this.target.hasAttribute("contentEditable")
                ),
              }),
              this.target &&
                this.mightDrag &&
                (this.mightDrag.addAttr || this.mightDrag.setUneditable) &&
                (this.view.domObserver.stop(),
                this.mightDrag.addAttr && (this.target.draggable = !0),
                this.mightDrag.setUneditable &&
                  setTimeout(() => {
                    this.view.input.mouseDown == this &&
                      this.target.setAttribute("contentEditable", "false");
                  }, 20),
                this.view.domObserver.start()),
              e.root.addEventListener(
                "mouseup",
                (this.up = this.up.bind(this))
              ),
              e.root.addEventListener(
                "mousemove",
                (this.move = this.move.bind(this))
              ),
              qt(e, "pointer");
          }
          done() {
            this.view.root.removeEventListener("mouseup", this.up),
              this.view.root.removeEventListener("mousemove", this.move),
              this.mightDrag &&
                this.target &&
                (this.view.domObserver.stop(),
                this.mightDrag.addAttr &&
                  this.target.removeAttribute("draggable"),
                this.mightDrag.setUneditable &&
                  this.target.removeAttribute("contentEditable"),
                this.view.domObserver.start()),
              this.delayedSelectionSync && setTimeout(() => ct(this.view)),
              (this.view.input.mouseDown = null);
          }
          up(e) {
            if ((this.done(), !this.view.dom.contains(e.target))) return;
            let t = this.pos;
            this.view.state.doc != this.startDoc &&
              (t = this.view.posAtCoords(Lt(e))),
              this.updateAllowDefault(e),
              this.allowDefault || !t
                ? qt(this.view, "pointer")
                : (function (e, t, n, r, o) {
                    return (
                      Jt(e, "handleClickOn", t, n, r) ||
                      e.someProp("handleClick", (n) => n(e, t, r)) ||
                      (o
                        ? (function (e, t) {
                            if (-1 == t) return !1;
                            let n,
                              r,
                              o = e.state.selection;
                            o instanceof Se && (n = o.node);
                            let i = e.state.doc.resolve(t);
                            for (let e = i.depth + 1; e > 0; e--) {
                              let t = e > i.depth ? i.nodeAfter : i.node(e);
                              if (Se.isSelectable(t)) {
                                r =
                                  n &&
                                  o.$from.depth > 0 &&
                                  e >= o.$from.depth &&
                                  i.before(o.$from.depth + 1) == o.$from.pos
                                    ? i.before(o.$from.depth)
                                    : i.before(e);
                                break;
                              }
                            }
                            return (
                              null != r &&
                              (_t(e, Se.create(e.state.doc, r), "pointer"), !0)
                            );
                          })(e, n)
                        : (function (e, t) {
                            if (-1 == t) return !1;
                            let n = e.state.doc.resolve(t),
                              r = n.nodeAfter;
                            return (
                              !!(r && r.isAtom && Se.isSelectable(r)) &&
                              (_t(e, new Se(n), "pointer"), !0)
                            );
                          })(e, n))
                    );
                  })(this.view, t.pos, t.inside, e, this.selectNode)
                ? e.preventDefault()
                : 0 == e.button &&
                  (this.flushed ||
                    (tt && this.mightDrag && !this.mightDrag.node.isAtom) ||
                    (Qe &&
                      !this.view.state.selection.visible &&
                      Math.min(
                        Math.abs(t.pos - this.view.state.selection.from),
                        Math.abs(t.pos - this.view.state.selection.to)
                      ) <= 2))
                ? (_t(
                    this.view,
                    ve.near(this.view.state.doc.resolve(t.pos)),
                    "pointer"
                  ),
                  e.preventDefault())
                : qt(this.view, "pointer");
          }
          move(e) {
            this.updateAllowDefault(e),
              qt(this.view, "pointer"),
              0 == e.buttons && this.done();
          }
          updateAllowDefault(e) {
            !this.allowDefault &&
              (Math.abs(this.event.x - e.clientX) > 4 ||
                Math.abs(this.event.y - e.clientY) > 4) &&
              (this.allowDefault = !0);
          }
        }
        function Zt(e, t) {
          return (
            !!e.composing ||
            (!!(
              tt && Math.abs(t.timeStamp - e.input.compositionEndedAt) < 500
            ) &&
              ((e.input.compositionEndedAt = -2e8), !0))
          );
        }
        (Vt.touchstart = (e) => {
          (e.input.lastTouch = Date.now()), Ht(e), qt(e, "pointer");
        }),
          (Vt.touchmove = (e) => {
            (e.input.lastTouch = Date.now()), qt(e, "pointer");
          }),
          (Vt.contextmenu = (e) => Ht(e));
        const Xt = ot ? 5e3 : -1;
        function Yt(e, t) {
          clearTimeout(e.input.composingTimeout),
            t > -1 && (e.input.composingTimeout = setTimeout(() => Qt(e), t));
        }
        function Qt(e, t = !1) {
          if (!(ot && e.domObserver.flushingSoon >= 0)) {
            if (
              (e.domObserver.forceFlush(),
              (function (e) {
                for (
                  e.composing &&
                  ((e.input.composing = !1),
                  (e.input.compositionEndedAt = (function () {
                    let e = document.createEvent("Event");
                    return e.initEvent("event", !0, !0), e.timeStamp;
                  })()));
                  e.input.compositionNodes.length > 0;

                )
                  e.input.compositionNodes.pop().markParentsDirty();
              })(e),
              t || (e.docView && e.docView.dirty))
            ) {
              let t = (function (e, t = null) {
                let n = e.domSelectionRange(),
                  r = e.state.doc;
                if (!n.focusNode) return null;
                let o = e.docView.nearestDesc(n.focusNode),
                  i = o && 0 == o.size,
                  s = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
                if (s < 0) return null;
                let a,
                  l,
                  c = r.resolve(s);
                if (qe(n)) {
                  for (a = c; o && !o.node; ) o = o.parent;
                  let e = o.node;
                  if (
                    o &&
                    e.isAtom &&
                    Se.isSelectable(e) &&
                    o.parent &&
                    (!e.isInline ||
                      !(function (e, t, n) {
                        for (let r = 0 == t, o = t == Ve(e); r || o; ) {
                          if (e == n) return !0;
                          let t = ze(e);
                          if (!(e = e.parentNode)) return !1;
                          (r = r && 0 == t), (o = o && t == Ve(e));
                        }
                      })(n.focusNode, n.focusOffset, o.dom))
                  ) {
                    let e = o.posBefore;
                    l = new Se(s == e ? c : r.resolve(e));
                  }
                } else {
                  let t = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
                  if (t < 0) return null;
                  a = r.resolve(t);
                }
                return (
                  l ||
                    (l = mt(
                      e,
                      a,
                      c,
                      "pointer" == t || (e.state.selection.head < c.pos && !i)
                        ? 1
                        : -1
                    )),
                  l
                );
              })(e);
              return (
                t && !t.eq(e.state.selection)
                  ? e.dispatch(e.state.tr.setSelection(t))
                  : e.updateState(e.state),
                !0
              );
            }
            return !1;
          }
        }
        (jt.compositionstart = jt.compositionupdate =
          (e) => {
            if (!e.composing) {
              e.domObserver.flush();
              let { state: t } = e,
                n = t.selection.$from;
              if (
                t.selection.empty &&
                (t.storedMarks ||
                  (!n.textOffset &&
                    n.parentOffset &&
                    n.nodeBefore.marks.some(
                      (e) => !1 === e.type.spec.inclusive
                    )))
              )
                (e.markCursor = e.state.storedMarks || n.marks()),
                  Qt(e, !0),
                  (e.markCursor = null);
              else if (
                (Qt(e),
                Xe &&
                  t.selection.empty &&
                  n.parentOffset &&
                  !n.textOffset &&
                  n.nodeBefore.marks.length)
              ) {
                let t = e.domSelectionRange();
                for (
                  let n = t.focusNode, r = t.focusOffset;
                  n && 1 == n.nodeType && 0 != r;

                ) {
                  let t = r < 0 ? n.lastChild : n.childNodes[r - 1];
                  if (!t) break;
                  if (3 == t.nodeType) {
                    e.domSelection().collapse(t, t.nodeValue.length);
                    break;
                  }
                  (n = t), (r = -1);
                }
              }
              e.input.composing = !0;
            }
            Yt(e, Xt);
          }),
          (jt.compositionend = (e, t) => {
            e.composing &&
              ((e.input.composing = !1),
              (e.input.compositionEndedAt = t.timeStamp),
              Yt(e, 20));
          });
        const en = (Ge && Ze < 15) || (nt && st < 604);
        function tn(e, t, n, r, o) {
          let i = Dt(e, t, n, r, e.state.selection.$from);
          if (e.someProp("handlePaste", (t) => t(e, o, i || h.empty)))
            return !0;
          if (!i) return !1;
          let s = (function (e) {
              return 0 == e.openStart &&
                0 == e.openEnd &&
                1 == e.content.childCount
                ? e.content.firstChild
                : null;
            })(i),
            a = s
              ? e.state.tr.replaceSelectionWith(s, e.input.shiftKey)
              : e.state.tr.replaceSelection(i);
          return (
            e.dispatch(
              a
                .scrollIntoView()
                .setMeta("paste", !0)
                .setMeta("uiEvent", "paste")
            ),
            !0
          );
        }
        (Vt.copy = jt.cut =
          (e, t) => {
            let n = t,
              r = e.state.selection,
              o = "cut" == n.type;
            if (r.empty) return;
            let i = en ? null : n.clipboardData,
              s = r.content(),
              { dom: a, text: l } = Tt(e, s);
            i
              ? (n.preventDefault(),
                i.clearData(),
                i.setData("text/html", a.innerHTML),
                i.setData("text/plain", l))
              : (function (e, t) {
                  if (!e.dom.parentNode) return;
                  let n = e.dom.parentNode.appendChild(
                    document.createElement("div")
                  );
                  n.appendChild(t),
                    (n.style.cssText =
                      "position: fixed; left: -10000px; top: 10px");
                  let r = getSelection(),
                    o = document.createRange();
                  o.selectNodeContents(t),
                    e.dom.blur(),
                    r.removeAllRanges(),
                    r.addRange(o),
                    setTimeout(() => {
                      n.parentNode && n.parentNode.removeChild(n), e.focus();
                    }, 50);
                })(e, a),
              o &&
                e.dispatch(
                  e.state.tr
                    .deleteSelection()
                    .scrollIntoView()
                    .setMeta("uiEvent", "cut")
                );
          }),
          (jt.paste = (e, t) => {
            let n = t;
            if (e.composing && !ot) return;
            let r = en ? null : n.clipboardData;
            r &&
            tn(
              e,
              r.getData("text/plain"),
              r.getData("text/html"),
              e.input.shiftKey,
              n
            )
              ? n.preventDefault()
              : (function (e, t) {
                  if (!e.dom.parentNode) return;
                  let n =
                      e.input.shiftKey ||
                      e.state.selection.$from.parent.type.spec.code,
                    r = e.dom.parentNode.appendChild(
                      document.createElement(n ? "textarea" : "div")
                    );
                  n || (r.contentEditable = "true"),
                    (r.style.cssText =
                      "position: fixed; left: -10000px; top: 10px"),
                    r.focus(),
                    setTimeout(() => {
                      e.focus(),
                        r.parentNode && r.parentNode.removeChild(r),
                        n
                          ? tn(e, r.value, null, e.input.shiftKey, t)
                          : tn(
                              e,
                              r.textContent,
                              r.innerHTML,
                              e.input.shiftKey,
                              t
                            );
                    }, 50);
                })(e, n);
          });
        class nn {
          constructor(e, t) {
            (this.slice = e), (this.move = t);
          }
        }
        const rn = rt ? "altKey" : "ctrlKey";
        (Vt.dragstart = (e, t) => {
          let n = t,
            r = e.input.mouseDown;
          if ((r && r.done(), !n.dataTransfer)) return;
          let o = e.state.selection,
            i = o.empty ? null : e.posAtCoords(Lt(n));
          if (
            i &&
            i.pos >= o.from &&
            i.pos <= (o instanceof Se ? o.to - 1 : o.to)
          );
          else if (r && r.mightDrag)
            e.dispatch(
              e.state.tr.setSelection(Se.create(e.state.doc, r.mightDrag.pos))
            );
          else if (n.target && 1 == n.target.nodeType) {
            let t = e.docView.nearestDesc(n.target, !0);
            t &&
              t.node.type.spec.draggable &&
              t != e.docView &&
              e.dispatch(
                e.state.tr.setSelection(Se.create(e.state.doc, t.posBefore))
              );
          }
          let s = e.state.selection.content(),
            { dom: a, text: l } = Tt(e, s);
          n.dataTransfer.clearData(),
            n.dataTransfer.setData(en ? "Text" : "text/html", a.innerHTML),
            (n.dataTransfer.effectAllowed = "copyMove"),
            en || n.dataTransfer.setData("text/plain", l),
            (e.dragging = new nn(s, !n[rn]));
        }),
          (Vt.dragend = (e) => {
            let t = e.dragging;
            window.setTimeout(() => {
              e.dragging == t && (e.dragging = null);
            }, 50);
          }),
          (jt.dragover = jt.dragenter = (e, t) => t.preventDefault()),
          (jt.drop = (e, t) => {
            let n = t,
              r = e.dragging;
            if (((e.dragging = null), !n.dataTransfer)) return;
            let o = e.posAtCoords(Lt(n));
            if (!o) return;
            let i = e.state.doc.resolve(o.pos),
              s = r && r.slice;
            s
              ? e.someProp("transformPasted", (t) => {
                  s = t(s, e);
                })
              : (s = Dt(
                  e,
                  n.dataTransfer.getData(en ? "Text" : "text/plain"),
                  en ? null : n.dataTransfer.getData("text/html"),
                  !1,
                  i
                ));
            let a = !(!r || n[rn]);
            if (e.someProp("handleDrop", (t) => t(e, n, s || h.empty, a)))
              return void n.preventDefault();
            if (!s) return;
            n.preventDefault();
            let l = s
              ? (function (e, t, n) {
                  let r = e.resolve(t);
                  if (!n.content.size) return t;
                  let o = n.content;
                  for (let e = 0; e < n.openStart; e++)
                    o = o.firstChild.content;
                  for (
                    let e = 1;
                    e <= (0 == n.openStart && n.size ? 2 : 1);
                    e++
                  )
                    for (let t = r.depth; t >= 0; t--) {
                      let n =
                          t == r.depth
                            ? 0
                            : r.pos <= (r.start(t + 1) + r.end(t + 1)) / 2
                            ? -1
                            : 1,
                        i = r.index(t) + (n > 0 ? 1 : 0),
                        s = r.node(t),
                        a = !1;
                      if (1 == e) a = s.canReplace(i, i, o);
                      else {
                        let e = s
                          .contentMatchAt(i)
                          .findWrapping(o.firstChild.type);
                        a = e && s.canReplaceWith(i, i, e[0]);
                      }
                      if (a)
                        return 0 == n
                          ? r.pos
                          : n < 0
                          ? r.before(t + 1)
                          : r.after(t + 1);
                    }
                  return null;
                })(e.state.doc, i.pos, s)
              : i.pos;
            null == l && (l = i.pos);
            let c = e.state.tr;
            a && c.deleteSelection();
            let u = c.mapping.map(l),
              f =
                0 == s.openStart && 0 == s.openEnd && 1 == s.content.childCount,
              d = c.doc;
            if (
              (f
                ? c.replaceRangeWith(u, u, s.content.firstChild)
                : c.replaceRange(u, u, s),
              c.doc.eq(d))
            )
              return;
            let p = c.doc.resolve(u);
            if (
              f &&
              Se.isSelectable(s.content.firstChild) &&
              p.nodeAfter &&
              p.nodeAfter.sameMarkup(s.content.firstChild)
            )
              c.setSelection(new Se(p));
            else {
              let t = c.mapping.map(l);
              c.mapping.maps[c.mapping.maps.length - 1].forEach(
                (e, n, r, o) => (t = o)
              ),
                c.setSelection(mt(e, p, c.doc.resolve(t)));
            }
            e.focus(), e.dispatch(c.setMeta("uiEvent", "drop"));
          }),
          (Vt.focus = (e) => {
            (e.input.lastFocus = Date.now()),
              e.focused ||
                (e.domObserver.stop(),
                e.dom.classList.add("ProseMirror-focused"),
                e.domObserver.start(),
                (e.focused = !0),
                setTimeout(() => {
                  e.docView &&
                    e.hasFocus() &&
                    !e.domObserver.currentSelection.eq(e.domSelectionRange()) &&
                    ct(e);
                }, 20));
          }),
          (Vt.blur = (e, t) => {
            let n = t;
            e.focused &&
              (e.domObserver.stop(),
              e.dom.classList.remove("ProseMirror-focused"),
              e.domObserver.start(),
              n.relatedTarget &&
                e.dom.contains(n.relatedTarget) &&
                e.domObserver.currentSelection.clear(),
              (e.focused = !1));
          }),
          (Vt.beforeinput = (e, t) => {
            if (Qe && ot && "deleteContentBackward" == t.inputType) {
              e.domObserver.flushSoon();
              let { domChangeCount: t } = e.input;
              setTimeout(() => {
                if (e.input.domChangeCount != t) return;
                if (
                  (e.dom.blur(),
                  e.focus(),
                  e.someProp("handleKeyDown", (t) => t(e, Le(8, "Backspace"))))
                )
                  return;
                let { $cursor: n } = e.state.selection;
                n &&
                  n.pos > 0 &&
                  e.dispatch(
                    e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView()
                  );
              }, 50);
            }
          });
        for (let e in jt) Vt[e] = jt[e];
        function on(e, t) {
          if (e == t) return !0;
          for (let n in e) if (e[n] !== t[n]) return !1;
          for (let n in t) if (!(n in e)) return !1;
          return !0;
        }
        class sn {
          constructor(e, t) {
            (this.toDOM = e),
              (this.spec = t || hn),
              (this.side = this.spec.side || 0);
          }
          map(e, t, n, r) {
            let { pos: o, deleted: i } = e.mapResult(
              t.from + r,
              this.side < 0 ? -1 : 1
            );
            return i ? null : new cn(o - n, o - n, this);
          }
          valid() {
            return !0;
          }
          eq(e) {
            return (
              this == e ||
              (e instanceof sn &&
                ((this.spec.key && this.spec.key == e.spec.key) ||
                  (this.toDOM == e.toDOM && on(this.spec, e.spec))))
            );
          }
          destroy(e) {
            this.spec.destroy && this.spec.destroy(e);
          }
        }
        class an {
          constructor(e, t) {
            (this.attrs = e), (this.spec = t || hn);
          }
          map(e, t, n, r) {
            let o = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n,
              i = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
            return o >= i ? null : new cn(o, i, this);
          }
          valid(e, t) {
            return t.from < t.to;
          }
          eq(e) {
            return (
              this == e ||
              (e instanceof an &&
                on(this.attrs, e.attrs) &&
                on(this.spec, e.spec))
            );
          }
          static is(e) {
            return e.type instanceof an;
          }
          destroy() {}
        }
        class ln {
          constructor(e, t) {
            (this.attrs = e), (this.spec = t || hn);
          }
          map(e, t, n, r) {
            let o = e.mapResult(t.from + r, 1);
            if (o.deleted) return null;
            let i = e.mapResult(t.to + r, -1);
            return i.deleted || i.pos <= o.pos
              ? null
              : new cn(o.pos - n, i.pos - n, this);
          }
          valid(e, t) {
            let n,
              { index: r, offset: o } = e.content.findIndex(t.from);
            return (
              o == t.from && !(n = e.child(r)).isText && o + n.nodeSize == t.to
            );
          }
          eq(e) {
            return (
              this == e ||
              (e instanceof ln &&
                on(this.attrs, e.attrs) &&
                on(this.spec, e.spec))
            );
          }
          destroy() {}
        }
        class cn {
          constructor(e, t, n) {
            (this.from = e), (this.to = t), (this.type = n);
          }
          copy(e, t) {
            return new cn(e, t, this.type);
          }
          eq(e, t = 0) {
            return (
              this.type.eq(e.type) &&
              this.from + t == e.from &&
              this.to + t == e.to
            );
          }
          map(e, t, n) {
            return this.type.map(e, this, t, n);
          }
          static widget(e, t, n) {
            return new cn(e, e, new sn(t, n));
          }
          static inline(e, t, n, r) {
            return new cn(e, t, new an(n, r));
          }
          static node(e, t, n, r) {
            return new cn(e, t, new ln(n, r));
          }
          get spec() {
            return this.type.spec;
          }
          get inline() {
            return this.type instanceof an;
          }
        }
        const un = [],
          hn = {};
        class fn {
          constructor(e, t) {
            (this.local = e.length ? e : un),
              (this.children = t.length ? t : un);
          }
          static create(e, t) {
            return t.length ? yn(t, e, 0, hn) : dn;
          }
          find(e, t, n) {
            let r = [];
            return (
              this.findInner(null == e ? 0 : e, null == t ? 1e9 : t, r, 0, n), r
            );
          }
          findInner(e, t, n, r, o) {
            for (let i = 0; i < this.local.length; i++) {
              let s = this.local[i];
              s.from <= t &&
                s.to >= e &&
                (!o || o(s.spec)) &&
                n.push(s.copy(s.from + r, s.to + r));
            }
            for (let i = 0; i < this.children.length; i += 3)
              if (this.children[i] < t && this.children[i + 1] > e) {
                let s = this.children[i] + 1;
                this.children[i + 2].findInner(e - s, t - s, n, r + s, o);
              }
          }
          map(e, t, n) {
            return this == dn || 0 == e.maps.length
              ? this
              : this.mapInner(e, t, 0, 0, n || hn);
          }
          mapInner(e, t, n, r, o) {
            let i;
            for (let s = 0; s < this.local.length; s++) {
              let a = this.local[s].map(e, n, r);
              a && a.type.valid(t, a)
                ? (i || (i = [])).push(a)
                : o.onRemove && o.onRemove(this.local[s].spec);
            }
            return this.children.length
              ? (function (e, t, n, r, o, i, s) {
                  let a = e.slice();
                  for (let e = 0, t = i; e < n.maps.length; e++) {
                    let r = 0;
                    n.maps[e].forEach((e, n, i, s) => {
                      let l = s - i - (n - e);
                      for (let s = 0; s < a.length; s += 3) {
                        let c = a[s + 1];
                        if (c < 0 || e > c + t - r) continue;
                        let u = a[s] + t - r;
                        n >= u
                          ? (a[s + 1] = e <= u ? -2 : -1)
                          : i >= o && l && ((a[s] += l), (a[s + 1] += l));
                      }
                      r += l;
                    }),
                      (t = n.maps[e].map(t, -1));
                  }
                  let l = !1;
                  for (let t = 0; t < a.length; t += 3)
                    if (a[t + 1] < 0) {
                      if (-2 == a[t + 1]) {
                        (l = !0), (a[t + 1] = -1);
                        continue;
                      }
                      let c = n.map(e[t] + i),
                        u = c - o;
                      if (u < 0 || u >= r.content.size) {
                        l = !0;
                        continue;
                      }
                      let h = n.map(e[t + 1] + i, -1) - o,
                        { index: f, offset: d } = r.content.findIndex(u),
                        p = r.maybeChild(f);
                      if (p && d == u && d + p.nodeSize == h) {
                        let r = a[t + 2].mapInner(n, p, c + 1, e[t] + i + 1, s);
                        r != dn
                          ? ((a[t] = u), (a[t + 1] = h), (a[t + 2] = r))
                          : ((a[t + 1] = -2), (l = !0));
                      } else l = !0;
                    }
                  if (l) {
                    let l = (function (e, t, n, r, o, i, s) {
                        function a(e, t) {
                          for (let i = 0; i < e.local.length; i++) {
                            let a = e.local[i].map(r, o, t);
                            a
                              ? n.push(a)
                              : s.onRemove && s.onRemove(e.local[i].spec);
                          }
                          for (let n = 0; n < e.children.length; n += 3)
                            a(e.children[n + 2], e.children[n] + t + 1);
                        }
                        for (let n = 0; n < e.length; n += 3)
                          -1 == e[n + 1] && a(e[n + 2], t[n] + i + 1);
                        return n;
                      })(a, e, t, n, o, i, s),
                      c = yn(l, r, 0, s);
                    t = c.local;
                    for (let e = 0; e < a.length; e += 3)
                      a[e + 1] < 0 && (a.splice(e, 3), (e -= 3));
                    for (let e = 0, t = 0; e < c.children.length; e += 3) {
                      let n = c.children[e];
                      for (; t < a.length && a[t] < n; ) t += 3;
                      a.splice(
                        t,
                        0,
                        c.children[e],
                        c.children[e + 1],
                        c.children[e + 2]
                      );
                    }
                  }
                  return new fn(t.sort(kn), a);
                })(this.children, i || [], e, t, n, r, o)
              : i
              ? new fn(i.sort(kn), un)
              : dn;
          }
          add(e, t) {
            return t.length
              ? this == dn
                ? fn.create(e, t)
                : this.addInner(e, t, 0)
              : this;
          }
          addInner(e, t, n) {
            let r,
              o = 0;
            e.forEach((e, i) => {
              let s,
                a = i + n;
              if ((s = vn(t, e, a))) {
                for (
                  r || (r = this.children.slice());
                  o < r.length && r[o] < i;

                )
                  o += 3;
                r[o] == i
                  ? (r[o + 2] = r[o + 2].addInner(e, s, a + 1))
                  : r.splice(o, 0, i, i + e.nodeSize, yn(s, e, a + 1, hn)),
                  (o += 3);
              }
            });
            let i = mn(o ? gn(t) : t, -n);
            for (let t = 0; t < i.length; t++)
              i[t].type.valid(e, i[t]) || i.splice(t--, 1);
            return new fn(
              i.length ? this.local.concat(i).sort(kn) : this.local,
              r || this.children
            );
          }
          remove(e) {
            return 0 == e.length || this == dn ? this : this.removeInner(e, 0);
          }
          removeInner(e, t) {
            let n = this.children,
              r = this.local;
            for (let r = 0; r < n.length; r += 3) {
              let o,
                i = n[r] + t,
                s = n[r + 1] + t;
              for (let t, n = 0; n < e.length; n++)
                (t = e[n]) &&
                  t.from > i &&
                  t.to < s &&
                  ((e[n] = null), (o || (o = [])).push(t));
              if (!o) continue;
              n == this.children && (n = this.children.slice());
              let a = n[r + 2].removeInner(o, i + 1);
              a != dn ? (n[r + 2] = a) : (n.splice(r, 3), (r -= 3));
            }
            if (r.length)
              for (let n, o = 0; o < e.length; o++)
                if ((n = e[o]))
                  for (let e = 0; e < r.length; e++)
                    r[e].eq(n, t) &&
                      (r == this.local && (r = this.local.slice()),
                      r.splice(e--, 1));
            return n == this.children && r == this.local
              ? this
              : r.length || n.length
              ? new fn(r, n)
              : dn;
          }
          forChild(e, t) {
            if (this == dn) return this;
            if (t.isLeaf) return fn.empty;
            let n, r;
            for (let t = 0; t < this.children.length; t += 3)
              if (this.children[t] >= e) {
                this.children[t] == e && (n = this.children[t + 2]);
                break;
              }
            let o = e + 1,
              i = o + t.content.size;
            for (let e = 0; e < this.local.length; e++) {
              let t = this.local[e];
              if (t.from < i && t.to > o && t.type instanceof an) {
                let e = Math.max(o, t.from) - o,
                  n = Math.min(i, t.to) - o;
                e < n && (r || (r = [])).push(t.copy(e, n));
              }
            }
            if (r) {
              let e = new fn(r.sort(kn), un);
              return n ? new pn([e, n]) : e;
            }
            return n || dn;
          }
          eq(e) {
            if (this == e) return !0;
            if (
              !(e instanceof fn) ||
              this.local.length != e.local.length ||
              this.children.length != e.children.length
            )
              return !1;
            for (let t = 0; t < this.local.length; t++)
              if (!this.local[t].eq(e.local[t])) return !1;
            for (let t = 0; t < this.children.length; t += 3)
              if (
                this.children[t] != e.children[t] ||
                this.children[t + 1] != e.children[t + 1] ||
                !this.children[t + 2].eq(e.children[t + 2])
              )
                return !1;
            return !0;
          }
          locals(e) {
            return wn(this.localsInner(e));
          }
          localsInner(e) {
            if (this == dn) return un;
            if (e.inlineContent || !this.local.some(an.is)) return this.local;
            let t = [];
            for (let e = 0; e < this.local.length; e++)
              this.local[e].type instanceof an || t.push(this.local[e]);
            return t;
          }
        }
        (fn.empty = new fn([], [])), (fn.removeOverlap = wn);
        const dn = fn.empty;
        class pn {
          constructor(e) {
            this.members = e;
          }
          map(e, t) {
            const n = this.members.map((n) => n.map(e, t, hn));
            return pn.from(n);
          }
          forChild(e, t) {
            if (t.isLeaf) return fn.empty;
            let n = [];
            for (let r = 0; r < this.members.length; r++) {
              let o = this.members[r].forChild(e, t);
              o != dn &&
                (o instanceof pn ? (n = n.concat(o.members)) : n.push(o));
            }
            return pn.from(n);
          }
          eq(e) {
            if (!(e instanceof pn) || e.members.length != this.members.length)
              return !1;
            for (let t = 0; t < this.members.length; t++)
              if (!this.members[t].eq(e.members[t])) return !1;
            return !0;
          }
          locals(e) {
            let t,
              n = !0;
            for (let r = 0; r < this.members.length; r++) {
              let o = this.members[r].localsInner(e);
              if (o.length)
                if (t) {
                  n && ((t = t.slice()), (n = !1));
                  for (let e = 0; e < o.length; e++) t.push(o[e]);
                } else t = o;
            }
            return t ? wn(n ? t : t.sort(kn)) : un;
          }
          static from(e) {
            switch (e.length) {
              case 0:
                return dn;
              case 1:
                return e[0];
              default:
                return new pn(
                  e.every((e) => e instanceof fn)
                    ? e
                    : e.reduce(
                        (e, t) => e.concat(t instanceof fn ? t : t.members),
                        []
                      )
                );
            }
          }
        }
        function mn(e, t) {
          if (!t || !e.length) return e;
          let n = [];
          for (let r = 0; r < e.length; r++) {
            let o = e[r];
            n.push(new cn(o.from + t, o.to + t, o.type));
          }
          return n;
        }
        function vn(e, t, n) {
          if (t.isLeaf) return null;
          let r = n + t.nodeSize,
            o = null;
          for (let t, i = 0; i < e.length; i++)
            (t = e[i]) &&
              t.from > n &&
              t.to < r &&
              ((o || (o = [])).push(t), (e[i] = null));
          return o;
        }
        function gn(e) {
          let t = [];
          for (let n = 0; n < e.length; n++) null != e[n] && t.push(e[n]);
          return t;
        }
        function yn(e, t, n, r) {
          let o = [],
            i = !1;
          t.forEach((t, s) => {
            let a = vn(e, t, s + n);
            if (a) {
              i = !0;
              let e = yn(a, t, n + s + 1, r);
              e != dn && o.push(s, s + t.nodeSize, e);
            }
          });
          let s = mn(i ? gn(e) : e, -n).sort(kn);
          for (let e = 0; e < s.length; e++)
            s[e].type.valid(t, s[e]) ||
              (r.onRemove && r.onRemove(s[e].spec), s.splice(e--, 1));
          return s.length || o.length ? new fn(s, o) : dn;
        }
        function kn(e, t) {
          return e.from - t.from || e.to - t.to;
        }
        function wn(e) {
          let t = e;
          for (let n = 0; n < t.length - 1; n++) {
            let r = t[n];
            if (r.from != r.to)
              for (let o = n + 1; o < t.length; o++) {
                let i = t[o];
                if (i.from != r.from) {
                  i.from < r.to &&
                    (t == e && (t = e.slice()),
                    (t[n] = r.copy(r.from, i.from)),
                    bn(t, o, r.copy(i.from, r.to)));
                  break;
                }
                i.to != r.to &&
                  (t == e && (t = e.slice()),
                  (t[o] = i.copy(i.from, r.to)),
                  bn(t, o + 1, i.copy(r.to, i.to)));
              }
          }
          return t;
        }
        function bn(e, t, n) {
          for (; t < e.length && kn(n, e[t]) > 0; ) t++;
          e.splice(t, 0, n);
        }
        new WeakMap();
        const Sn =
          ((xn = null),
          function (e, t, n) {
            return (
              (n = n || this),
              clearTimeout(xn),
              (xn = setTimeout(function () {
                e.apply(n, arguments);
              }, t)),
              xn
            );
          });
        var xn;
        function Mn(e) {
          e = Object.assign(
            {},
            {              
              mentionTrigger: "@",
              hashtagTrigger: "#",
              allowSpace: !0,
              getSuggestions: (e, t, n) => {
                n([]);                
              },
              getSuggestionsHTML: (e) =>
                '<div class="suggestion-item-list">' +
                e
                  .map(
                    (e) => '<div class="suggestion-item">' + e.name + "</div>"
                  )
                  .join("") +
                "</div>",
              activeClass: "suggestion-item-active",
              suggestionTextClass: "prosemirror-suggestion",
              maxNoOfSuggestions: 10,
              delay: 500,
            },
            e
          );
          var t = null,
            n = document.createElement("div"),
            r = function () {
              n.style.display = "none";
            },
            o = function (e, t) {
              // console.log(e,t,n);
              // console.log(n.querySelector(".suggestion-item-list"));
              // console.log(e);
              // console.log("segundo");
              n.querySelector(".suggestion-item-list").childNodes[
                e
              ].classList.remove(t);
            },
            i = function (e, t) {
              // console.log("E,",e, "t", t);
              n.querySelector(".suggestion-item-list").childNodes[
                e
              ].classList.add(t);
            },
            s = function (e, t, n) {
              // console.log(e,t,n);
              o(t.index, n.activeClass),
                (t.index = e),
                i(t.index, n.activeClass);
            },
            a = function (e, t, n) {
              // console.log(t);
              var r,
                o = t.suggestions[0]; //se coloca en 0 ya que en el array 0 esta todo el conjunto de arrays de menciones
                // console.log(o);                
              r =
                "mention" === t.type
                ? { name: o[t.index].name, id: o[t.index].id }
                  // ? { name: o[0].name, id: o[0].id, email: o[0].email }
                  : { tag: o[0].tag };
                  // console.log("o:", r);
              var i = e.state.schema.nodes[t.type].create(r),
                s = e.state.tr.replaceWith(t.range.from, t.range.to, i);
              e.dispatch(s);
            };
          return new Ae({
            key: new Ie("autosuggestions"),
            state: {
              init: () => ({
                active: !1,
                range: { from: 0, to: 0 },
                type: "",
                text: "",
                suggestions: [],
                index: 0,
              }),
              apply(t, n) {
                var r = {
                    active: !1,
                    range: { from: 0, to: 0 },
                    type: "",
                    text: "",
                    suggestions: [],
                    index: 0,
                  },
                  o = t.selection;
                if (o.from !== o.to) return r;
                const i = (function (e, t) {
                  // console.log("E",e,"T",t, "N", e.before);
                  var n = e.before();
                  const r = e.doc.textBetween(n, e.pos, "\n", "\0");
                  var o,
                    i,
                    s,
                    a =
                      ((o = t.mentionTrigger),
                      (i = t.hashtagTrigger),
                      {
                        mention: t.allowSpace
                          ? new RegExp(
                              "(^|\\s)" + o + "([\\w-\\+]+\\s?[\\w-\\+]*)$"
                            )
                          : new RegExp("(^|\\s)" + o + "([\\w-\\+]+)$"),
                        tag: new RegExp("(^|\\s)" + i + "([\\w-]+)$"),
                      }),
                    l = r.match(a.mention),
                    c = r.match(a.tag),
                    u = l || c;
                    // console.log("U", u);
                  if ((l ? (s = "mention") : c && (s = "tag"), u)) {
                    (u.index = u[0].startsWith(" ") ? u.index + 1 : u.index),
                      (u[0] = u[0].startsWith(" ")
                        ? u[0].substring(1, u[0].length)
                        : u[0]);
                      // console.log(u);
                    var h = e.start() + u.index;
                    // console.log(h,u);
                    return {
                      range: { from: h, to: h + u[0].length },
                      queryText: u[2],
                      type: s,
                    };
                  }
                })(o.$from, e);
                return (
                  i &&
                    ((r.active = !0),
                    (r.range = i.range),
                    (r.type = i.type),
                    (r.text = i.queryText)),
                  r
                );
              },
            },
            props: {
              handleKeyDown(n, s) {
                var l,
                  c,
                  u,
                  h,
                  f = this.getState(n.state);
                return !(
                  (!f.active && !f.suggestions.length) ||
                  ((u = 13 === s.keyCode),
                  (l = 40 === s.keyCode),
                  (c = 38 === s.keyCode),
                  (h = 27 === s.keyCode),
                  l
                    ? ((function (e, t, n) {
                      // console.log("E",e,"T",t,"N",n,"TSuggestions", t.suggestions[0].length);
                        o(t.index, n.activeClass),
                          t.index++,
                          (t.index =
                            t.index === t.suggestions[0].length ? 0 : t.index),
                          i(t.index, n.activeClass);
                      })(0, f, e),
                      0)
                    : c
                    ? ((function (e, t, n) {
                      // console.log("E-",e,"T-",t,"N-",n);
                        o(t.index, n.activeClass),
                          t.index--,
                          (t.index =
                            -1 === t.index
                              ? t.suggestions[0].length - 1
                              : t.index),
                          i(t.index, n.activeClass);
                      })(0, f, e),
                      0)
                    : u
                    ? (a(n, f), 0)
                    : !h ||
                      (clearTimeout(t),
                      r(),
                      (this.state = {
                        active: !1,
                        range: { from: 0, to: 0 },
                        type: "",
                        text: "",
                        suggestions: [],
                        index: 0,
                      }),
                      0))
                );
              },
              decorations(t) {
                const { active: n, range: r } = this.getState(t);
                return n
                  ? fn.create(t.doc, [
                      cn.inline(r.from, r.to, {
                        nodeName: "span",
                        class: e.suggestionTextClass,
                      }),
                    ])
                  : null;
              },
            },
            view() {
              return {
                update: (o) => {
                  var l = this.key.getState(o.state);
                  if (!l.text) return r(), void clearTimeout(t);
                  t = Sn(
                    function () {
                      e.getSuggestions(l.type, l.text, function (t) {
                        (l.suggestions = t),
                          (function (e, t, r, o) {
                            (n.innerHTML = o.getSuggestionsHTML(r, t.type)),
                              n
                                .querySelectorAll(".suggestion-item")
                                .forEach(function (n, r) {
                                  n.addEventListener("click", function () {
                                    a(e, t), e.focus();
                                  }),
                                    n.addEventListener(
                                      "mouseover",
                                      function () {
                                        s(r, t, o);
                                      }
                                    ),
                                    n.addEventListener("mouseout", function () {
                                      // s(r, t, o); // se retiro para no hacer lo mismo que mouseover
                                    });
                                }),
                              i(t.index, o.activeClass);
                            var l = e
                                .domAtPos(e.state.selection.$from.pos)
                                .node.querySelector(
                                  "." + o.suggestionTextClass
                                ),
                              c = l.getBoundingClientRect();
                            document.body.appendChild(n),
                              n.classList.add("suggestion-item-container"),
                              (n.style.position = "fixed"),
                              (n.style.left = c.left + "px");
                            var u = l.offsetHeight + c.top;
                            (n.style.top = u + "px"),
                              (n.style.display = "block"),
                              (n.style.zIndex = "999999");
                          })(o, l, t, e);
                      });
                    },
                    e.delay,
                    this
                  );
                },
              };
            },
          });
        }
        const On = {
            group: "inline",
            inline: !0,
            atom: !0,
            attrs: { id: "", name: "" },
            // attrs: { id: "", name: "", email: "" },
            selectable: !1,
            draggable: !1,
            toDOM: (e) => [
              "span",
              {
                "data-mention-id": e.attrs.id,
                "data-mention-name": e.attrs.name,
                // "data-mention-email": e.attrs.email,
                class: "prosemirror-mention-node",
              },
              "@" + e.attrs.name || 0,
            ],
            parseDOM: [
              {
                tag: "span[data-mention-id][data-mention-name][data-mention-email]",
                getAttrs: (e) => ({
                  id: e.getAttribute("data-mention-id"),
                  name: e.getAttribute("data-mention-name"),
                  //  email: e.getAttribute("data-mention-email"),
                }),
              },
            ],
          },
          Cn = {
            group: "inline",
            inline: !0,
            atom: !0,
            attrs: { tag: "" },
            selectable: !1,
            draggable: !1,
            toDOM: (e) => [
              "span",
              { "data-tag": e.attrs.tag, class: "prosemirror-tag-node" },
              "#" + e.attrs.tag,
            ],
            parseDOM: [
              {
                tag: "span[data-tag]",
                getAttrs: (e) => ({ tag: e.getAttribute("data-tag") }),
              },
            ],
          };
        function Nn(e) {
          return e.append({ mention: On });
        }
        function Tn(e) {
          return e.append({ tag: Cn });
        }
      },
      464: (e, t, n) => {
        n.r(t), n.d(t, { default: () => a });
        var r = 200,
          o = function () {};
        (o.prototype.append = function (e) {
          return e.length
            ? ((e = o.from(e)),
              (!this.length && e) ||
                (e.length < r && this.leafAppend(e)) ||
                (this.length < r && e.leafPrepend(this)) ||
                this.appendInner(e))
            : this;
        }),
          (o.prototype.prepend = function (e) {
            return e.length ? o.from(e).append(this) : this;
          }),
          (o.prototype.appendInner = function (e) {
            return new s(this, e);
          }),
          (o.prototype.slice = function (e, t) {
            return (
              void 0 === e && (e = 0),
              void 0 === t && (t = this.length),
              e >= t
                ? o.empty
                : this.sliceInner(Math.max(0, e), Math.min(this.length, t))
            );
          }),
          (o.prototype.get = function (e) {
            if (!(e < 0 || e >= this.length)) return this.getInner(e);
          }),
          (o.prototype.forEach = function (e, t, n) {
            void 0 === t && (t = 0),
              void 0 === n && (n = this.length),
              t <= n
                ? this.forEachInner(e, t, n, 0)
                : this.forEachInvertedInner(e, t, n, 0);
          }),
          (o.prototype.map = function (e, t, n) {
            void 0 === t && (t = 0), void 0 === n && (n = this.length);
            var r = [];
            return (
              this.forEach(
                function (t, n) {
                  return r.push(e(t, n));
                },
                t,
                n
              ),
              r
            );
          }),
          (o.from = function (e) {
            return e instanceof o ? e : e && e.length ? new i(e) : o.empty;
          });
        var i = (function (e) {
          function t(t) {
            e.call(this), (this.values = t);
          }
          e && (t.__proto__ = e),
            (t.prototype = Object.create(e && e.prototype)),
            (t.prototype.constructor = t);
          var n = { length: { configurable: !0 }, depth: { configurable: !0 } };
          return (
            (t.prototype.flatten = function () {
              return this.values;
            }),
            (t.prototype.sliceInner = function (e, n) {
              return 0 == e && n == this.length
                ? this
                : new t(this.values.slice(e, n));
            }),
            (t.prototype.getInner = function (e) {
              return this.values[e];
            }),
            (t.prototype.forEachInner = function (e, t, n, r) {
              for (var o = t; o < n; o++)
                if (!1 === e(this.values[o], r + o)) return !1;
            }),
            (t.prototype.forEachInvertedInner = function (e, t, n, r) {
              for (var o = t - 1; o >= n; o--)
                if (!1 === e(this.values[o], r + o)) return !1;
            }),
            (t.prototype.leafAppend = function (e) {
              if (this.length + e.length <= r)
                return new t(this.values.concat(e.flatten()));
            }),
            (t.prototype.leafPrepend = function (e) {
              if (this.length + e.length <= r)
                return new t(e.flatten().concat(this.values));
            }),
            (n.length.get = function () {
              return this.values.length;
            }),
            (n.depth.get = function () {
              return 0;
            }),
            Object.defineProperties(t.prototype, n),
            t
          );
        })(o);
        o.empty = new i([]);
        var s = (function (e) {
          function t(t, n) {
            e.call(this),
              (this.left = t),
              (this.right = n),
              (this.length = t.length + n.length),
              (this.depth = Math.max(t.depth, n.depth) + 1);
          }
          return (
            e && (t.__proto__ = e),
            (t.prototype = Object.create(e && e.prototype)),
            (t.prototype.constructor = t),
            (t.prototype.flatten = function () {
              return this.left.flatten().concat(this.right.flatten());
            }),
            (t.prototype.getInner = function (e) {
              return e < this.left.length
                ? this.left.get(e)
                : this.right.get(e - this.left.length);
            }),
            (t.prototype.forEachInner = function (e, t, n, r) {
              var o = this.left.length;
              return (
                !(
                  t < o &&
                  !1 === this.left.forEachInner(e, t, Math.min(n, o), r)
                ) &&
                !(
                  n > o &&
                  !1 ===
                    this.right.forEachInner(
                      e,
                      Math.max(t - o, 0),
                      Math.min(this.length, n) - o,
                      r + o
                    )
                ) &&
                void 0
              );
            }),
            (t.prototype.forEachInvertedInner = function (e, t, n, r) {
              var o = this.left.length;
              return (
                !(
                  t > o &&
                  !1 ===
                    this.right.forEachInvertedInner(
                      e,
                      t - o,
                      Math.max(n, o) - o,
                      r + o
                    )
                ) &&
                !(
                  n < o &&
                  !1 === this.left.forEachInvertedInner(e, Math.min(t, o), n, r)
                ) &&
                void 0
              );
            }),
            (t.prototype.sliceInner = function (e, t) {
              if (0 == e && t == this.length) return this;
              var n = this.left.length;
              return t <= n
                ? this.left.slice(e, t)
                : e >= n
                ? this.right.slice(e - n, t - n)
                : this.left.slice(e, n).append(this.right.slice(0, t - n));
            }),
            (t.prototype.leafAppend = function (e) {
              var n = this.right.leafAppend(e);
              if (n) return new t(this.left, n);
            }),
            (t.prototype.leafPrepend = function (e) {
              var n = this.left.leafPrepend(e);
              if (n) return new t(n, this.right);
            }),
            (t.prototype.appendInner = function (e) {
              return this.left.depth >= Math.max(this.right.depth, e.depth) + 1
                ? new t(this.left, new t(this.right, e))
                : new t(this, e);
            }),
            t
          );
        })(o);
        const a = o;
      },
      611: (e, t, n) => {
        n.r(t), n.d(t, { default: () => g });
        var r = n(379),
          o = n.n(r),
          i = n(795),
          s = n.n(i),
          a = n(569),
          l = n.n(a),
          c = n(565),
          u = n.n(c),
          h = n(216),
          f = n.n(h),
          d = n(589),
          p = n.n(d),
          m = n(41),
          v = {};
        (v.styleTagTransform = p()),
          (v.setAttributes = u()),
          (v.insert = l().bind(null, "head")),
          (v.domAPI = s()),
          (v.insertStyleElement = f()),
          o()(m.Z, v);
        const g = m.Z && m.Z.locals ? m.Z.locals : void 0;
      },
      340: (e, t, n) => {
        n.r(t), n.d(t, { default: () => g });
        var r = n(379),
          o = n.n(r),
          i = n(795),
          s = n.n(i),
          a = n(569),
          l = n.n(a),
          c = n(565),
          u = n.n(c),
          h = n(216),
          f = n.n(h),
          d = n(589),
          p = n.n(d),
          m = n(210),
          v = {};
        (v.styleTagTransform = p()),
          (v.setAttributes = u()),
          (v.insert = l().bind(null, "head")),
          (v.domAPI = s()),
          (v.insertStyleElement = f()),
          o()(m.Z, v);
        const g = m.Z && m.Z.locals ? m.Z.locals : void 0;
      },
      662: (e, t, n) => {
        n.r(t), n.d(t, { default: () => g });
        var r = n(379),
          o = n.n(r),
          i = n(795),
          s = n.n(i),
          a = n(569),
          l = n.n(a),
          c = n(565),
          u = n.n(c),
          h = n(216),
          f = n.n(h),
          d = n(589),
          p = n.n(d),
          m = n(363),
          v = {};
        (v.styleTagTransform = p()),
          (v.setAttributes = u()),
          (v.insert = l().bind(null, "head")),
          (v.domAPI = s()),
          (v.insertStyleElement = f()),
          o()(m.Z, v);
        const g = m.Z && m.Z.locals ? m.Z.locals : void 0;
      },
      379: (e) => {
        var t = [];
        function n(e) {
          for (var n = -1, r = 0; r < t.length; r++)
            if (t[r].identifier === e) {
              n = r;
              break;
            }
          return n;
        }
        function r(e, r) {
          for (var i = {}, s = [], a = 0; a < e.length; a++) {
            var l = e[a],
              c = r.base ? l[0] + r.base : l[0],
              u = i[c] || 0,
              h = "".concat(c, " ").concat(u);
            i[c] = u + 1;
            var f = n(h),
              d = {
                css: l[1],
                media: l[2],
                sourceMap: l[3],
                supports: l[4],
                layer: l[5],
              };
            if (-1 !== f) t[f].references++, t[f].updater(d);
            else {
              var p = o(d, r);
              (r.byIndex = a),
                t.splice(a, 0, { identifier: h, updater: p, references: 1 });
            }
            s.push(h);
          }
          return s;
        }
        function o(e, t) {
          var n = t.domAPI(t);
          return (
            n.update(e),
            function (t) {
              if (t) {
                if (
                  t.css === e.css &&
                  t.media === e.media &&
                  t.sourceMap === e.sourceMap &&
                  t.supports === e.supports &&
                  t.layer === e.layer
                )
                  return;
                n.update((e = t));
              } else n.remove();
            }
          );
        }
        e.exports = function (e, o) {
          var i = r((e = e || []), (o = o || {}));
          return function (e) {
            e = e || [];
            for (var s = 0; s < i.length; s++) {
              var a = n(i[s]);
              t[a].references--;
            }
            for (var l = r(e, o), c = 0; c < i.length; c++) {
              var u = n(i[c]);
              0 === t[u].references && (t[u].updater(), t.splice(u, 1));
            }
            i = l;
          };
        };
      },
      569: (e) => {
        var t = {};
        e.exports = function (e, n) {
          var r = (function (e) {
            if (void 0 === t[e]) {
              var n = document.querySelector(e);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (e) {
                  n = null;
                }
              t[e] = n;
            }
            return t[e];
          })(e);
          if (!r)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
            );
          r.appendChild(n);
        };
      },
      216: (e) => {
        e.exports = function (e) {
          var t = document.createElement("style");
          return e.setAttributes(t, e.attributes), e.insert(t, e.options), t;
        };
      },
      565: (e, t, n) => {
        e.exports = function (e) {
          var t = n.nc;
          t && e.setAttribute("nonce", t);
        };
      },
      795: (e) => {
        e.exports = function (e) {
          var t = e.insertStyleElement(e);
          return {
            update: function (n) {
              !(function (e, t, n) {
                var r = "";
                n.supports && (r += "@supports (".concat(n.supports, ") {")),
                  n.media && (r += "@media ".concat(n.media, " {"));
                var o = void 0 !== n.layer;
                o &&
                  (r += "@layer".concat(
                    n.layer.length > 0 ? " ".concat(n.layer) : "",
                    " {"
                  )),
                  (r += n.css),
                  o && (r += "}"),
                  n.media && (r += "}"),
                  n.supports && (r += "}");
                var i = n.sourceMap;
                i &&
                  "undefined" != typeof btoa &&
                  (r +=
                    "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                      " */"
                    )),
                  t.styleTagTransform(r, e, t.options);
              })(t, e, n);
            },
            remove: function () {
              !(function (e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e);
              })(t);
            },
          };
        };
      },
      589: (e) => {
        e.exports = function (e, t) {
          if (t.styleSheet) t.styleSheet.cssText = e;
          else {
            for (; t.firstChild; ) t.removeChild(t.firstChild);
            t.appendChild(document.createTextNode(e));
          }
        };
      },
      513: (e) => {
        function t(e, n) {
          if ("string" == typeof n) e.appendChild(document.createTextNode(n));
          else if (null == n);
          else if (null != n.nodeType) e.appendChild(n);
          else {
            if (!Array.isArray(n))
              throw new RangeError("Unsupported child node: " + n);
            for (var r = 0; r < n.length; r++) t(e, n[r]);
          }
        }
        e.exports = function () {
          var e = arguments[0];
          "string" == typeof e && (e = document.createElement(e));
          var n = 1,
            r = arguments[1];
          if (
            r &&
            "object" == typeof r &&
            null == r.nodeType &&
            !Array.isArray(r)
          ) {
            for (var o in r)
              if (Object.prototype.hasOwnProperty.call(r, o)) {
                var i = r[o];
                "string" == typeof i
                  ? e.setAttribute(o, i)
                  : null != i && (e[o] = i);
              }
            n++;
          }
          for (; n < arguments.length; n++) t(e, arguments[n]);
          return e;
        };
      },
      586: (e) => {
        function t(e) {
          this.content = e;
        }
        (t.prototype = {
          constructor: t,
          find: function (e) {
            for (var t = 0; t < this.content.length; t += 2)
              if (this.content[t] === e) return t;
            return -1;
          },
          get: function (e) {
            var t = this.find(e);
            return -1 == t ? void 0 : this.content[t + 1];
          },
          update: function (e, n, r) {
            var o = r && r != e ? this.remove(r) : this,
              i = o.find(e),
              s = o.content.slice();
            return (
              -1 == i ? s.push(r || e, n) : ((s[i + 1] = n), r && (s[i] = r)),
              new t(s)
            );
          },
          remove: function (e) {
            var n = this.find(e);
            if (-1 == n) return this;
            var r = this.content.slice();
            return r.splice(n, 2), new t(r);
          },
          addToStart: function (e, n) {
            return new t([e, n].concat(this.remove(e).content));
          },
          addToEnd: function (e, n) {
            var r = this.remove(e).content.slice();
            return r.push(e, n), new t(r);
          },
          addBefore: function (e, n, r) {
            var o = this.remove(n),
              i = o.content.slice(),
              s = o.find(e);
            return i.splice(-1 == s ? i.length : s, 0, n, r), new t(i);
          },
          forEach: function (e) {
            for (var t = 0; t < this.content.length; t += 2)
              e(this.content[t], this.content[t + 1]);
          },
          prepend: function (e) {
            return (e = t.from(e)).size
              ? new t(e.content.concat(this.subtract(e).content))
              : this;
          },
          append: function (e) {
            return (e = t.from(e)).size
              ? new t(this.subtract(e).content.concat(e.content))
              : this;
          },
          subtract: function (e) {
            var n = this;
            e = t.from(e);
            for (var r = 0; r < e.content.length; r += 2)
              n = n.remove(e.content[r]);
            return n;
          },
          toObject: function () {
            var e = {};
            return (
              this.forEach(function (t, n) {
                e[t] = n;
              }),
              e
            );
          },
          get size() {
            return this.content.length >> 1;
          },
        }),
          (t.from = function (e) {
            if (e instanceof t) return e;
            var n = [];
            if (e) for (var r in e) n.push(r, e[r]);
            return new t(n);
          }),
          (e.exports = t);
      },
      270: (e, t, n) => {
        function r(e) {
          return (
            (r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            r(e)
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o = n(843),
          i = n(443),
          s = n(391),
          a = function (e, t) {
            return (
              !e.selection.empty &&
              (t && t(e.tr.deleteSelection().scrollIntoView()), !0)
            );
          };
        function l(e, t) {
          var n = e.selection.$cursor;
          return !n ||
            (t ? !t.endOfTextblock("backward", e) : n.parentOffset > 0)
            ? null
            : n;
        }
        var c = function (e, t, n) {
          var r = l(e, n);
          if (!r) return !1;
          var a = d(r);
          if (!a) {
            var c = r.blockRange(),
              u = c && o.liftTarget(c);
            return null != u && (t && t(e.tr.lift(c, u).scrollIntoView()), !0);
          }
          var f = a.nodeBefore;
          if (!f.type.spec.isolating && C(e, a, t)) return !0;
          if (
            0 == r.parent.content.size &&
            (h(f, "end") || s.NodeSelection.isSelectable(f))
          ) {
            var p = o.replaceStep(e.doc, r.before(), r.after(), i.Slice.empty);
            if (p && p.slice.size < p.to - p.from) {
              if (t) {
                var m = e.tr.step(p);
                m.setSelection(
                  h(f, "end")
                    ? s.Selection.findFrom(
                        m.doc.resolve(m.mapping.map(a.pos, -1)),
                        -1
                      )
                    : s.NodeSelection.create(m.doc, a.pos - f.nodeSize)
                ),
                  t(m.scrollIntoView());
              }
              return !0;
            }
          }
          return !(
            !f.isAtom ||
            a.depth != r.depth - 1 ||
            (t && t(e.tr.delete(a.pos - f.nodeSize, a.pos).scrollIntoView()), 0)
          );
        };
        function u(e, t, n) {
          for (var r = t.nodeBefore, a = t.pos - 1; !r.isTextblock; a--) {
            if (r.type.spec.isolating) return !1;
            var l = r.lastChild;
            if (!l) return !1;
            r = l;
          }
          for (var c = t.nodeAfter, u = t.pos + 1; !c.isTextblock; u++) {
            if (c.type.spec.isolating) return !1;
            var h = c.firstChild;
            if (!h) return !1;
            c = h;
          }
          var f = o.replaceStep(e.doc, a, u, i.Slice.empty);
          if (!f || f.from != a || f.slice.size >= u - a) return !1;
          if (n) {
            var d = e.tr.step(f);
            d.setSelection(s.TextSelection.create(d.doc, a)),
              n(d.scrollIntoView());
          }
          return !0;
        }
        function h(e, t) {
          for (
            var n =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              r = e;
            r;
            r = "start" == t ? r.firstChild : r.lastChild
          ) {
            if (r.isTextblock) return !0;
            if (n && 1 != r.childCount) return !1;
          }
          return !1;
        }
        var f = function (e, t, n) {
          var r = e.selection,
            o = r.$head,
            i = o;
          if (!r.empty) return !1;
          if (o.parent.isTextblock) {
            if (n ? !n.endOfTextblock("backward", e) : o.parentOffset > 0)
              return !1;
            i = d(o);
          }
          var a = i && i.nodeBefore;
          return !(
            !a ||
            !s.NodeSelection.isSelectable(a) ||
            (t &&
              t(
                e.tr
                  .setSelection(
                    s.NodeSelection.create(e.doc, i.pos - a.nodeSize)
                  )
                  .scrollIntoView()
              ),
            0)
          );
        };
        function d(e) {
          if (!e.parent.type.spec.isolating)
            for (var t = e.depth - 1; t >= 0; t--) {
              if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
              if (e.node(t).type.spec.isolating) break;
            }
          return null;
        }
        function p(e, t) {
          var n = e.selection.$cursor;
          return !n ||
            (t
              ? !t.endOfTextblock("forward", e)
              : n.parentOffset < n.parent.content.size)
            ? null
            : n;
        }
        var m = function (e, t, n) {
            var r = p(e, n);
            if (!r) return !1;
            var a = g(r);
            if (!a) return !1;
            var l = a.nodeAfter;
            if (C(e, a, t)) return !0;
            if (
              0 == r.parent.content.size &&
              (h(l, "start") || s.NodeSelection.isSelectable(l))
            ) {
              var c = o.replaceStep(
                e.doc,
                r.before(),
                r.after(),
                i.Slice.empty
              );
              if (c && c.slice.size < c.to - c.from) {
                if (t) {
                  var u = e.tr.step(c);
                  u.setSelection(
                    h(l, "start")
                      ? s.Selection.findFrom(
                          u.doc.resolve(u.mapping.map(a.pos)),
                          1
                        )
                      : s.NodeSelection.create(u.doc, u.mapping.map(a.pos))
                  ),
                    t(u.scrollIntoView());
                }
                return !0;
              }
            }
            return !(
              !l.isAtom ||
              a.depth != r.depth - 1 ||
              (t && t(e.tr.delete(a.pos, a.pos + l.nodeSize).scrollIntoView()),
              0)
            );
          },
          v = function (e, t, n) {
            var r = e.selection,
              o = r.$head,
              i = o;
            if (!r.empty) return !1;
            if (o.parent.isTextblock) {
              if (
                n
                  ? !n.endOfTextblock("forward", e)
                  : o.parentOffset < o.parent.content.size
              )
                return !1;
              i = g(o);
            }
            var a = i && i.nodeAfter;
            return !(
              !a ||
              !s.NodeSelection.isSelectable(a) ||
              (t &&
                t(
                  e.tr
                    .setSelection(s.NodeSelection.create(e.doc, i.pos))
                    .scrollIntoView()
                ),
              0)
            );
          };
        function g(e) {
          if (!e.parent.type.spec.isolating)
            for (var t = e.depth - 1; t >= 0; t--) {
              var n = e.node(t);
              if (e.index(t) + 1 < n.childCount)
                return e.doc.resolve(e.after(t + 1));
              if (n.type.spec.isolating) break;
            }
          return null;
        }
        var y = function (e, t) {
          var n = e.selection,
            r = n.$head,
            o = n.$anchor;
          return !(
            !r.parent.type.spec.code ||
            !r.sameParent(o) ||
            (t && t(e.tr.insertText("\n").scrollIntoView()), 0)
          );
        };
        function k(e) {
          for (var t = 0; t < e.edgeCount; t++) {
            var n = e.edge(t).type;
            if (n.isTextblock && !n.hasRequiredAttrs()) return n;
          }
          return null;
        }
        var w = function (e, t) {
            var n = e.selection,
              r = n.$head,
              o = n.$anchor;
            if (!r.parent.type.spec.code || !r.sameParent(o)) return !1;
            var i = r.node(-1),
              a = r.indexAfter(-1),
              l = k(i.contentMatchAt(a));
            if (!l || !i.canReplaceWith(a, a, l)) return !1;
            if (t) {
              var c = r.after(),
                u = e.tr.replaceWith(c, c, l.createAndFill());
              u.setSelection(s.Selection.near(u.doc.resolve(c), 1)),
                t(u.scrollIntoView());
            }
            return !0;
          },
          b = function (e, t) {
            var n = e.selection,
              r = n.$from,
              o = n.$to;
            if (
              n instanceof s.AllSelection ||
              r.parent.inlineContent ||
              o.parent.inlineContent
            )
              return !1;
            var i = k(o.parent.contentMatchAt(o.indexAfter()));
            if (!i || !i.isTextblock) return !1;
            if (t) {
              var a = (
                  !r.parentOffset && o.index() < o.parent.childCount ? r : o
                ).pos,
                l = e.tr.insert(a, i.createAndFill());
              l.setSelection(s.TextSelection.create(l.doc, a + 1)),
                t(l.scrollIntoView());
            }
            return !0;
          },
          S = function (e, t) {
            var n = e.selection.$cursor;
            if (!n || n.parent.content.size) return !1;
            if (n.depth > 1 && n.after() != n.end(-1)) {
              var r = n.before();
              if (o.canSplit(e.doc, r))
                return t && t(e.tr.split(r).scrollIntoView()), !0;
            }
            var i = n.blockRange(),
              s = i && o.liftTarget(i);
            return null != s && (t && t(e.tr.lift(i, s).scrollIntoView()), !0);
          };
        function x(e) {
          return function (t, n) {
            var r = t.selection,
              i = r.$from,
              a = r.$to;
            if (
              t.selection instanceof s.NodeSelection &&
              t.selection.node.isBlock
            )
              return !(
                !i.parentOffset ||
                !o.canSplit(t.doc, i.pos) ||
                (n && n(t.tr.split(i.pos).scrollIntoView()), 0)
              );
            if (!i.parent.isBlock) return !1;
            if (n) {
              var l = a.parentOffset == a.parent.content.size,
                c = t.tr;
              (t.selection instanceof s.TextSelection ||
                t.selection instanceof s.AllSelection) &&
                c.deleteSelection();
              var u =
                  0 == i.depth
                    ? null
                    : k(i.node(-1).contentMatchAt(i.indexAfter(-1))),
                h = e && e(a.parent, l),
                f = h ? [h] : l && u ? [{ type: u }] : void 0,
                d = o.canSplit(c.doc, c.mapping.map(i.pos), 1, f);
              if (
                (f ||
                  d ||
                  !o.canSplit(
                    c.doc,
                    c.mapping.map(i.pos),
                    1,
                    u ? [{ type: u }] : void 0
                  ) ||
                  (u && (f = [{ type: u }]), (d = !0)),
                d &&
                  (c.split(c.mapping.map(i.pos), 1, f),
                  !l && !i.parentOffset && i.parent.type != u))
              ) {
                var p = c.mapping.map(i.before()),
                  m = c.doc.resolve(p);
                u &&
                  i.node(-1).canReplaceWith(m.index(), m.index() + 1, u) &&
                  c.setNodeMarkup(c.mapping.map(i.before()), u);
              }
              n(c.scrollIntoView());
            }
            return !0;
          };
        }
        var M = x(),
          O = function (e, t) {
            return t && t(e.tr.setSelection(new s.AllSelection(e.doc))), !0;
          };
        function C(e, t, n) {
          var r,
            a,
            l = t.nodeBefore,
            c = t.nodeAfter;
          if (l.type.spec.isolating || c.type.spec.isolating) return !1;
          if (
            (function (e, t, n) {
              var r = t.nodeBefore,
                i = t.nodeAfter,
                s = t.index();
              return !(
                !(r && i && r.type.compatibleContent(i.type)) ||
                (!r.content.size && t.parent.canReplace(s - 1, s)
                  ? (n &&
                      n(
                        e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()
                      ),
                    0)
                  : !t.parent.canReplace(s, s + 1) ||
                    (!i.isTextblock && !o.canJoin(e.doc, t.pos)) ||
                    (n &&
                      n(
                        e.tr
                          .clearIncompatible(
                            t.pos,
                            r.type,
                            r.contentMatchAt(r.childCount)
                          )
                          .join(t.pos)
                          .scrollIntoView()
                      ),
                    0))
              );
            })(e, t, n)
          )
            return !0;
          var u = t.parent.canReplace(t.index(), t.index() + 1);
          if (
            u &&
            (r = (a = l.contentMatchAt(l.childCount)).findWrapping(c.type)) &&
            a.matchType(r[0] || c.type).validEnd
          ) {
            if (n) {
              for (
                var f = t.pos + c.nodeSize,
                  d = i.Fragment.empty,
                  p = r.length - 1;
                p >= 0;
                p--
              )
                d = i.Fragment.from(r[p].create(null, d));
              d = i.Fragment.from(l.copy(d));
              var m = e.tr.step(
                  new o.ReplaceAroundStep(
                    t.pos - 1,
                    f,
                    t.pos,
                    f,
                    new i.Slice(d, 1, 0),
                    r.length,
                    !0
                  )
                ),
                v = f + 2 * r.length;
              o.canJoin(m.doc, v) && m.join(v), n(m.scrollIntoView());
            }
            return !0;
          }
          var g = s.Selection.findFrom(t, 1),
            y = g && g.$from.blockRange(g.$to),
            k = y && o.liftTarget(y);
          if (null != k && k >= t.depth)
            return n && n(e.tr.lift(y, k).scrollIntoView()), !0;
          if (u && h(c, "start", !0) && h(l, "end")) {
            for (var w = l, b = []; b.push(w), !w.isTextblock; )
              w = w.lastChild;
            for (var S = c, x = 1; !S.isTextblock; S = S.firstChild) x++;
            if (w.canReplace(w.childCount, w.childCount, S.content)) {
              if (n) {
                for (var M = i.Fragment.empty, O = b.length - 1; O >= 0; O--)
                  M = i.Fragment.from(b[O].copy(M));
                n(
                  e.tr
                    .step(
                      new o.ReplaceAroundStep(
                        t.pos - b.length,
                        t.pos + c.nodeSize,
                        t.pos + x,
                        t.pos + c.nodeSize - x,
                        new i.Slice(M, b.length, 0),
                        0,
                        !0
                      )
                    )
                    .scrollIntoView()
                );
              }
              return !0;
            }
          }
          return !1;
        }
        function N(e) {
          return function (t, n) {
            for (
              var r = t.selection, o = e < 0 ? r.$from : r.$to, i = o.depth;
              o.node(i).isInline;

            ) {
              if (!i) return !1;
              i--;
            }
            return (
              !!o.node(i).isTextblock &&
              (n &&
                n(
                  t.tr.setSelection(
                    s.TextSelection.create(t.doc, e < 0 ? o.start(i) : o.end(i))
                  )
                ),
              !0)
            );
          };
        }
        var T = N(-1),
          D = N(1);
        function E(e, t, n) {
          for (
            var o = function (r) {
                var o = t[r],
                  i = o.$from,
                  s = o.$to,
                  a =
                    0 == i.depth && e.inlineContent && e.type.allowsMarkType(n);
                if (
                  (e.nodesBetween(i.pos, s.pos, function (e) {
                    if (a) return !1;
                    a = e.inlineContent && e.type.allowsMarkType(n);
                  }),
                  a)
                )
                  return { v: !0 };
              },
              i = 0;
            i < t.length;
            i++
          ) {
            var s = o(i);
            if ("object" === r(s)) return s.v;
          }
          return !1;
        }
        function A() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return function (e, n, r) {
            for (var o = 0; o < t.length; o++) if (t[o](e, n, r)) return !0;
            return !1;
          };
        }
        var R = A(a, c, f),
          P = A(a, m, v),
          I = {
            Enter: A(y, b, S, M),
            "Mod-Enter": w,
            Backspace: R,
            "Mod-Backspace": R,
            "Shift-Backspace": R,
            Delete: P,
            "Mod-Delete": P,
            "Mod-a": O,
          },
          z = {
            "Ctrl-h": I.Backspace,
            "Alt-Backspace": I["Mod-Backspace"],
            "Ctrl-d": I.Delete,
            "Ctrl-Alt-Backspace": I["Mod-Delete"],
            "Alt-Delete": I["Mod-Delete"],
            "Alt-d": I["Mod-Delete"],
            "Ctrl-a": T,
            "Ctrl-e": D,
          };
        for (var F in I) z[F] = I[F];
        var B = (
          "undefined" != typeof navigator
            ? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
            : "undefined" != typeof os &&
              os.platform &&
              "darwin" == os.platform()
        )
          ? z
          : I;
        (t.autoJoin = function (e, t) {
          var n = Array.isArray(t)
            ? function (e) {
                return t.indexOf(e.type.name) > -1;
              }
            : t;
          return function (t, r, i) {
            return e(
              t,
              r &&
                (function (e, t) {
                  return function (n) {
                    if (!n.isGeneric) return e(n);
                    for (var r = [], i = 0; i < n.mapping.maps.length; i++) {
                      for (var s = n.mapping.maps[i], a = 0; a < r.length; a++)
                        r[a] = s.map(r[a]);
                      s.forEach(function (e, t, n, o) {
                        return r.push(n, o);
                      });
                    }
                    for (var l = [], c = 0; c < r.length; c += 2)
                      for (
                        var u = r[c],
                          h = r[c + 1],
                          f = n.doc.resolve(u),
                          d = f.sharedDepth(h),
                          p = f.node(d),
                          m = f.indexAfter(d),
                          v = f.after(d + 1);
                        v <= h;
                        ++m
                      ) {
                        var g = p.maybeChild(m);
                        if (!g) break;
                        if (m && -1 == l.indexOf(v)) {
                          var y = p.child(m - 1);
                          y.type == g.type && t(y, g) && l.push(v);
                        }
                        v += g.nodeSize;
                      }
                    l.sort(function (e, t) {
                      return e - t;
                    });
                    for (var k = l.length - 1; k >= 0; k--)
                      o.canJoin(n.doc, l[k]) && n.join(l[k]);
                    e(n);
                  };
                })(r, n),
              i
            );
          };
        }),
          (t.baseKeymap = B),
          (t.chainCommands = A),
          (t.createParagraphNear = b),
          (t.deleteSelection = a),
          (t.exitCode = w),
          (t.joinBackward = c),
          (t.joinDown = function (e, t) {
            var n,
              r = e.selection;
            if (r instanceof s.NodeSelection) {
              if (r.node.isTextblock || !o.canJoin(e.doc, r.to)) return !1;
              n = r.to;
            } else if (null == (n = o.joinPoint(e.doc, r.to, 1))) return !1;
            return t && t(e.tr.join(n).scrollIntoView()), !0;
          }),
          (t.joinForward = m),
          (t.joinTextblockBackward = function (e, t, n) {
            var r = l(e, n);
            if (!r) return !1;
            var o = d(r);
            return !!o && u(e, o, t);
          }),
          (t.joinTextblockForward = function (e, t, n) {
            var r = p(e, n);
            if (!r) return !1;
            var o = g(r);
            return !!o && u(e, o, t);
          }),
          (t.joinUp = function (e, t) {
            var n,
              r = e.selection,
              i = r instanceof s.NodeSelection;
            if (i) {
              if (r.node.isTextblock || !o.canJoin(e.doc, r.from)) return !1;
              n = r.from;
            } else if (null == (n = o.joinPoint(e.doc, r.from, -1))) return !1;
            if (t) {
              var a = e.tr.join(n);
              i &&
                a.setSelection(
                  s.NodeSelection.create(
                    a.doc,
                    n - e.doc.resolve(n).nodeBefore.nodeSize
                  )
                ),
                t(a.scrollIntoView());
            }
            return !0;
          }),
          (t.lift = function (e, t) {
            var n = e.selection,
              r = n.$from,
              i = n.$to,
              s = r.blockRange(i),
              a = s && o.liftTarget(s);
            return null != a && (t && t(e.tr.lift(s, a).scrollIntoView()), !0);
          }),
          (t.liftEmptyBlock = S),
          (t.macBaseKeymap = z),
          (t.newlineInCode = y),
          (t.pcBaseKeymap = I),
          (t.selectAll = O),
          (t.selectNodeBackward = f),
          (t.selectNodeForward = v),
          (t.selectParentNode = function (e, t) {
            var n,
              r = e.selection,
              o = r.$from,
              i = r.to,
              a = o.sharedDepth(i);
            return (
              0 != a &&
              ((n = o.before(a)),
              t && t(e.tr.setSelection(s.NodeSelection.create(e.doc, n))),
              !0)
            );
          }),
          (t.selectTextblockEnd = D),
          (t.selectTextblockStart = T),
          (t.setBlockType = function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return function (n, r) {
              for (
                var o = !1, i = 0;
                i < n.selection.ranges.length && !o;
                i++
              ) {
                var s = n.selection.ranges[i],
                  a = s.$from.pos,
                  l = s.$to.pos;
                n.doc.nodesBetween(a, l, function (r, i) {
                  if (o) return !1;
                  if (r.isTextblock && !r.hasMarkup(e, t))
                    if (r.type == e) o = !0;
                    else {
                      var s = n.doc.resolve(i),
                        a = s.index();
                      o = s.parent.canReplaceWith(a, a + 1, e);
                    }
                });
              }
              if (!o) return !1;
              if (r) {
                for (var c = n.tr, u = 0; u < n.selection.ranges.length; u++) {
                  var h = n.selection.ranges[u],
                    f = h.$from.pos,
                    d = h.$to.pos;
                  c.setBlockType(f, d, e, t);
                }
                r(c.scrollIntoView());
              }
              return !0;
            };
          }),
          (t.splitBlock = M),
          (t.splitBlockAs = x),
          (t.splitBlockKeepMarks = function (e, t) {
            return M(
              e,
              t &&
                function (n) {
                  var r =
                    e.storedMarks ||
                    (e.selection.$to.parentOffset && e.selection.$from.marks());
                  r && n.ensureMarks(r), t(n);
                }
            );
          }),
          (t.toggleMark = function (e) {
            //en esta funcion activa o desactiva lo seleccionado en el menubar
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return function (n, r) {
              var o = n.selection,
                i = o.empty,
                s = o.$cursor,
                a = o.ranges;
              if ((i && !s) || !E(n.doc, a, e)) return !1;
              // console.log(r,s);
              // console.log(selcmb.value);
// console.log(oculto.value);
              if (r)
                if (s) {
                  //[Lmendez]
                  //   console.log("esto es",s);
                  // console.log("n",n.doc);
                  //   console.log("s",s.marks);
                  // console.log(e.name, "n", n.storedMarks, "s", s.marks);
                  dveditor = document.getElementById("dvEditor"); 
                  var itemselected =
                    t === null ? null : document.getElementById(selcmb.value);
                  // console.log("prueba",itemselected,t)
                  itemselected === null
                    ? null
                    : (itemselected.firstChild.nodeValue = oculto.value);

                  // if(menuseleccionado.title === "Tamaño de fuente")
                  // menuseleccionado.firstChild.nodeValue = t.tamanioFuente;
                  // if (e.)
                  // e.isInSet(n.storedMarks || s.marks())
                  //   ? r(n.tr.removeStoredMark(e))
                  //   : r(n.tr.addStoredMark(e.create(t)));
                  if (e.name === "strong" || e.name === "em") {
                    //se valida si se requiere remover Negrita o Cursiva
                    e.isInSet(n.storedMarks || s.marks())
                      ? r(n.tr.removeStoredMark(e))
                      : r(n.tr.addStoredMark(e.create(t)));
                  } else {
                    e.isInSet(n.storedMarks || s.marks());
                    r(n.tr.addStoredMark(e.create(t)));
                  }
                  /*se comento la parte de arriba ya que en cada seleccion
                  de tamaño de fuente realizaba el remover el storedMark*/
                } else {
                  var itemselected =
                    t === null ? null : document.getElementById(selcmb.value);
                  // console.log("prueba",itemselected,t)
                  itemselected === null //asignamos el valor al titulo del combo box para ver la selccion del usuario
                    ? null
                    : (itemselected.firstChild.nodeValue = oculto.value);

                  for (var l = !1, c = n.tr, u = 0; !l && u < a.length; u++) {
                    var h = a[u],
                      f = h.$from,
                      d = h.$to;
                    l = n.doc.rangeHasMark(f.pos, d.pos, e);
                  }
                  for (var p = 0; p < a.length; p++) {
                    var m = a[p],
                      v = m.$from,
                      g = m.$to;
                    if (l){ c.removeMark(v.pos, g.pos, e);
                    }
                    else {
                      // console.log("entro aqui");
                      var y = v.pos,
                        k = g.pos,
                        w = v.nodeAfter,
                        b = g.nodeBefore,
                        S = w && w.isText ? /^\s*/.exec(w.text)[0].length : 0,
                        x = b && b.isText ? /\s*$/.exec(b.text)[0].length : 0;
                      y + S < k && ((y += S), (k -= x)),
                        c.addMark(y, k, e.create(t));
                    }
                  }
                  r(c.scrollIntoView());
                }
              return !0;
            };
          }),
          (t.wrapIn = function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return function (n, r) {
              var i = n.selection,
                s = i.$from,
                a = i.$to,
                l = s.blockRange(a),
                c = l && o.findWrapping(l, e, t);
              return !!c && (r && r(n.tr.wrap(l, c).scrollIntoView()), !0);
            };
          });
      },
      588: (e, t, n) => {
        function r(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o = n(391),
          i = n(843),
          s = (function () {
            function e(t, n) {
              var r = this;
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.editorView = t),
                (this.cursorPos = null),
                (this.element = null),
                (this.timeout = -1),
                (this.width = n.width || 1),
                (this.color = n.color || "black"),
                (this.class = n.class),
                (this.handlers = [
                  "dragover",
                  "dragend",
                  "drop",
                  "dragleave",
                ].map(function (e) {
                  var n = function (t) {
                    r[e](t);
                  };
                  return t.dom.addEventListener(e, n), { name: e, handler: n };
                }));
            }
            var t, n;
            return (
              (t = e),
              (n = [
                {
                  key: "destroy",
                  value: function () {
                    var e = this;
                    this.handlers.forEach(function (t) {
                      var n = t.name,
                        r = t.handler;
                      return e.editorView.dom.removeEventListener(n, r);
                    });
                  },
                },
                {
                  key: "update",
                  value: function (e, t) {
                    null != this.cursorPos &&
                      t.doc != e.state.doc &&
                      (this.cursorPos > e.state.doc.content.size
                        ? this.setCursor(null)
                        : this.updateOverlay());
                  },
                },
                {
                  key: "setCursor",
                  value: function (e) {
                    e != this.cursorPos &&
                      ((this.cursorPos = e),
                      null == e
                        ? (this.element.parentNode.removeChild(this.element),
                          (this.element = null))
                        : this.updateOverlay());
                  },
                },
                {
                  key: "updateOverlay",
                  value: function () {
                    var e,
                      t = this.editorView.state.doc.resolve(this.cursorPos);
                    if (!t.parent.inlineContent) {
                      var n = t.nodeBefore,
                        r = t.nodeAfter;
                      if (n || r) {
                        var o = this.editorView.nodeDOM(
                          this.cursorPos - (n ? n.nodeSize : 0)
                        );
                        if (o) {
                          var i = o.getBoundingClientRect(),
                            s = n ? i.bottom : i.top;
                          n &&
                            r &&
                            (s =
                              (s +
                                this.editorView
                                  .nodeDOM(this.cursorPos)
                                  .getBoundingClientRect().top) /
                              2),
                            (e = {
                              left: i.left,
                              right: i.right,
                              top: s - this.width / 2,
                              bottom: s + this.width / 2,
                            });
                        }
                      }
                    }
                    if (!e) {
                      var a = this.editorView.coordsAtPos(this.cursorPos);
                      e = {
                        left: a.left - this.width / 2,
                        right: a.left + this.width / 2,
                        top: a.top,
                        bottom: a.bottom,
                      };
                    }
                    var l,
                      c,
                      u = this.editorView.dom.offsetParent;
                    if (
                      (this.element ||
                        ((this.element = u.appendChild(
                          document.createElement("div")
                        )),
                        this.class && (this.element.className = this.class),
                        (this.element.style.cssText =
                          "position: absolute; z-index: 50; pointer-events: none; background-color: " +
                          this.color)),
                      !u ||
                        (u == document.body &&
                          "static" == getComputedStyle(u).position))
                    )
                      (l = -pageXOffset), (c = -pageYOffset);
                    else {
                      var h = u.getBoundingClientRect();
                      (l = h.left - u.scrollLeft), (c = h.top - u.scrollTop);
                    }
                    (this.element.style.left = e.left - l + "px"),
                      (this.element.style.top = e.top - c + "px"),
                      (this.element.style.width = e.right - e.left + "px"),
                      (this.element.style.height = e.bottom - e.top + "px");
                  },
                },
                {
                  key: "scheduleRemoval",
                  value: function (e) {
                    var t = this;
                    clearTimeout(this.timeout),
                      (this.timeout = setTimeout(function () {
                        return t.setCursor(null);
                      }, e));
                  },
                },
                {
                  key: "dragover",
                  value: function (e) {
                    if (this.editorView.editable) {
                      var t = this.editorView.posAtCoords({
                          left: e.clientX,
                          top: e.clientY,
                        }),
                        n =
                          t &&
                          t.inside >= 0 &&
                          this.editorView.state.doc.nodeAt(t.inside),
                        r = n && n.type.spec.disableDropCursor,
                        o =
                          "function" == typeof r ? r(this.editorView, t, e) : r;
                      if (t && !o) {
                        var s = t.pos;
                        if (
                          this.editorView.dragging &&
                          this.editorView.dragging.slice &&
                          null ==
                            (s = i.dropPoint(
                              this.editorView.state.doc,
                              s,
                              this.editorView.dragging.slice
                            ))
                        )
                          return this.setCursor(null);
                        this.setCursor(s), this.scheduleRemoval(5e3);
                      }
                    }
                  },
                },
                {
                  key: "dragend",
                  value: function () {
                    this.scheduleRemoval(20);
                  },
                },
                {
                  key: "drop",
                  value: function () {
                    this.scheduleRemoval(20);
                  },
                },
                {
                  key: "dragleave",
                  value: function (e) {
                    (e.target != this.editorView.dom &&
                      this.editorView.dom.contains(e.relatedTarget)) ||
                      this.setCursor(null);
                  },
                },
              ]) && r(t.prototype, n),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              e
            );
          })();
        t.dropCursor = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return new o.Plugin({
            view: function (t) {
              return new s(t, e);
            },
          });
        };
      },
      634: (e, t, n) => {
        function r(e) {
          return (
            (r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            r(e)
          );
        }
        function o(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function i(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function s(e, t, n) {
          return (
            t && i(e.prototype, t),
            n && i(e, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
        }
        function a(e, t) {
          return (
            (a =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e;
              }),
            a(e, t)
          );
        }
        function l(e, t) {
          if (t && ("object" === r(t) || "function" == typeof t)) return t;
          if (void 0 !== t)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return (function (e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return e;
          })(e);
        }
        function c(e) {
          return (
            (c = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            c(e)
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var u = n(354),
          h = n(391),
          f = n(443),
          d = n(222),
          p = (function (e) {
            !(function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(e, "prototype", { writable: !1 }),
                t && a(e, t);
            })(i, e);
            var t,
              n,
              r =
                ((t = i),
                (n = (function () {
                  if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                  if (Reflect.construct.sham) return !1;
                  if ("function" == typeof Proxy) return !0;
                  try {
                    return (
                      Boolean.prototype.valueOf.call(
                        Reflect.construct(Boolean, [], function () {})
                      ),
                      !0
                    );
                  } catch (e) {
                    return !1;
                  }
                })()),
                function () {
                  var e,
                    r = c(t);
                  if (n) {
                    var o = c(this).constructor;
                    e = Reflect.construct(r, arguments, o);
                  } else e = r.apply(this, arguments);
                  return l(this, e);
                });
            function i(e) {
              return o(this, i), r.call(this, e, e);
            }
            return (
              s(
                i,
                [
                  {
                    key: "map",
                    value: function (e, t) {
                      var n = e.resolve(t.map(this.head));
                      return i.valid(n) ? new i(n) : h.Selection.near(n);
                    },
                  },
                  {
                    key: "content",
                    value: function () {
                      return f.Slice.empty;
                    },
                  },
                  {
                    key: "eq",
                    value: function (e) {
                      return e instanceof i && e.head == this.head;
                    },
                  },
                  {
                    key: "toJSON",
                    value: function () {
                      return { type: "gapcursor", pos: this.head };
                    },
                  },
                  {
                    key: "getBookmark",
                    value: function () {
                      return new m(this.anchor);
                    },
                  },
                ],
                [
                  {
                    key: "fromJSON",
                    value: function (e, t) {
                      if ("number" != typeof t.pos)
                        throw new RangeError(
                          "Invalid input for GapCursor.fromJSON"
                        );
                      return new i(e.resolve(t.pos));
                    },
                  },
                  {
                    key: "valid",
                    value: function (e) {
                      var t = e.parent;
                      if (
                        t.isTextblock ||
                        !(function (e) {
                          for (var t = e.depth; t >= 0; t--) {
                            var n = e.index(t),
                              r = e.node(t);
                            if (0 != n)
                              for (var o = r.child(n - 1); ; o = o.lastChild) {
                                if (
                                  (0 == o.childCount && !o.inlineContent) ||
                                  o.isAtom ||
                                  o.type.spec.isolating
                                )
                                  return !0;
                                if (o.inlineContent) return !1;
                              }
                            else if (r.type.spec.isolating) return !0;
                          }
                          return !0;
                        })(e) ||
                        !(function (e) {
                          for (var t = e.depth; t >= 0; t--) {
                            var n = e.indexAfter(t),
                              r = e.node(t);
                            if (n != r.childCount)
                              for (var o = r.child(n); ; o = o.firstChild) {
                                if (
                                  (0 == o.childCount && !o.inlineContent) ||
                                  o.isAtom ||
                                  o.type.spec.isolating
                                )
                                  return !0;
                                if (o.inlineContent) return !1;
                              }
                            else if (r.type.spec.isolating) return !0;
                          }
                          return !0;
                        })(e)
                      )
                        return !1;
                      var n = t.type.spec.allowGapCursor;
                      if (null != n) return n;
                      var r = t.contentMatchAt(e.index()).defaultType;
                      return r && r.isTextblock;
                    },
                  },
                  {
                    key: "findGapCursorFrom",
                    value: function (e, t) {
                      var n =
                        arguments.length > 2 &&
                        void 0 !== arguments[2] &&
                        arguments[2];
                      e: for (;;) {
                        if (!n && i.valid(e)) return e;
                        for (var r = e.pos, o = null, s = e.depth; ; s--) {
                          var a = e.node(s);
                          if (
                            t > 0
                              ? e.indexAfter(s) < a.childCount
                              : e.index(s) > 0
                          ) {
                            o = a.child(
                              t > 0 ? e.indexAfter(s) : e.index(s) - 1
                            );
                            break;
                          }
                          if (0 == s) return null;
                          r += t;
                          var l = e.doc.resolve(r);
                          if (i.valid(l)) return l;
                        }
                        for (;;) {
                          var c = t > 0 ? o.firstChild : o.lastChild;
                          if (!c) {
                            if (
                              o.isAtom &&
                              !o.isText &&
                              !h.NodeSelection.isSelectable(o)
                            ) {
                              (e = e.doc.resolve(r + o.nodeSize * t)), (n = !1);
                              continue e;
                            }
                            break;
                          }
                          (o = c), (r += t);
                          var u = e.doc.resolve(r);
                          if (i.valid(u)) return u;
                        }
                        return null;
                      }
                    },
                  },
                ]
              ),
              i
            );
          })(h.Selection);
        (p.prototype.visible = !1),
          (p.findFrom = p.findGapCursorFrom),
          h.Selection.jsonID("gapcursor", p);
        var m = (function () {
            function e(t) {
              o(this, e), (this.pos = t);
            }
            return (
              s(e, [
                {
                  key: "map",
                  value: function (t) {
                    return new e(t.map(this.pos));
                  },
                },
                {
                  key: "resolve",
                  value: function (e) {
                    var t = e.resolve(this.pos);
                    return p.valid(t) ? new p(t) : h.Selection.near(t);
                  },
                },
              ]),
              e
            );
          })(),
          v = u.keydownHandler({
            ArrowLeft: g("horiz", -1),
            ArrowRight: g("horiz", 1),
            ArrowUp: g("vert", -1),
            ArrowDown: g("vert", 1),
          });
        function g(e, t) {
          var n =
            "vert" == e ? (t > 0 ? "down" : "up") : t > 0 ? "right" : "left";
          return function (e, r, o) {
            // var elementoEnfoqueActual = document.activeElement;
// console.log(elementoEnfoqueActual);
            var i = e.selection,
              s = t > 0 ? i.$to : i.$from,
              a = i.empty;
            if (i instanceof h.TextSelection) {
              if (!o.endOfTextblock(n) || 0 == s.depth) return !1;
              (a = !1), (s = e.doc.resolve(t > 0 ? s.after() : s.before()));
            }
            var l = p.findGapCursorFrom(s, t, a);
            return !!l && (r && r(e.tr.setSelection(new p(l))), !0);
          };
        }
        function y(e, t, n) {
          if (!e || !e.editable) return !1;
          var r = e.state.doc.resolve(t);
          if (!p.valid(r)) return !1;
          var o = e.posAtCoords({ left: n.clientX, top: n.clientY });
          return !(
            (o &&
              o.inside > -1 &&
              h.NodeSelection.isSelectable(e.state.doc.nodeAt(o.inside))) ||
            (e.dispatch(e.state.tr.setSelection(new p(r))), 0)
          );
        }
        function k(e, t) {
          if (
            "insertCompositionText" != t.inputType ||
            !(e.state.selection instanceof p)
          )
            return !1;
          var n = e.state.selection.$from,
            r = n.parent
              .contentMatchAt(n.index())
              .findWrapping(e.state.schema.nodes.text);
          if (!r) return !1;
          for (var o = f.Fragment.empty, i = r.length - 1; i >= 0; i--)
            o = f.Fragment.from(r[i].createAndFill(null, o));
          var s = e.state.tr.replace(n.pos, n.pos, new f.Slice(o, 0, 0));
          return (
            s.setSelection(h.TextSelection.near(s.doc.resolve(n.pos + 1))),
            e.dispatch(s),
            !1
          );
        }
        function w(e) {
          if (!(e.selection instanceof p)) return null;
          var t = document.createElement("div");
          return (
            (t.className = "ProseMirror-gapcursor"),
            d.DecorationSet.create(e.doc, [
              d.Decoration.widget(e.selection.head, t, { key: "gapcursor" }),
            ])
          );
        }
        (t.GapCursor = p),
          (t.gapCursor = function () {
            return new h.Plugin({
              props: {
                decorations: w,
                createSelectionBetween: function (e, t, n) {
                  return t.pos == n.pos && p.valid(n) ? new p(n) : null;
                },
                handleClick: y,
                handleKeyDown: v,
                handleDOMEvents: { beforeinput: k },
              },
            });
          });
      },
      638: (e, t, n) => {
        function r(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function i(e, t, n) {
          return (
            t && o(e.prototype, t),
            n && o(e, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
        }
        function s(e) {
          return (
            (s =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            s(e)
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a,
          l = n(464),
          c = n(843),
          u = n(391),
          h =
            (a = l) && "object" === s(a) && "default" in a ? a : { default: a },
          f = (function () {
            function e(t, n) {
              r(this, e), (this.items = t), (this.eventCount = n);
            }
            return (
              i(e, [
                {
                  key: "popEvent",
                  value: function (t, n) {
                    var r = this;
                    if (0 == this.eventCount) return null;
                    for (var o, i, s = this.items.length; ; s--)
                      if (this.items.get(s - 1).selection) {
                        --s;
                        break;
                      }
                    n &&
                      ((o = this.remapping(s, this.items.length)),
                      (i = o.maps.length));
                    var a,
                      l,
                      c = t.tr,
                      u = [],
                      h = [];
                    return (
                      this.items.forEach(
                        function (t, n) {
                          if (!t.step)
                            return (
                              o ||
                                ((o = r.remapping(s, n + 1)),
                                (i = o.maps.length)),
                              i--,
                              void h.push(t)
                            );
                          if (o) {
                            h.push(new d(t.map));
                            var f,
                              p = t.step.map(o.slice(i));
                            p &&
                              c.maybeStep(p).doc &&
                              ((f = c.mapping.maps[c.mapping.maps.length - 1]),
                              u.push(
                                new d(f, void 0, void 0, u.length + h.length)
                              )),
                              i--,
                              f && o.appendMap(f, i);
                          } else c.maybeStep(t.step);
                          return t.selection
                            ? ((a = o
                                ? t.selection.map(o.slice(i))
                                : t.selection),
                              (l = new e(
                                r.items
                                  .slice(0, s)
                                  .append(h.reverse().concat(u)),
                                r.eventCount - 1
                              )),
                              !1)
                            : void 0;
                        },
                        this.items.length,
                        0
                      ),
                      { remaining: l, transform: c, selection: a }
                    );
                  },
                },
                {
                  key: "addTransform",
                  value: function (t, n, r, o) {
                    for (
                      var i = [],
                        s = this.eventCount,
                        a = this.items,
                        l = !o && a.length ? a.get(a.length - 1) : null,
                        c = 0;
                      c < t.steps.length;
                      c++
                    ) {
                      var u,
                        h = t.steps[c].invert(t.docs[c]),
                        f = new d(t.mapping.maps[c], h, n);
                      (u = l && l.merge(f)) &&
                        ((f = u), c ? i.pop() : (a = a.slice(0, a.length - 1))),
                        i.push(f),
                        n && (s++, (n = void 0)),
                        o || (l = f);
                    }
                    var p,
                      v,
                      g,
                      y = s - r.depth;
                    return (
                      y > m &&
                        ((v = y),
                        (p = a).forEach(function (e, t) {
                          if (e.selection && 0 == v--) return (g = t), !1;
                        }),
                        (a = p.slice(g)),
                        (s -= y)),
                      new e(a.append(i), s)
                    );
                  },
                },
                {
                  key: "remapping",
                  value: function (e, t) {
                    var n = new c.Mapping();
                    return (
                      this.items.forEach(
                        function (t, r) {
                          var o =
                            null != t.mirrorOffset && r - t.mirrorOffset >= e
                              ? n.maps.length - t.mirrorOffset
                              : void 0;
                          n.appendMap(t.map, o);
                        },
                        e,
                        t
                      ),
                      n
                    );
                  },
                },
                {
                  key: "addMaps",
                  value: function (t) {
                    return 0 == this.eventCount
                      ? this
                      : new e(
                          this.items.append(
                            t.map(function (e) {
                              return new d(e);
                            })
                          ),
                          this.eventCount
                        );
                  },
                },
                {
                  key: "rebased",
                  value: function (t, n) {
                    if (!this.eventCount) return this;
                    var r = [],
                      o = Math.max(0, this.items.length - n),
                      i = t.mapping,
                      s = t.steps.length,
                      a = this.eventCount;
                    this.items.forEach(function (e) {
                      e.selection && a--;
                    }, o);
                    var l = n;
                    this.items.forEach(function (e) {
                      var n = i.getMirror(--l);
                      if (null != n) {
                        s = Math.min(s, n);
                        var o = i.maps[n];
                        if (e.step) {
                          var c = t.steps[n].invert(t.docs[n]),
                            u =
                              e.selection && e.selection.map(i.slice(l + 1, n));
                          u && a++, r.push(new d(o, c, u));
                        } else r.push(new d(o));
                      }
                    }, o);
                    for (var c = [], u = n; u < s; u++)
                      c.push(new d(i.maps[u]));
                    var h = new e(
                      this.items.slice(0, o).append(c).append(r),
                      a
                    );
                    return (
                      h.emptyItemCount() > 500 &&
                        (h = h.compress(this.items.length - r.length)),
                      h
                    );
                  },
                },
                {
                  key: "emptyItemCount",
                  value: function () {
                    var e = 0;
                    return (
                      this.items.forEach(function (t) {
                        t.step || e++;
                      }),
                      e
                    );
                  },
                },
                {
                  key: "compress",
                  value: function () {
                    var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : this.items.length,
                      n = this.remapping(0, t),
                      r = n.maps.length,
                      o = [],
                      i = 0;
                    return (
                      this.items.forEach(
                        function (e, s) {
                          if (s >= t) o.push(e), e.selection && i++;
                          else if (e.step) {
                            var a = e.step.map(n.slice(r)),
                              l = a && a.getMap();
                            if ((r--, l && n.appendMap(l, r), a)) {
                              var c =
                                e.selection && e.selection.map(n.slice(r));
                              c && i++;
                              var u,
                                h = new d(l.invert(), a, c),
                                f = o.length - 1;
                              (u = o.length && o[f].merge(h))
                                ? (o[f] = u)
                                : o.push(h);
                            }
                          } else e.map && r--;
                        },
                        this.items.length,
                        0
                      ),
                      new e(h.default.from(o.reverse()), i)
                    );
                  },
                },
              ]),
              e
            );
          })();
        f.empty = new f(h.default.empty, 0);
        var d = (function () {
            function e(t, n, o, i) {
              r(this, e),
                (this.map = t),
                (this.step = n),
                (this.selection = o),
                (this.mirrorOffset = i);
            }
            return (
              i(e, [
                {
                  key: "merge",
                  value: function (t) {
                    if (this.step && t.step && !t.selection) {
                      var n = t.step.merge(this.step);
                      if (n)
                        return new e(n.getMap().invert(), n, this.selection);
                    }
                  },
                },
              ]),
              e
            );
          })(),
          p = i(function e(t, n, o, i) {
            r(this, e),
              (this.done = t),
              (this.undone = n),
              (this.prevRanges = o),
              (this.prevTime = i);
          }),
          m = 20;
        function v(e, t, n, r) {
          var o,
            i = n.getMeta(x);
          if (i) return i.historyState;
          n.getMeta(M) && (e = new p(e.done, e.undone, null, 0));
          var s = n.getMeta("appendedTransaction");
          if (0 == n.steps.length) return e;
          if (s && s.getMeta(x))
            return s.getMeta(x).redo
              ? new p(
                  e.done.addTransform(n, void 0, r, S(t)),
                  e.undone,
                  g(n.mapping.maps[n.steps.length - 1]),
                  e.prevTime
                )
              : new p(
                  e.done,
                  e.undone.addTransform(n, void 0, r, S(t)),
                  null,
                  e.prevTime
                );
          if (
            !1 === n.getMeta("addToHistory") ||
            (s && !1 === s.getMeta("addToHistory"))
          )
            return (o = n.getMeta("rebased"))
              ? new p(
                  e.done.rebased(n, o),
                  e.undone.rebased(n, o),
                  y(e.prevRanges, n.mapping),
                  e.prevTime
                )
              : new p(
                  e.done.addMaps(n.mapping.maps),
                  e.undone.addMaps(n.mapping.maps),
                  y(e.prevRanges, n.mapping),
                  e.prevTime
                );
          var a =
              0 == e.prevTime ||
              (!s &&
                (e.prevTime < (n.time || 0) - r.newGroupDelay ||
                  !(function (e, t) {
                    if (!t) return !1;
                    if (!e.docChanged) return !0;
                    var n = !1;
                    return (
                      e.mapping.maps[0].forEach(function (e, r) {
                        for (var o = 0; o < t.length; o += 2)
                          e <= t[o + 1] && r >= t[o] && (n = !0);
                      }),
                      n
                    );
                  })(n, e.prevRanges))),
            l = s
              ? y(e.prevRanges, n.mapping)
              : g(n.mapping.maps[n.steps.length - 1]);
          return new p(
            e.done.addTransform(
              n,
              a ? t.selection.getBookmark() : void 0,
              r,
              S(t)
            ),
            f.empty,
            l,
            n.time
          );
        }
        function g(e) {
          var t = [];
          return (
            e.forEach(function (e, n, r, o) {
              return t.push(r, o);
            }),
            t
          );
        }
        function y(e, t) {
          if (!e) return null;
          for (var n = [], r = 0; r < e.length; r += 2) {
            var o = t.map(e[r], 1),
              i = t.map(e[r + 1], -1);
            o <= i && n.push(o, i);
          }
          return n;
        }
        function k(e, t, n, r) {
          var o = S(t),
            i = x.get(t).spec.config,
            s = (r ? e.undone : e.done).popEvent(t, o);
          if (s) {
            var a = s.selection.resolve(s.transform.doc),
              l = (r ? e.done : e.undone).addTransform(
                s.transform,
                t.selection.getBookmark(),
                i,
                o
              ),
              c = new p(r ? l : s.remaining, r ? s.remaining : l, null, 0);
            n(
              s.transform
                .setSelection(a)
                .setMeta(x, { redo: r, historyState: c })
                .scrollIntoView()
            );
          }
        }
        var w = !1,
          b = null;
        function S(e) {
          var t = e.plugins;
          if (b != t) {
            (w = !1), (b = t);
            for (var n = 0; n < t.length; n++)
              if (t[n].spec.historyPreserveItems) {
                w = !0;
                break;
              }
          }
          return w;
        }
        var x = new u.PluginKey("history"),
          M = new u.PluginKey("closeHistory"),
          O = function (e, t) {
            var n = x.getState(e);
            return !(!n || 0 == n.done.eventCount || (t && k(n, e, t, !1), 0));
          },
          C = function (e, t) {
            var n = x.getState(e);
            return !(
              !n ||
              0 == n.undone.eventCount ||
              (t && k(n, e, t, !0), 0)
            );
          };
        (t.closeHistory = function (e) {
          return e.setMeta(M, !0);
        }),
          (t.history = function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            return (
              (e = {
                depth: e.depth || 100,
                newGroupDelay: e.newGroupDelay || 500,
              }),
              new u.Plugin({
                key: x,
                state: {
                  init: function () {
                    return new p(f.empty, f.empty, null, 0);
                  },
                  apply: function (t, n, r) {
                    return v(n, r, t, e);
                  },
                },
                config: e,
                props: {
                  handleDOMEvents: {
                    beforeinput: function (e, t) {
                      var n = t.inputType,
                        r =
                          "historyUndo" == n
                            ? O
                            : "historyRedo" == n
                            ? C
                            : null;
                      return (
                        !!r && (t.preventDefault(), r(e.state, e.dispatch))
                      );
                    },
                  },
                },
              })
            );
          }),
          (t.redo = C),
          (t.redoDepth = function (e) {
            var t = x.getState(e);
            return t ? t.undone.eventCount : 0;
          }),
          (t.undo = O),
          (t.undoDepth = function (e) {
            var t = x.getState(e);
            return t ? t.done.eventCount : 0;
          });
      },
      665: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r,
          o = n(391),
          i = n(843),
          s =
            ((r = function e(t, n) {
              var r;
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.match = t),
                (this.match = t),
                (this.handler =
                  "string" == typeof n
                    ? ((r = n),
                      function (e, t, n, o) {
                        var i = r;
                        if (t[1]) {
                          var s = t[0].lastIndexOf(t[1]);
                          i += t[0].slice(s + t[1].length);
                          var a = (n += s) - o;
                          a > 0 && ((i = t[0].slice(s - a, s) + i), (n = o));
                        }
                        return e.tr.insertText(i, n, o);
                      })
                    : n);
            }),
            Object.defineProperty(r, "prototype", { writable: !1 }),
            r);
        function a(e, t, n, r, o, i) {
          if (e.composing) return !1;
          var s = e.state,
            a = s.doc.resolve(t);
          if (a.parent.type.spec.code) return !1;
          for (
            var l =
                a.parent.textBetween(
                  Math.max(0, a.parentOffset - 500),
                  a.parentOffset,
                  null,
                  "￼"
                ) + r,
              c = 0;
            c < o.length;
            c++
          ) {
            var u = o[c].match.exec(l),
              h = u && o[c].handler(s, u, t - (u[0].length - r.length), n);
            if (h)
              return (
                e.dispatch(
                  h.setMeta(i, { transform: h, from: t, to: n, text: r })
                ),
                !0
              );
          }
          return !1;
        }
        var l = new s(/--$/, "—"),
          c = new s(/\.\.\.$/, "…"),
          u = new s(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, "“"),
          h = new s(/"$/, "”"),
          f = new s(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, "‘"),
          d = new s(/'$/, "’"),
          p = [u, h, f, d];
        (t.InputRule = s),
          (t.closeDoubleQuote = h),
          (t.closeSingleQuote = d),
          (t.ellipsis = c),
          (t.emDash = l),
          (t.inputRules = function (e) {
            var t = e.rules,
              n = new o.Plugin({
                state: {
                  init: function () {
                    return null;
                  },
                  apply: function (e, t) {
                    return (
                      e.getMeta(this) ||
                      (e.selectionSet || e.docChanged ? null : t)
                    );
                  },
                },
                props: {
                  handleTextInput: function (e, r, o, i) {
                    return a(e, r, o, i, t, n);
                  },
                  handleDOMEvents: {
                    compositionend: function (e) {
                      setTimeout(function () {
                        var r = e.state.selection.$cursor;
                        r && a(e, r.pos, r.pos, "", t, n);
                      });
                    },
                  },
                },
                isInputRules: !0,
              });
            return n;
          }),
          (t.openDoubleQuote = u),
          (t.openSingleQuote = f),
          (t.smartQuotes = p),
          (t.textblockTypeInputRule = function (e, t) {
            var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            return new s(e, function (e, r, o, i) {
              var s = e.doc.resolve(o),
                a = n instanceof Function ? n(r) : n;
              return s.node(-1).canReplaceWith(s.index(-1), s.indexAfter(-1), t)
                ? e.tr.delete(o, i).setBlockType(o, o, t, a)
                : null;
            });
          }),
          (t.undoInputRule = function (e, t) {
            for (var n = e.plugins, r = 0; r < n.length; r++) {
              var o = n[r],
                i = void 0;
              if (o.spec.isInputRules && (i = o.getState(e))) {
                if (t) {
                  for (
                    var s = e.tr, a = i.transform, l = a.steps.length - 1;
                    l >= 0;
                    l--
                  )
                    s.step(a.steps[l].invert(a.docs[l]));
                  if (i.text) {
                    var c = s.doc.resolve(i.from).marks();
                    s.replaceWith(i.from, i.to, e.schema.text(i.text, c));
                  } else s.delete(i.from, i.to);
                  t(s);
                }
                return !0;
              }
            }
            return !1;
          }),
          (t.wrappingInputRule = function (e, t) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null,
              r = arguments.length > 3 ? arguments[3] : void 0;
            return new s(e, function (e, o, s, a) {
              var l = n instanceof Function ? n(o) : n,
                c = e.tr.delete(s, a),
                u = c.doc.resolve(s).blockRange(),
                h = u && i.findWrapping(u, t, l);
              if (!h) return null;
              c.wrap(u, h);
              var f = c.doc.resolve(s - 1).nodeBefore;
              return (
                f &&
                  f.type == t &&
                  i.canJoin(c.doc, s - 1) &&
                  (!r || r(o, f)) &&
                  c.join(s - 1),
                c
              );
            });
          });
      },
      354: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(691),
          o = n(391),
          i =
            "undefined" != typeof navigator &&
            /Mac|iP(hone|[oa]d)/.test(navigator.platform);
        function s(e) {
          var t,
            n,
            r,
            o,
            s = e.split(/-(?!$)/),
            a = s[s.length - 1];
          "Space" == a && (a = " ");
          for (var l = 0; l < s.length - 1; l++) {
            var c = s[l];
            if (/^(cmd|meta|m)$/i.test(c)) o = !0;
            else if (/^a(lt)?$/i.test(c)) t = !0;
            else if (/^(c|ctrl|control)$/i.test(c)) n = !0;
            else if (/^s(hift)?$/i.test(c)) r = !0;
            else {
              if (!/^mod$/i.test(c))
                throw new Error("Unrecognized modifier name: " + c);
              i ? (o = !0) : (n = !0);
            }
          }
          return (
            t && (a = "Alt-" + a),
            n && (a = "Ctrl-" + a),
            o && (a = "Meta-" + a),
            r && (a = "Shift-" + a),
            a
          );
        }
        function a(e, t, n) {
          return (
            t.altKey && (e = "Alt-" + e),
            t.ctrlKey && (e = "Ctrl-" + e),
            t.metaKey && (e = "Meta-" + e),
            !1 !== n && t.shiftKey && (e = "Shift-" + e),
            e
          );
        }
        function l(e) {
          var t = (function (e) {
            var t = Object.create(null);
            for (var n in e) t[s(n)] = e[n];
            return t;
          })(e);
          return function (e, n) {
            var o,
              i = r.keyName(n),
              s = 1 == i.length && " " != i,
              l = t[a(i, n, !s)];
            if (l && l(e.state, e.dispatch, e)) return !0;
            if (
              s &&
              (n.shiftKey || n.altKey || n.metaKey || i.charCodeAt(0) > 127) &&
              (o = r.base[n.keyCode]) &&
              o != i
            ) {
              var c = t[a(o, n, !0)];
              if (c && c(e.state, e.dispatch, e)) return !0;
            } else if (s && n.shiftKey) {
              var u = t[a(i, n, !0)];
              if (u && u(e.state, e.dispatch, e)) return !0;
            }
            return !1;
          };
        }
        (t.keydownHandler = l),
          (t.keymap = function (e) {
            return new o.Plugin({ props: { handleKeyDown: l(e) } });
          });
      },
      371: (e, t, n) => {
        function r(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function i(e, t, n) {
          return (
            t && o(e.prototype, t),
            n && o(e, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
        }
        function s(e) {
          return (
            (s =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            s(e)
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a,
          l = n(513),
          c = n(270),
          u = n(638),
          h = n(391),
          f =
            (a = l) && "object" === s(a) && "default" in a ? a : { default: a },
          d = "http://www.w3.org/2000/svg",
          p = "ProseMirror-icon";
        var m = "ProseMirror-menu",
          v = (function () {
            function e(t) {
              r(this, e), (this.spec = t);
            }
            return (
              i(e, [
                {
                  key: "render",
                  value: function (e) {
                    var t = this.spec,
                      n = t.render
                        ? t.render(e)
                        : t.icon
                        ? (function (e) {
                            var t = document.createElement("div");
                            if (((t.className = p), e.path)) {
                              var n = e.path,
                                r = e.width,
                                o = e.height,
                                i =
                                  "pm-icon-" +
                                  (function (e) {
                                    for (var t = 0, n = 0; n < e.length; n++)
                                      t = ((t << 5) - t + e.charCodeAt(n)) | 0;
                                    return t;
                                  })(n).toString(16);
                              document.getElementById(i) ||
                                (function (e, t) {
                                  var n = document.getElementById(
                                    p + "-collection"
                                  );
                                  n ||
                                    (((n = document.createElementNS(
                                      d,
                                      "svg"
                                    )).id = p + "-collection"),
                                    (n.style.display = "none"),
                                    document.body.insertBefore(
                                      n,
                                      document.body.firstChild
                                    ));
                                  var r = document.createElementNS(d, "symbol");
                                  (r.id = e),
                                    r.setAttribute(
                                      "viewBox",
                                      "0 0 " + t.width + " " + t.height
                                    ),
                                    r
                                      .appendChild(
                                        document.createElementNS(d, "path")
                                      )
                                      .setAttribute("d", t.path),
                                    n.appendChild(r);
                                })(i, e);
                              var s = t.appendChild(
                                document.createElementNS(d, "svg")
                              );
                              (s.style.width = r / o + "em"),
                                s
                                  .appendChild(
                                    document.createElementNS(d, "use")
                                  )
                                  .setAttributeNS(
                                    "http://www.w3.org/1999/xlink",
                                    "href",
                                    /([^#]*)/.exec(
                                      document.location.toString()
                                    )[1] +
                                      "#" +
                                      i
                                  );
                            } else if (e.dom) {
                              t.appendChild(e.dom.cloneNode(!0));
                              
                            } else {
                              var a = e.text,
                                l = e.css;
                                
                              (t.appendChild(
                                document.createElement("span")
                              ).textContent = a || ""),
                                l && (t.firstChild.style.cssText = l);
                            }
                            return t;
                          })(t.icon)
                        : t.label
                        ? f.default("div", null, g(e, t.label))
                        : null;
                    if (!n)
                      throw new RangeError(
                        "MenuItem without icon or label property"
                      );
                    if (t.title) {
                      var r =
                        "function" == typeof t.title
                          ? t.title(e.state)
                          : t.title;
                      n.setAttribute("title", g(e, r));
                    }
                    var elementodiv;
                    return (
                      //t = al objeto que se le dio clic
                      //e= elemento padre
                      //r= evento del clic
                      //n= el elemento del div

                      t.class && n.classList.add(t.class),
                      t.css && (n.style.cssText += t.css),
                      n.addEventListener("mouseup", function (r) {
                        // console.log(n, r, e);
                        // r.preventDefault(),
                          //  console.log (n.title);
                          //  console.log("aqui pasa",r,n);
                          (oculto.value = n.title);
                        // console.log(e.state, e.dispatch,n,r);
                        // console.log(t);
                        // if(!(e.state.storedMarks === null))
                        //   e.state.storedMarks.pop();
                        // console.log(e.state.storedMarks);
                        // n.classList.contains(m + "-disabled") ||
                        t.run(e.state, e.dispatch, n, r); //aqui setea el cambio de tamaño de fuente
                        // console.log(n.title);
                        //  console.log(n);
                        // console.log(e.state, e.dispatch, e, r);
                        dveditor.focus();
                      }),
                      {
                        // aqui pasa primero antes del return de la linea 8791
                        dom: n, //aqui solo aplica el css no funcionalidad
                        update: function (e) {
                          if (t.select) {
                            
                            // var r = t.select(e);
                            //  console.log(r);
                            // // // console.log(n.style.display);
                            // if (((n.style.display = r ? "" : "none"), !r)) {
                            //   return !0;
                            // }
                          }
                          var o = !0; //true
                          if (
                            (t.enable &&
                              ((o = t.enable(e) || !1), R(n, "", !o)),
                            t.active)
                          ) {
                            
                            //enviamos el parametro "" en la funcion R para que limpie todas las clases de los div
                            // console.log("entro al primer if del update");
                            var i = (o && t.active(e)) || !1;
                            if (oculto.value === n.title) {
                              // console.log("entro al primer bloque del if", n, oculto.value);
                              R(n, m + "-active", 1); // mandamos 1 ya que queremos que se active
                              // console.log(n,m,i);
                            }
                            // else {
                            //    console.log(n,m,i);
                            //     console.log("viene del else del update");
                            // // //   R(n, "", !o);
                            //   }
                            // } else {
                            //   console.log("no se cumplio");
                          }
                          return !0;
                        },
                      }
                    );
                  },
                },
              ]),
              e
            );
          })();
        function g(e, t) {
          return e._props.translate ? e._props.translate(t) : t;
        }
        var y = { time: 0, node: null };
        function k(e) {
          (y.time = Date.now()), (y.node = e.target);
        }
        function w(e) {
          // console.log("entro al w",e,"Y",y.node);
           return Date.now() - 100 < y.time && y.node && e.contains(y.node);
        }
        var b = (function () {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            r(this, e),
              (this.options = n),
              (this.options = n || {}),
              (this.content = Array.isArray(t) ? t : [t]);
          }
          return (
            i(e, [
              {
                key: "render",
                value: function (e) {
                  var iddiv;
                  switch (this.options.title) {
                    case "Tamaño de fuente":
                      iddiv = "TMFuente";
                      break;
                    case "Tipo de fuente":
                      iddiv = "TFuente";
                      break;
                    case "Listas numeradas":
                      iddiv = "Lnum";
                      break;
                    case "Viñetas":
                      iddiv = "Vs";
                      break;
                    default:
                      "cmbdiv";
                  }
                  var t = this,
                    n = S(this.content, e),
                    r = f.default(
                      "div",
                      {
                        id: iddiv,
                        class: m + "-dropdown " + (this.options.class || ""),
                        style: this.options.css,
                      },
                      g(e, this.options.label || "")
                    );

                  this.options.title &&
                    r.setAttribute("title", g(e, this.options.title));
                  var o = f.default("div", { class: m + "-dropdown-wrap" }, r),
                    i = null,
                    s = null,
                    a = function () {
                      i &&
                        i.close() &&
                        ((i = null), window.removeEventListener("mouseup", s));
                    };
                  return (
                    r.addEventListener("mouseup", function (e) {
                      selcmb.value = r.id;
                      // console.log("e",e,"t",t,"s",s)
                      e.preventDefault(),
                        k(e),
                        i
                          ? a()
                          : ((i = t.expand(o, n.dom)),
                            window.addEventListener(
                              "mouseup",
                              (s = function (e) {  
                                // console.log("aqui",e.target.id,"oculto");  validamos el id para que no se oculte el div de items cuando se le de clic
                                if (!(e.target.id === dvoculto.value))                              
                                w(o) || a();
                                dveditor.focus();
                              })
                            ));
                    }),
                    {
                      dom: o,
                      update: function (e) {
                        // console.log(o);
                        var t = n.update(e);
                        return (o.style.display = t ? "" : "none"), t;
                      },
                    }
                  );
                },
              },
              {
                key: "expand",
                value: function (e, t) {
                  var n = f.default(
                      "div",
                      {
                        id: "dvdrpmenu",
                        class:
                          m + "-dropdown-menu " + (this.options.class || ""),
                      },
                      t
                    ),
                    r = !1;
                    dvoculto.value = "dvdrpmenu";
                    dveditor = document.getElementById("dvEditor");                    
                  return (
                    e.appendChild(n),
                    {
                      close: function () {
                        if (!r) return (r = !0), e.removeChild(n), !0;
                      },
                      node: n,
                    }
                  );
                },
              },
            ]),
            e
          );
        })();
        function S(e, t) {
          for (var n = [], r = [], o = 0; o < e.length; o++) {
            var i = e[o].render(t),
              s = i.dom,
              a = i.update;
            n.push(
              f.default(
                "div",
                { class: m + "-dropdown-item", id: s.title.substring(0, 5) },
                s
              )
            ),
              r.push(a);
          }
          return { dom: n, update: x(r, n) };
        }
        function x(e, t) {
          return function (n) {
            for (var r = !1, o = 0; o < e.length; o++) {
              var i = e[o](n);
              (t[o].style.display = i ? "" : "none"), i && (r = !0);
            }
            return r;
          };
        }
        var M = (function () {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            r(this, e),
              (this.options = n),
              (this.content = Array.isArray(t) ? t : [t]);
          }
          return (
            i(e, [
              {
                key: "render",
                value: function (e) {
                  var t = S(this.content, e),
                    n = f.default(
                      "div",
                      { class: m + "-submenu-label" },
                      g(e, this.options.label || "")
                    ),
                    r = f.default(
                      "div",
                      { class: m + "-submenu-wrap" },
                      n,
                      f.default("div", { class: m + "-submenu" }, t.dom)
                    ),
                    o = null;
                  return (
                    n.addEventListener("mousedown", function (e) {
                      e.preventDefault(),
                        k(e),
                        R(r, m + "-submenu-wrap-active", !1),
                        o ||
                          window.addEventListener(
                            "mousedown",
                            (o = function () {
                              w(r) ||
                                (r.classList.remove(m + "-submenu-wrap-active"),
                                window.removeEventListener("mousedown", o),
                                (o = null));
                            })
                          );
                    }),
                    {
                      dom: r,
                      update: function (e) {
                        var n = t.update(e);
                        return (r.style.display = n ? "" : "none"), n;
                      },
                    }
                  );
                },
              },
            ]),
            e
          );
        })();
        function O(e, t) {
          for (
            var n = document.createDocumentFragment(), r = [], o = [], i = 0;
            i < t.length;
            i++
          ) {
            for (var s = t[i], a = [], l = [], c = 0; c < s.length; c++) {
              var u = s[c].render(e),
                h = u.dom,
                d = u.update,
                p = f.default("span", { class: m + "item" }, h);
              n.appendChild(p), l.push(p), a.push(d);
            }
            a.length &&
              (r.push(x(a, l)),
              i < t.length - 1 &&
                o.push(
                  n.appendChild(f.default("span", { class: m + "separator" }))
                ));
          }
          return {
            dom: n,
            update: function (e) {
              for (var t = !1, n = !1, i = 0; i < r.length; i++) {
                var s = r[i](e);
                i && (o[i - 1].style.display = n && s ? "" : "none"),
                  (n = s),
                  s && (t = !0);
              }
              return t;
            },
          };
        }
        var C = {
            join: {
              width: 800,
              height: 900,
              path: "M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z",
            },
            lift: {
              width: 1024,
              height: 1024,
              path: "M219 310v329q0 7-5 12t-12 5q-8 0-13-5l-164-164q-5-5-5-13t5-13l164-164q5-5 13-5 7 0 12 5t5 12zM1024 749v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12zM1024 530v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 310v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 91v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12z",
            },
            selectParentNode: { text: "⬚", css: "font-weight: bold" },
            undo: {
              width: 1024,
              height: 1024,
              path: "M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z",
            },
            redo: {
              width: 1024,
              height: 1024,
              path: "M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z",
            },
            strong: {
              width: 805,
              height: 1024,
              path: "M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z",
            },
            em: {
              width: 585,
              height: 1024,
              path: "M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z",
            },
            code: {
              width: 896,
              height: 1024,
              path: "M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z",
            },
            link: {
              width: 951,
              height: 1024,
              path: "M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z",
            },
            bulletList: {
              width: 768,
              height: 896,
              path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z",
            },
            orderedList: {
              width: 768,
              height: 896,
              path: "M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z",
            },
            blockquote: {
              width: 640,
              height: 896,
              path: "M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z",
            },
          },
          N = new v({
            title: "Join with above block",
            run: c.joinUp,
            select: function (e) {
              return c.joinUp(e);
            },
            icon: C.join,
          }),
          T = new v({
            title: "Lift out of enclosing block",
            run: c.lift,
            select: function (e) {
              return c.lift(e);
            },
            icon: C.lift,
          }),
          D = new v({
            title: "Select parent node",
            run: c.selectParentNode,
            select: function (e) {
              return c.selectParentNode(e);
            },
            icon: C.selectParentNode,
          }),
          E = new v({
            title: "Undo last change",
            run: u.undo,
            enable: function (e) {
              return u.undo(e);
            },
            icon: C.undo,
          }),
          A = new v({
            title: "Redo last undone change",
            run: u.redo,
            enable: function (e) {
              return u.redo(e);
            },
            icon: C.redo,
          });
        function R(e, t, n) {
          //e es el objeto que se le dio clic, t es el nombre de la clase, n es booleano
          // console.log(e);
          // console.log(t);
          // console.log(n);
          // console.log(t);
          // console.log(oculto.value);
          // console.log(e.title);
          // console.log(e.classList.length);
          // console.log("antes del if");
          if (
            t === "" &&
            oculto.value != e.title &&
            e.classList.length > 0 &&
            e.title != "Negrita" &&
            e.title != "Cursiva"
          ) {
            //removemos  la lista activa cuando se cambie de opcion
            //  console.log("entro al if");
            // console.log(oculto.value);
            //  console.log(e.classList);
            // if(oculto.value === "Negrita" || oculto.value === "Cursiva")
            //   // console.log(e);
            //   //e.classList.remove("ProseMirror-icon ProseMirror-menu-active");
            // else

            e.classList.remove("ProseMirror-menu-active");
          } else if (t.length > 0) {
            if (
              (e.title === "Negrita" && t.length > 0) ||
              (e.title === "Cursiva" && t.length > 0)
            ) {
              //  console.log("entro en el else", oculto.value, e, t, t.length, n);
              // e.classList.remove("");
              // e.classList.remove("ProseMirror-icon ProseMirror-menu-active");
              const claseAEliminar = Array.from(e.classList).find((clase) =>
                clase.startsWith("ProseMirror-menu-active")
              );
              // console.log(claseAEliminar)
              claseAEliminar != "ProseMirror-menu-active"
                ? e.classList.add(t)
                : e.classList.remove("ProseMirror-menu-active");
              // console.log("despues en el else", e.className, t, t.length, n);
            }
            //se asigna la clase "ProseMirror-menu-active" al objeto
            else n ? e.classList.add(t) : e.classList.remove(t);
          }
          // console.log("despues del if");
          //   console.log(e);
          // console.log(t);
          // console.log(n);
          //   console.log("salio");
        }
        var P = "ProseMirror-menubar",
          I = (function () {
            function e(t, n) {
              var o = this;
              r(this, e),
                (this.editorView = t),
                (this.options = n),
                (this.spacer = null),
                (this.maxHeight = 0),
                (this.widthForMaxHeight = 0),
                (this.floating = !1),
                (this.scrollHandler = null),
                (this.wrapper = f.default("div", { class: P + "-wrapper" })),
                (this.menu = this.wrapper.appendChild(
                  f.default("div", { class: P, id: "idmenu" })
                )),
                (this.menu.className = P),
                t.dom.parentNode &&
                  t.dom.parentNode.replaceChild(this.wrapper, t.dom),
                this.wrapper.appendChild(t.dom);
              // this.wrapper.childNodes[1].childNodes[0].id = "pid";
              //  console.log(this.wrapper.childNodes[1].childNodes[0].id);
              var i = O(this.editorView, this.options.content),
                s = i.dom,
                a = i.update;
              if (
                ((this.contentUpdate = a),
                this.menu.appendChild(s),
                this.update(),
                n.floating &&
                  !(function () {
                    if ("undefined" == typeof navigator) return !1;
                    var e = navigator.userAgent;
                    return (
                      !/Edge\/\d/.test(e) &&
                      /AppleWebKit/.test(e) &&
                      /Mobile\/\w+/.test(e)
                    );
                  })())
              ) {
                this.updateFloat();
                var l = (function (e) {
                  for (var t = [window], n = e.parentNode; n; n = n.parentNode)
                    t.push(n);
                  return t;
                })(this.wrapper);
                (this.scrollHandler = function (e) {
                  var t = o.editorView.root;
                  (t.body || t).contains(o.wrapper)
                    ? o.updateFloat(
                        e.target.getBoundingClientRect ? e.target : void 0
                      )
                    : l.forEach(function (e) {
                        return e.removeEventListener("scroll", o.scrollHandler);
                      });
                }),
                  l.forEach(function (e) {
                    return e.addEventListener("scroll", o.scrollHandler);
                  });
              }
            }
            return (
              i(e, [
                {
                  key: "update",
                  value: function () {
                    this.contentUpdate(this.editorView.state),
                      this.floating
                        ? this.updateScrollCursor()
                        : (this.menu.offsetWidth != this.widthForMaxHeight &&
                            ((this.widthForMaxHeight = this.menu.offsetWidth),
                            (this.maxHeight = 0)),
                          this.menu.offsetHeight > this.maxHeight &&
                            ((this.maxHeight = this.menu.offsetHeight),
                            (this.menu.style.minHeight =
                              this.maxHeight + "px")));
                  },
                },
                {
                  key: "updateScrollCursor",
                  value: function () {
                    var e = this.editorView.root.getSelection();
                    if (e.focusNode) {
                      var t = e.getRangeAt(0).getClientRects(),
                        n =
                          t[
                            (function (e) {
                              return e.anchorNode == e.focusNode
                                ? e.anchorOffset > e.focusOffset
                                : e.anchorNode.compareDocumentPosition(
                                    e.focusNode
                                  ) == Node.DOCUMENT_POSITION_FOLLOWING;
                            })(e)
                              ? 0
                              : t.length - 1
                          ];
                      if (n) {
                        var r = this.menu.getBoundingClientRect();
                        if (n.top < r.bottom && n.bottom > r.top) {
                          var o = (function (e) {
                            for (var t = e.parentNode; t; t = t.parentNode)
                              if (t.scrollHeight > t.clientHeight) return t;
                          })(this.wrapper);
                          o && (o.scrollTop -= r.bottom - n.top);
                        }
                      }
                    }
                  },
                },
                {
                  key: "updateFloat",
                  value: function (e) {
                    var t = this.wrapper,
                      n = t.getBoundingClientRect(),
                      r = e ? Math.max(0, e.getBoundingClientRect().top) : 0;
                    if (this.floating)
                      if (n.top >= r || n.bottom < this.menu.offsetHeight + 10)
                        (this.floating = !1),
                          (this.menu.style.position =
                            this.menu.style.left =
                            this.menu.style.top =
                            this.menu.style.width =
                              ""),
                          (this.menu.style.display = ""),
                          this.spacer.parentNode.removeChild(this.spacer),
                          (this.spacer = null);
                      else {
                        var o = (t.offsetWidth - t.clientWidth) / 2;
                        (this.menu.style.left = n.left + o + "px"),
                          (this.menu.style.display =
                            n.top > window.innerHeight ? "none" : ""),
                          e && (this.menu.style.top = r + "px");
                      }
                    else if (
                      n.top < r &&
                      n.bottom >= this.menu.offsetHeight + 10
                    ) {
                      this.floating = !0;
                      var i = this.menu.getBoundingClientRect();
                      (this.menu.style.left = i.left + "px"),
                        (this.menu.style.width = i.width + "px"),
                        e && (this.menu.style.top = r + "px"),
                        (this.menu.style.position = "fixed"),
                        (this.spacer = f.default("div", {
                          class: P + "-spacer",
                          style: "height: ".concat(i.height, "px"),
                        })),
                        t.insertBefore(this.spacer, this.menu);
                    }
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    this.wrapper.parentNode &&
                      this.wrapper.parentNode.replaceChild(
                        this.editorView.dom,
                        this.wrapper
                      );
                  },
                },
              ]),
              e
            );
          })();
        (t.Dropdown = b),
          (t.DropdownSubmenu = M),
          (t.MenuItem = v),
          (t.blockTypeItem = function (e, t) {
            var n = c.setBlockType(e, t.attrs),
              r = {
                run: n,
                enable: function (e) {
                  return n(e);
                },
                active: function (n) {
                  var r = n.selection,
                    o = r.$from,
                    i = r.to,
                    s = r.node;
                  return s
                    ? s.hasMarkup(e, t.attrs)
                    : i <= o.end() && o.parent.hasMarkup(e, t.attrs);
                },
              };
            for (var o in t) r[o] = t[o];
            return new v(r);
          }),
          (t.icons = C),
          (t.joinUpItem = N),
          (t.liftItem = T),
          (t.menuBar = function (e) {
            return new h.Plugin({
              view: function (t) {
                return new I(t, e);
              },
            });
          }),
          (t.redoItem = A),
          (t.renderGrouped = O),
          (t.selectParentNodeItem = D),
          (t.undoItem = E),
          (t.wrapItem = function (e, t) {
            var n = {
              run: function (n, r) {
                return c.wrapIn(e, t.attrs)(n, r);
              },
              select: function (n) {
                return c.wrapIn(e, t.attrs)(n);
              },
            };
            for (var r in t) n[r] = t[r];
            return new v(n);
          });
      },
      443: (e, t, n) => {
        function r(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        function o() {
          return (
            (o =
              "undefined" != typeof Reflect && Reflect.get
                ? Reflect.get
                : function (e, t, n) {
                    var r = i(e, t);
                    if (r) {
                      var o = Object.getOwnPropertyDescriptor(r, t);
                      return o.get
                        ? o.get.call(arguments.length < 3 ? e : n)
                        : o.value;
                    }
                  }),
            o.apply(this, arguments)
          );
        }
        function i(e, t) {
          for (
            ;
            !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = d(e));

          );
          return e;
        }
        function s(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            t && f(e, t);
        }
        function a(e) {
          var t = h();
          return function () {
            var n,
              r = d(e);
            if (t) {
              var o = d(this).constructor;
              n = Reflect.construct(r, arguments, o);
            } else n = r.apply(this, arguments);
            return l(this, n);
          };
        }
        function l(e, t) {
          if (t && ("object" === g(t) || "function" == typeof t)) return t;
          if (void 0 !== t)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return (function (e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return e;
          })(e);
        }
        function c(e) {
          var t = "function" == typeof Map ? new Map() : void 0;
          return (
            (c = function (e) {
              if (
                null === e ||
                ((n = e),
                -1 === Function.toString.call(n).indexOf("[native code]"))
              )
                return e;
              var n;
              if ("function" != typeof e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, r);
              }
              function r() {
                return u(e, arguments, d(this).constructor);
              }
              return (
                (r.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: r,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                f(r, e)
              );
            }),
            c(e)
          );
        }
        function u(e, t, n) {
          return (
            (u = h()
              ? Reflect.construct
              : function (e, t, n) {
                  var r = [null];
                  r.push.apply(r, t);
                  var o = new (Function.bind.apply(e, r))();
                  return n && f(o, n.prototype), o;
                }),
            u.apply(null, arguments)
          );
        }
        function h() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        }
        function f(e, t) {
          return (
            (f =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e;
              }),
            f(e, t)
          );
        }
        function d(e) {
          return (
            (d = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            d(e)
          );
        }
        function p(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function m(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function v(e, t, n) {
          return (
            t && m(e.prototype, t),
            n && m(e, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
        }
        function g(e) {
          return (
            (g =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            g(e)
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var y,
          k =
            (y = n(586)) && "object" === g(y) && "default" in y
              ? y
              : { default: y };
        function w(e, t, n) {
          for (var r = 0; ; r++) {
            if (r == e.childCount || r == t.childCount)
              return e.childCount == t.childCount ? null : n;
            var o = e.child(r),
              i = t.child(r);
            if (o != i) {
              if (!o.sameMarkup(i)) return n;
              if (o.isText && o.text != i.text) {
                for (var s = 0; o.text[s] == i.text[s]; s++) n++;
                return n;
              }
              if (o.content.size || i.content.size) {
                var a = w(o.content, i.content, n + 1);
                if (null != a) return a;
              }
              n += o.nodeSize;
            } else n += o.nodeSize;
          }
        }
        function b(e, t, n, r) {
          for (var o = e.childCount, i = t.childCount; ; ) {
            if (0 == o || 0 == i) return o == i ? null : { a: n, b: r };
            var s = e.child(--o),
              a = t.child(--i),
              l = s.nodeSize;
            if (s != a) {
              if (!s.sameMarkup(a)) return { a: n, b: r };
              if (s.isText && s.text != a.text) {
                for (
                  var c = 0, u = Math.min(s.text.length, a.text.length);
                  c < u &&
                  s.text[s.text.length - c - 1] ==
                    a.text[a.text.length - c - 1];

                )
                  c++, n--, r--;
                return { a: n, b: r };
              }
              if (s.content.size || a.content.size) {
                var h = b(s.content, a.content, n - 1, r - 1);
                if (h) return h;
              }
              (n -= l), (r -= l);
            } else (n -= l), (r -= l);
          }
        }
        var S = (function () {
          function e(t, n) {
            if (
              (p(this, e), (this.content = t), (this.size = n || 0), null == n)
            )
              for (var r = 0; r < t.length; r++) this.size += t[r].nodeSize;
          }
          return (
            v(
              e,
              [
                {
                  key: "nodesBetween",
                  value: function (e, t, n) {
                    for (
                      var r =
                          arguments.length > 3 && void 0 !== arguments[3]
                            ? arguments[3]
                            : 0,
                        o = arguments.length > 4 ? arguments[4] : void 0,
                        i = 0,
                        s = 0;
                      s < t;
                      i++
                    ) {
                      var a = this.content[i],
                        l = s + a.nodeSize;
                      if (
                        l > e &&
                        !1 !== n(a, r + s, o || null, i) &&
                        a.content.size
                      ) {
                        var c = s + 1;
                        a.nodesBetween(
                          Math.max(0, e - c),
                          Math.min(a.content.size, t - c),
                          n,
                          r + c
                        );
                      }
                      s = l;
                    }
                  },
                },
                {
                  key: "descendants",
                  value: function (e) {
                    this.nodesBetween(0, this.size, e);
                  },
                },
                {
                  key: "textBetween",
                  value: function (e, t, n, r) {
                    var o = "",
                      i = !0;
                    return (
                      this.nodesBetween(
                        e,
                        t,
                        function (s, a) {
                          s.isText
                            ? ((o += s.text.slice(Math.max(e, a) - a, t - a)),
                              (i = !n))
                            : s.isLeaf
                            ? (r
                                ? (o += "function" == typeof r ? r(s) : r)
                                : s.type.spec.leafText &&
                                  (o += s.type.spec.leafText(s)),
                              (i = !n))
                            : !i && s.isBlock && ((o += n), (i = !0));
                        },
                        0
                      ),
                      o
                    );
                  },
                },
                {
                  key: "append",
                  value: function (t) {
                    if (!t.size) return this;
                    if (!this.size) return t;
                    var n = this.lastChild,
                      r = t.firstChild,
                      o = this.content.slice(),
                      i = 0;
                    for (
                      n.isText &&
                      n.sameMarkup(r) &&
                      ((o[o.length - 1] = n.withText(n.text + r.text)),
                      (i = 1));
                      i < t.content.length;
                      i++
                    )
                      o.push(t.content[i]);
                    return new e(o, this.size + t.size);
                  },
                },
                {
                  key: "cut",
                  value: function (t) {
                    var n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : this.size;
                    if (0 == t && n == this.size) return this;
                    var r = [],
                      o = 0;
                    if (n > t)
                      for (var i = 0, s = 0; s < n; i++) {
                        var a = this.content[i],
                          l = s + a.nodeSize;
                        l > t &&
                          ((s < t || l > n) &&
                            (a = a.isText
                              ? a.cut(
                                  Math.max(0, t - s),
                                  Math.min(a.text.length, n - s)
                                )
                              : a.cut(
                                  Math.max(0, t - s - 1),
                                  Math.min(a.content.size, n - s - 1)
                                )),
                          r.push(a),
                          (o += a.nodeSize)),
                          (s = l);
                      }
                    return new e(r, o);
                  },
                },
                {
                  key: "cutByIndex",
                  value: function (t, n) {
                    return t == n
                      ? e.empty
                      : 0 == t && n == this.content.length
                      ? this
                      : new e(this.content.slice(t, n));
                  },
                },
                {
                  key: "replaceChild",
                  value: function (t, n) {
                    var r = this.content[t];
                    if (r == n) return this;
                    var o = this.content.slice(),
                      i = this.size + n.nodeSize - r.nodeSize;
                    return (o[t] = n), new e(o, i);
                  },
                },
                {
                  key: "addToStart",
                  value: function (t) {
                    return new e(
                      [t].concat(this.content),
                      this.size + t.nodeSize
                    );
                  },
                },
                {
                  key: "addToEnd",
                  value: function (t) {
                    return new e(
                      this.content.concat(t),
                      this.size + t.nodeSize
                    );
                  },
                },
                {
                  key: "eq",
                  value: function (e) {
                    if (this.content.length != e.content.length) return !1;
                    for (var t = 0; t < this.content.length; t++)
                      if (!this.content[t].eq(e.content[t])) return !1;
                    return !0;
                  },
                },
                {
                  key: "firstChild",
                  get: function () {
                    return this.content.length ? this.content[0] : null;
                  },
                },
                {
                  key: "lastChild",
                  get: function () {
                    return this.content.length
                      ? this.content[this.content.length - 1]
                      : null;
                  },
                },
                {
                  key: "childCount",
                  get: function () {
                    return this.content.length;
                  },
                },
                {
                  key: "child",
                  value: function (e) {
                    var t = this.content[e];
                    if (!t)
                      throw new RangeError(
                        "Index " + e + " out of range for " + this
                      );
                    return t;
                  },
                },
                {
                  key: "maybeChild",
                  value: function (e) {
                    return this.content[e] || null;
                  },
                },
                {
                  key: "forEach",
                  value: function (e) {
                    for (var t = 0, n = 0; t < this.content.length; t++) {
                      var r = this.content[t];
                      e(r, n, t), (n += r.nodeSize);
                    }
                  },
                },
                {
                  key: "findDiffStart",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 0;
                    return w(this, e, t);
                  },
                },
                {
                  key: "findDiffEnd",
                  value: function (e) {
                    var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : this.size,
                      n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : e.size;
                    return b(this, e, t, n);
                  },
                },
                {
                  key: "findIndex",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : -1;
                    if (0 == e) return M(0, e);
                    if (e == this.size) return M(this.content.length, e);
                    if (e > this.size || e < 0)
                      throw new RangeError(
                        "Position "
                          .concat(e, " outside of fragment (")
                          .concat(this, ")")
                      );
                    for (var n = 0, r = 0; ; n++) {
                      var o = this.child(n),
                        i = r + o.nodeSize;
                      if (i >= e)
                        return i == e || t > 0 ? M(n + 1, i) : M(n, r);
                      r = i;
                    }
                  },
                },
                {
                  key: "toString",
                  value: function () {
                    return "<" + this.toStringInner() + ">";
                  },
                },
                {
                  key: "toStringInner",
                  value: function () {
                    return this.content.join(", ");
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    return this.content.length
                      ? this.content.map(function (e) {
                          return e.toJSON();
                        })
                      : null;
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (t, n) {
                    if (!n) return e.empty;
                    if (!Array.isArray(n))
                      throw new RangeError(
                        "Invalid input for Fragment.fromJSON"
                      );
                    return new e(n.map(t.nodeFromJSON));
                  },
                },
                {
                  key: "fromArray",
                  value: function (t) {
                    if (!t.length) return e.empty;
                    for (var n, r = 0, o = 0; o < t.length; o++) {
                      var i = t[o];
                      (r += i.nodeSize),
                        o && i.isText && t[o - 1].sameMarkup(i)
                          ? (n || (n = t.slice(0, o)),
                            (n[n.length - 1] = i.withText(
                              n[n.length - 1].text + i.text
                            )))
                          : n && n.push(i);
                    }
                    return new e(n || t, r);
                  },
                },
                {
                  key: "from",
                  value: function (t) {
                    if (!t) return e.empty;
                    if (t instanceof e) return t;
                    if (Array.isArray(t)) return this.fromArray(t);
                    if (t.attrs) return new e([t], t.nodeSize);
                    throw new RangeError(
                      "Can not convert " +
                        t +
                        " to a Fragment" +
                        (t.nodesBetween
                          ? " (looks like multiple versions of prosemirror-model were loaded)"
                          : "")
                    );
                  },
                },
              ]
            ),
            e
          );
        })();
        S.empty = new S([], 0);
        var x = { index: 0, offset: 0 };
        function M(e, t) {
          return (x.index = e), (x.offset = t), x;
        }
        function O(e, t) {
          if (e === t) return !0;
          if (!e || "object" != g(e) || !t || "object" != g(t)) return !1;
          var n = Array.isArray(e);
          if (Array.isArray(t) != n) return !1;
          if (n) {
            if (e.length != t.length) return !1;
            for (var r = 0; r < e.length; r++) if (!O(e[r], t[r])) return !1;
          } else {
            for (var o in e) if (!(o in t) || !O(e[o], t[o])) return !1;
            for (var i in t) if (!(i in e)) return !1;
          }
          return !0;
        }
        var C = (function () {
          function e(t, n) {
            p(this, e), (this.type = t), (this.attrs = n);
          }
          return (
            v(
              e,
              [
                {
                  key: "addToSet",
                  value: function (e) {
                    for (var t, n = !1, r = 0; r < e.length; r++) {
                      var o = e[r];
                      if (this.eq(o)) return e;
                      if (this.type.excludes(o.type)) t || (t = e.slice(0, r));
                      else {
                        if (o.type.excludes(this.type)) return e;
                        !n &&
                          o.type.rank > this.type.rank &&
                          (t || (t = e.slice(0, r)), t.push(this), (n = !0)),
                          t && t.push(o);
                      }
                    }
                    return t || (t = e.slice()), n || t.push(this), t;
                  },
                },
                {
                  key: "removeFromSet",
                  value: function (e) {
                    for (var t = 0; t < e.length; t++)
                      if (this.eq(e[t]))
                        return e.slice(0, t).concat(e.slice(t + 1));
                    return e;
                  },
                },
                {
                  key: "isInSet",
                  value: function (e) {
                    for (var t = 0; t < e.length; t++)
                      if (this.eq(e[t])) return !0;
                    return !1;
                  },
                },
                {
                  key: "eq",
                  value: function (e) {
                    return (
                      this == e ||
                      (this.type == e.type && O(this.attrs, e.attrs))
                    );
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    var e = { type: this.type.name };
                    for (var t in this.attrs) {
                      e.attrs = this.attrs;
                      break;
                    }
                    return e;
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (e, t) {
                    if (!t)
                      throw new RangeError("Invalid input for Mark.fromJSON");
                    var n = e.marks[t.type];
                    if (!n)
                      throw new RangeError(
                        "There is no mark type ".concat(
                          t.type,
                          " in this schema"
                        )
                      );
                    return n.create(t.attrs);
                  },
                },
                {
                  key: "sameSet",
                  value: function (e, t) {
                    if (e == t) return !0;
                    if (e.length != t.length) return !1;
                    for (var n = 0; n < e.length; n++)
                      if (!e[n].eq(t[n])) return !1;
                    return !0;
                  },
                },
                {
                  key: "setFrom",
                  value: function (t) {
                    if (!t || (Array.isArray(t) && 0 == t.length))
                      return e.none;
                    if (t instanceof e) return [t];
                    var n = t.slice();
                    return (
                      n.sort(function (e, t) {
                        return e.type.rank - t.type.rank;
                      }),
                      n
                    );
                  },
                },
              ]
            ),
            e
          );
        })();
        C.none = [];
        var N = (function (e) {
            s(n, e);
            var t = a(n);
            function n() {
              return p(this, n), t.apply(this, arguments);
            }
            return v(n);
          })(c(Error)),
          T = (function () {
            function e(t, n, r) {
              p(this, e),
                (this.content = t),
                (this.openStart = n),
                (this.openEnd = r);
            }
            return (
              v(
                e,
                [
                  {
                    key: "size",
                    get: function () {
                      return this.content.size - this.openStart - this.openEnd;
                    },
                  },
                  {
                    key: "insertAt",
                    value: function (t, n) {
                      var r = E(this.content, t + this.openStart, n);
                      return r && new e(r, this.openStart, this.openEnd);
                    },
                  },
                  {
                    key: "removeBetween",
                    value: function (t, n) {
                      return new e(
                        D(this.content, t + this.openStart, n + this.openStart),
                        this.openStart,
                        this.openEnd
                      );
                    },
                  },
                  {
                    key: "eq",
                    value: function (e) {
                      return (
                        this.content.eq(e.content) &&
                        this.openStart == e.openStart &&
                        this.openEnd == e.openEnd
                      );
                    },
                  },
                  {
                    key: "toString",
                    value: function () {
                      return (
                        this.content +
                        "(" +
                        this.openStart +
                        "," +
                        this.openEnd +
                        ")"
                      );
                    },
                  },
                  {
                    key: "toJSON",
                    value: function () {
                      if (!this.content.size) return null;
                      var e = { content: this.content.toJSON() };
                      return (
                        this.openStart > 0 && (e.openStart = this.openStart),
                        this.openEnd > 0 && (e.openEnd = this.openEnd),
                        e
                      );
                    },
                  },
                ],
                [
                  {
                    key: "fromJSON",
                    value: function (t, n) {
                      if (!n) return e.empty;
                      var r = n.openStart || 0,
                        o = n.openEnd || 0;
                      if ("number" != typeof r || "number" != typeof o)
                        throw new RangeError(
                          "Invalid input for Slice.fromJSON"
                        );
                      return new e(S.fromJSON(t, n.content), r, o);
                    },
                  },
                  {
                    key: "maxOpen",
                    value: function (t) {
                      for (
                        var n =
                            !(
                              arguments.length > 1 && void 0 !== arguments[1]
                            ) || arguments[1],
                          r = 0,
                          o = 0,
                          i = t.firstChild;
                        i && !i.isLeaf && (n || !i.type.spec.isolating);
                        i = i.firstChild
                      )
                        r++;
                      for (
                        var s = t.lastChild;
                        s && !s.isLeaf && (n || !s.type.spec.isolating);
                        s = s.lastChild
                      )
                        o++;
                      return new e(t, r, o);
                    },
                  },
                ]
              ),
              e
            );
          })();
        function D(e, t, n) {
          var r = e.findIndex(t),
            o = r.index,
            i = r.offset,
            s = e.maybeChild(o),
            a = e.findIndex(n),
            l = a.index,
            c = a.offset;
          if (i == t || s.isText) {
            if (c != n && !e.child(l).isText)
              throw new RangeError("Removing non-flat range");
            return e.cut(0, t).append(e.cut(n));
          }
          if (o != l) throw new RangeError("Removing non-flat range");
          return e.replaceChild(o, s.copy(D(s.content, t - i - 1, n - i - 1)));
        }
        function E(e, t, n, r) {
          var o = e.findIndex(t),
            i = o.index,
            s = o.offset,
            a = e.maybeChild(i);
          if (s == t || a.isText)
            return r && !r.canReplace(i, i, n)
              ? null
              : e.cut(0, t).append(n).append(e.cut(t));
          var l = E(a.content, t - s - 1, n);
          return l && e.replaceChild(i, a.copy(l));
        }
        function A(e, t, n) {
          if (n.openStart > e.depth)
            throw new N("Inserted content deeper than insertion position");
          if (e.depth - n.openStart != t.depth - n.openEnd)
            throw new N("Inconsistent open depths");
          return R(e, t, n, 0);
        }
        function R(e, t, n, r) {
          var o = e.index(r),
            i = e.node(r);
          if (o == t.index(r) && r < e.depth - n.openStart) {
            var s = R(e, t, n, r + 1);
            return i.copy(i.content.replaceChild(o, s));
          }
          if (n.content.size) {
            if (n.openStart || n.openEnd || e.depth != r || t.depth != r) {
              var a = (function (e, t) {
                for (
                  var n = t.depth - e.openStart,
                    r = t.node(n).copy(e.content),
                    o = n - 1;
                  o >= 0;
                  o--
                )
                  r = t.node(o).copy(S.from(r));
                return {
                  start: r.resolveNoCache(e.openStart + n),
                  end: r.resolveNoCache(r.content.size - e.openEnd - n),
                };
              })(n, e);
              return B(i, $(e, a.start, a.end, t, r));
            }
            var l = e.parent,
              c = l.content;
            return B(
              l,
              c
                .cut(0, e.parentOffset)
                .append(n.content)
                .append(c.cut(t.parentOffset))
            );
          }
          return B(i, V(e, t, r));
        }
        function P(e, t) {
          if (!t.type.compatibleContent(e.type))
            throw new N("Cannot join " + t.type.name + " onto " + e.type.name);
        }
        function I(e, t, n) {
          var r = e.node(n);
          return P(r, t.node(n)), r;
        }
        function z(e, t) {
          var n = t.length - 1;
          n >= 0 && e.isText && e.sameMarkup(t[n])
            ? (t[n] = e.withText(t[n].text + e.text))
            : t.push(e);
        }
        function F(e, t, n, r) {
          var o = (t || e).node(n),
            i = 0,
            s = t ? t.index(n) : o.childCount;
          e &&
            ((i = e.index(n)),
            e.depth > n ? i++ : e.textOffset && (z(e.nodeAfter, r), i++));
          for (var a = i; a < s; a++) z(o.child(a), r);
          t && t.depth == n && t.textOffset && z(t.nodeBefore, r);
        }
        function B(e, t) {
          return e.type.checkContent(t), e.copy(t);
        }
        function $(e, t, n, r, o) {
          var i = e.depth > o && I(e, t, o + 1),
            s = r.depth > o && I(n, r, o + 1),
            a = [];
          return (
            F(null, e, o, a),
            i && s && t.index(o) == n.index(o)
              ? (P(i, s), z(B(i, $(e, t, n, r, o + 1)), a))
              : (i && z(B(i, V(e, t, o + 1)), a),
                F(t, n, o, a),
                s && z(B(s, V(n, r, o + 1)), a)),
            F(r, null, o, a),
            new S(a)
          );
        }
        function V(e, t, n) {
          var r = [];
          return (
            F(null, e, n, r),
            e.depth > n && z(B(I(e, t, n + 1), V(e, t, n + 1)), r),
            F(t, null, n, r),
            new S(r)
          );
        }
        T.empty = new T(S.empty, 0, 0);
        var j = (function () {
            function e(t, n, r) {
              p(this, e),
                (this.pos = t),
                (this.path = n),
                (this.parentOffset = r),
                (this.depth = n.length / 3 - 1);
            }
            return (
              v(
                e,
                [
                  {
                    key: "resolveDepth",
                    value: function (e) {
                      return null == e
                        ? this.depth
                        : e < 0
                        ? this.depth + e
                        : e;
                    },
                  },
                  {
                    key: "parent",
                    get: function () {
                      return this.node(this.depth);
                    },
                  },
                  {
                    key: "doc",
                    get: function () {
                      return this.node(0);
                    },
                  },
                  {
                    key: "node",
                    value: function (e) {
                      return this.path[3 * this.resolveDepth(e)];
                    },
                  },
                  {
                    key: "index",
                    value: function (e) {
                      return this.path[3 * this.resolveDepth(e) + 1];
                    },
                  },
                  {
                    key: "indexAfter",
                    value: function (e) {
                      return (
                        (e = this.resolveDepth(e)),
                        this.index(e) +
                          (e != this.depth || this.textOffset ? 1 : 0)
                      );
                    },
                  },
                  {
                    key: "start",
                    value: function (e) {
                      return 0 == (e = this.resolveDepth(e))
                        ? 0
                        : this.path[3 * e - 1] + 1;
                    },
                  },
                  {
                    key: "end",
                    value: function (e) {
                      return (
                        (e = this.resolveDepth(e)),
                        this.start(e) + this.node(e).content.size
                      );
                    },
                  },
                  {
                    key: "before",
                    value: function (e) {
                      if (!(e = this.resolveDepth(e)))
                        throw new RangeError(
                          "There is no position before the top-level node"
                        );
                      return e == this.depth + 1
                        ? this.pos
                        : this.path[3 * e - 1];
                    },
                  },
                  {
                    key: "after",
                    value: function (e) {
                      if (!(e = this.resolveDepth(e)))
                        throw new RangeError(
                          "There is no position after the top-level node"
                        );
                      return e == this.depth + 1
                        ? this.pos
                        : this.path[3 * e - 1] + this.path[3 * e].nodeSize;
                    },
                  },
                  {
                    key: "textOffset",
                    get: function () {
                      return this.pos - this.path[this.path.length - 1];
                    },
                  },
                  {
                    key: "nodeAfter",
                    get: function () {
                      var e = this.parent,
                        t = this.index(this.depth);
                      if (t == e.childCount) return null;
                      var n = this.pos - this.path[this.path.length - 1],
                        r = e.child(t);
                      return n ? e.child(t).cut(n) : r;
                    },
                  },
                  {
                    key: "nodeBefore",
                    get: function () {
                      var e = this.index(this.depth),
                        t = this.pos - this.path[this.path.length - 1];
                      return t
                        ? this.parent.child(e).cut(0, t)
                        : 0 == e
                        ? null
                        : this.parent.child(e - 1);
                    },
                  },
                  {
                    key: "posAtIndex",
                    value: function (e, t) {
                      t = this.resolveDepth(t);
                      for (
                        var n = this.path[3 * t],
                          r = 0 == t ? 0 : this.path[3 * t - 1] + 1,
                          o = 0;
                        o < e;
                        o++
                      )
                        r += n.child(o).nodeSize;
                      return r;
                    },
                  },
                  {
                    key: "marks",
                    value: function () {
                      var e = this.parent,
                        t = this.index();
                      if (0 == e.content.size) return C.none;
                      if (this.textOffset) return e.child(t).marks;
                      var n = e.maybeChild(t - 1),
                        r = e.maybeChild(t);
                      if (!n) {
                        var o = n;
                        (n = r), (r = o);
                      }
                      for (var i = n.marks, s = 0; s < i.length; s++)
                        !1 !== i[s].type.spec.inclusive ||
                          (r && i[s].isInSet(r.marks)) ||
                          (i = i[s--].removeFromSet(i));
                      return i;
                    },
                  },
                  {
                    key: "marksAcross",
                    value: function (e) {
                      var t = this.parent.maybeChild(this.index());
                      if (!t || !t.isInline) return null;
                      for (
                        var n = t.marks,
                          r = e.parent.maybeChild(e.index()),
                          o = 0;
                        o < n.length;
                        o++
                      )
                        !1 !== n[o].type.spec.inclusive ||
                          (r && n[o].isInSet(r.marks)) ||
                          (n = n[o--].removeFromSet(n));
                      return n;
                    },
                  },
                  {
                    key: "sharedDepth",
                    value: function (e) {
                      for (var t = this.depth; t > 0; t--)
                        if (this.start(t) <= e && this.end(t) >= e) return t;
                      return 0;
                    },
                  },
                  {
                    key: "blockRange",
                    value: function () {
                      var e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : this,
                        t = arguments.length > 1 ? arguments[1] : void 0;
                      if (e.pos < this.pos) return e.blockRange(this);
                      for (
                        var n =
                          this.depth -
                          (this.parent.inlineContent || this.pos == e.pos
                            ? 1
                            : 0);
                        n >= 0;
                        n--
                      )
                        if (e.pos <= this.end(n) && (!t || t(this.node(n))))
                          return new _(this, e, n);
                      return null;
                    },
                  },
                  {
                    key: "sameParent",
                    value: function (e) {
                      return (
                        this.pos - this.parentOffset == e.pos - e.parentOffset
                      );
                    },
                  },
                  {
                    key: "max",
                    value: function (e) {
                      return e.pos > this.pos ? e : this;
                    },
                  },
                  {
                    key: "min",
                    value: function (e) {
                      return e.pos < this.pos ? e : this;
                    },
                  },
                  {
                    key: "toString",
                    value: function () {
                      for (var e = "", t = 1; t <= this.depth; t++)
                        e +=
                          (e ? "/" : "") +
                          this.node(t).type.name +
                          "_" +
                          this.index(t - 1);
                      return e + ":" + this.parentOffset;
                    },
                  },
                ],
                [
                  {
                    key: "resolve",
                    value: function (t, n) {
                      if (!(n >= 0 && n <= t.content.size))
                        throw new RangeError("Position " + n + " out of range");
                      for (var r = [], o = 0, i = n, s = t; ; ) {
                        var a = s.content.findIndex(i),
                          l = a.index,
                          c = a.offset,
                          u = i - c;
                        if ((r.push(s, l, o + c), !u)) break;
                        if ((s = s.child(l)).isText) break;
                        (i = u - 1), (o += c + 1);
                      }
                      return new e(n, r, i);
                    },
                  },
                  {
                    key: "resolveCached",
                    value: function (t, n) {
                      for (var r = 0; r < q.length; r++) {
                        var o = q[r];
                        if (o.pos == n && o.doc == t) return o;
                      }
                      var i = (q[L] = e.resolve(t, n));
                      return (L = (L + 1) % J), i;
                    },
                  },
                ]
              ),
              e
            );
          })(),
          q = [],
          L = 0,
          J = 12,
          _ = (function () {
            function e(t, n, r) {
              p(this, e), (this.$from = t), (this.$to = n), (this.depth = r);
            }
            return (
              v(e, [
                {
                  key: "start",
                  get: function () {
                    return this.$from.before(this.depth + 1);
                  },
                },
                {
                  key: "end",
                  get: function () {
                    return this.$to.after(this.depth + 1);
                  },
                },
                {
                  key: "parent",
                  get: function () {
                    return this.$from.node(this.depth);
                  },
                },
                {
                  key: "startIndex",
                  get: function () {
                    return this.$from.index(this.depth);
                  },
                },
                {
                  key: "endIndex",
                  get: function () {
                    return this.$to.indexAfter(this.depth);
                  },
                },
              ]),
              e
            );
          })(),
          W = Object.create(null),
          K = (function () {
            function e(t, n, r) {
              var o =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : C.none;
              p(this, e),
                (this.type = t),
                (this.attrs = n),
                (this.marks = o),
                (this.content = r || S.empty);
            }
            return (
              v(
                e,
                [
                  {
                    key: "nodeSize",
                    get: function () {
                      return this.isLeaf ? 1 : 2 + this.content.size;
                    },
                  },
                  {
                    key: "childCount",
                    get: function () {
                      return this.content.childCount;
                    },
                  },
                  {
                    key: "child",
                    value: function (e) {
                      return this.content.child(e);
                    },
                  },
                  {
                    key: "maybeChild",
                    value: function (e) {
                      return this.content.maybeChild(e);
                    },
                  },
                  {
                    key: "forEach",
                    value: function (e) {
                      this.content.forEach(e);
                    },
                  },
                  {
                    key: "nodesBetween",
                    value: function (e, t, n) {
                      var r =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : 0;
                      this.content.nodesBetween(e, t, n, r, this);
                    },
                  },
                  {
                    key: "descendants",
                    value: function (e) {
                      this.nodesBetween(0, this.content.size, e);
                    },
                  },
                  {
                    key: "textContent",
                    get: function () {
                      return this.isLeaf && this.type.spec.leafText
                        ? this.type.spec.leafText(this)
                        : this.textBetween(0, this.content.size, "");
                    },
                  },
                  {
                    key: "textBetween",
                    value: function (e, t, n, r) {
                      return this.content.textBetween(e, t, n, r);
                    },
                  },
                  {
                    key: "firstChild",
                    get: function () {
                      return this.content.firstChild;
                    },
                  },
                  {
                    key: "lastChild",
                    get: function () {
                      return this.content.lastChild;
                    },
                  },
                  {
                    key: "eq",
                    value: function (e) {
                      return (
                        this == e ||
                        (this.sameMarkup(e) && this.content.eq(e.content))
                      );
                    },
                  },
                  {
                    key: "sameMarkup",
                    value: function (e) {
                      return this.hasMarkup(e.type, e.attrs, e.marks);
                    },
                  },
                  {
                    key: "hasMarkup",
                    value: function (e, t, n) {
                      return (
                        this.type == e &&
                        O(this.attrs, t || e.defaultAttrs || W) &&
                        C.sameSet(this.marks, n || C.none)
                      );
                    },
                  },
                  {
                    key: "copy",
                    value: function () {
                      var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : null;
                      return t == this.content
                        ? this
                        : new e(this.type, this.attrs, t, this.marks);
                    },
                  },
                  {
                    key: "mark",
                    value: function (t) {
                      return t == this.marks
                        ? this
                        : new e(this.type, this.attrs, this.content, t);
                    },
                  },
                  {
                    key: "cut",
                    value: function (e) {
                      var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : this.content.size;
                      return 0 == e && t == this.content.size
                        ? this
                        : this.copy(this.content.cut(e, t));
                    },
                  },
                  {
                    key: "slice",
                    value: function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : this.content.size,
                        n =
                          arguments.length > 2 &&
                          void 0 !== arguments[2] &&
                          arguments[2];
                      if (e == t) return T.empty;
                      var r = this.resolve(e),
                        o = this.resolve(t),
                        i = n ? 0 : r.sharedDepth(t),
                        s = r.start(i),
                        a = r.node(i),
                        l = a.content.cut(r.pos - s, o.pos - s);
                      return new T(l, r.depth - i, o.depth - i);
                    },
                  },
                  {
                    key: "replace",
                    value: function (e, t, n) {
                      return A(this.resolve(e), this.resolve(t), n);
                    },
                  },
                  {
                    key: "nodeAt",
                    value: function (e) {
                      for (var t = this; ; ) {
                        var n = t.content.findIndex(e),
                          r = n.index,
                          o = n.offset;
                        if (!(t = t.maybeChild(r))) return null;
                        if (o == e || t.isText) return t;
                        e -= o + 1;
                      }
                    },
                  },
                  {
                    key: "childAfter",
                    value: function (e) {
                      var t = this.content.findIndex(e),
                        n = t.index,
                        r = t.offset;
                      return {
                        node: this.content.maybeChild(n),
                        index: n,
                        offset: r,
                      };
                    },
                  },
                  {
                    key: "childBefore",
                    value: function (e) {
                      if (0 == e) return { node: null, index: 0, offset: 0 };
                      var t = this.content.findIndex(e),
                        n = t.index,
                        r = t.offset;
                      if (r < e)
                        return {
                          node: this.content.child(n),
                          index: n,
                          offset: r,
                        };
                      var o = this.content.child(n - 1);
                      return { node: o, index: n - 1, offset: r - o.nodeSize };
                    },
                  },
                  {
                    key: "resolve",
                    value: function (e) {
                      return j.resolveCached(this, e);
                    },
                  },
                  {
                    key: "resolveNoCache",
                    value: function (e) {
                      return j.resolve(this, e);
                    },
                  },
                  {
                    key: "rangeHasMark",
                    value: function (e, t, n) {
                      var r = !1;
                      return (
                        t > e &&
                          this.nodesBetween(e, t, function (e) {
                            return n.isInSet(e.marks) && (r = !0), !r;
                          }),
                        r
                      );
                    },
                  },
                  {
                    key: "isBlock",
                    get: function () {
                      return this.type.isBlock;
                    },
                  },
                  {
                    key: "isTextblock",
                    get: function () {
                      return this.type.isTextblock;
                    },
                  },
                  {
                    key: "inlineContent",
                    get: function () {
                      return this.type.inlineContent;
                    },
                  },
                  {
                    key: "isInline",
                    get: function () {
                      return this.type.isInline;
                    },
                  },
                  {
                    key: "isText",
                    get: function () {
                      return this.type.isText;
                    },
                  },
                  {
                    key: "isLeaf",
                    get: function () {
                      return this.type.isLeaf;
                    },
                  },
                  {
                    key: "isAtom",
                    get: function () {
                      return this.type.isAtom;
                    },
                  },
                  {
                    key: "toString",
                    value: function () {
                      if (this.type.spec.toDebugString)
                        return this.type.spec.toDebugString(this);
                      var e = this.type.name;
                      return (
                        this.content.size &&
                          (e += "(" + this.content.toStringInner() + ")"),
                        U(this.marks, e)
                      );
                    },
                  },
                  {
                    key: "contentMatchAt",
                    value: function (e) {
                      var t = this.type.contentMatch.matchFragment(
                        this.content,
                        0,
                        e
                      );
                      if (!t)
                        throw new Error(
                          "Called contentMatchAt on a node with invalid content"
                        );
                      return t;
                    },
                  },
                  {
                    key: "canReplace",
                    value: function (e, t) {
                      var n =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : S.empty,
                        r =
                          arguments.length > 3 && void 0 !== arguments[3]
                            ? arguments[3]
                            : 0,
                        o =
                          arguments.length > 4 && void 0 !== arguments[4]
                            ? arguments[4]
                            : n.childCount,
                        i = this.contentMatchAt(e).matchFragment(n, r, o),
                        s = i && i.matchFragment(this.content, t);
                      if (!s || !s.validEnd) return !1;
                      for (var a = r; a < o; a++)
                        if (!this.type.allowsMarks(n.child(a).marks)) return !1;
                      return !0;
                    },
                  },
                  {
                    key: "canReplaceWith",
                    value: function (e, t, n, r) {
                      if (r && !this.type.allowsMarks(r)) return !1;
                      var o = this.contentMatchAt(e).matchType(n),
                        i = o && o.matchFragment(this.content, t);
                      return !!i && i.validEnd;
                    },
                  },
                  {
                    key: "canAppend",
                    value: function (e) {
                      return e.content.size
                        ? this.canReplace(
                            this.childCount,
                            this.childCount,
                            e.content
                          )
                        : this.type.compatibleContent(e.type);
                    },
                  },
                  {
                    key: "check",
                    value: function () {
                      this.type.checkContent(this.content);
                      for (var e = C.none, t = 0; t < this.marks.length; t++)
                        e = this.marks[t].addToSet(e);
                      if (!C.sameSet(e, this.marks))
                        throw new RangeError(
                          "Invalid collection of marks for node "
                            .concat(this.type.name, ": ")
                            .concat(
                              this.marks.map(function (e) {
                                return e.type.name;
                              })
                            )
                        );
                      this.content.forEach(function (e) {
                        return e.check();
                      });
                    },
                  },
                  {
                    key: "toJSON",
                    value: function () {
                      var e = { type: this.type.name };
                      for (var t in this.attrs) {
                        e.attrs = this.attrs;
                        break;
                      }
                      return (
                        this.content.size &&
                          (e.content = this.content.toJSON()),
                        this.marks.length &&
                          (e.marks = this.marks.map(function (e) {
                            return e.toJSON();
                          })),
                        e
                      );
                    },
                  },
                ],
                [
                  {
                    key: "fromJSON",
                    value: function (e, t) {
                      if (!t)
                        throw new RangeError("Invalid input for Node.fromJSON");
                      var n = null;
                      if (t.marks) {
                        if (!Array.isArray(t.marks))
                          throw new RangeError(
                            "Invalid mark data for Node.fromJSON"
                          );
                        n = t.marks.map(e.markFromJSON);
                      }
                      if ("text" == t.type) {
                        if ("string" != typeof t.text)
                          throw new RangeError("Invalid text node in JSON");
                        return e.text(t.text, n);
                      }
                      var r = S.fromJSON(e, t.content);
                      return e.nodeType(t.type).create(t.attrs, r, n);
                    },
                  },
                ]
              ),
              e
            );
          })();
        K.prototype.text = void 0;
        var H = (function (e) {
          s(n, e);
          var t = a(n);
          function n(e, r, o, i) {
            var s;
            if ((p(this, n), (s = t.call(this, e, r, null, i)), !o))
              throw new RangeError("Empty text nodes are not allowed");
            return (s.text = o), s;
          }
          return (
            v(n, [
              {
                key: "toString",
                value: function () {
                  return this.type.spec.toDebugString
                    ? this.type.spec.toDebugString(this)
                    : U(this.marks, JSON.stringify(this.text));
                },
              },
              {
                key: "textContent",
                get: function () {
                  return this.text;
                },
              },
              {
                key: "textBetween",
                value: function (e, t) {
                  return this.text.slice(e, t);
                },
              },
              {
                key: "nodeSize",
                get: function () {
                  return this.text.length;
                },
              },
              {
                key: "mark",
                value: function (e) {
                  return e == this.marks
                    ? this
                    : new n(this.type, this.attrs, this.text, e);
                },
              },
              {
                key: "withText",
                value: function (e) {
                  return e == this.text
                    ? this
                    : new n(this.type, this.attrs, e, this.marks);
                },
              },
              {
                key: "cut",
                value: function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0,
                    t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : this.text.length;
                  return 0 == e && t == this.text.length
                    ? this
                    : this.withText(this.text.slice(e, t));
                },
              },
              {
                key: "eq",
                value: function (e) {
                  return this.sameMarkup(e) && this.text == e.text;
                },
              },
              {
                key: "toJSON",
                value: function () {
                  var e = o(d(n.prototype), "toJSON", this).call(this);
                  return (e.text = this.text), e;
                },
              },
            ]),
            n
          );
        })(K);
        function U(e, t) {
          for (var n = e.length - 1; n >= 0; n--)
            t = e[n].type.name + "(" + t + ")";
          return t;
        }
        var G = (function () {
          function e(t) {
            p(this, e),
              (this.validEnd = t),
              (this.next = []),
              (this.wrapCache = []);
          }
          return (
            v(
              e,
              [
                {
                  key: "matchType",
                  value: function (e) {
                    for (var t = 0; t < this.next.length; t++)
                      if (this.next[t].type == e) return this.next[t].next;
                    return null;
                  },
                },
                {
                  key: "matchFragment",
                  value: function (e) {
                    for (
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : 0,
                        n =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : e.childCount,
                        r = this,
                        o = t;
                      r && o < n;
                      o++
                    )
                      r = r.matchType(e.child(o).type);
                    return r;
                  },
                },
                {
                  key: "inlineContent",
                  get: function () {
                    return 0 != this.next.length && this.next[0].type.isInline;
                  },
                },
                {
                  key: "defaultType",
                  get: function () {
                    for (var e = 0; e < this.next.length; e++) {
                      var t = this.next[e].type;
                      if (!t.isText && !t.hasRequiredAttrs()) return t;
                    }
                    return null;
                  },
                },
                {
                  key: "compatible",
                  value: function (e) {
                    for (var t = 0; t < this.next.length; t++)
                      for (var n = 0; n < e.next.length; n++)
                        if (this.next[t].type == e.next[n].type) return !0;
                    return !1;
                  },
                },
                {
                  key: "fillBefore",
                  value: function (e) {
                    var t =
                        arguments.length > 1 &&
                        void 0 !== arguments[1] &&
                        arguments[1],
                      n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : 0,
                      r = [this];
                    function o(i, s) {
                      var a = i.matchFragment(e, n);
                      if (a && (!t || a.validEnd))
                        return S.from(
                          s.map(function (e) {
                            return e.createAndFill();
                          })
                        );
                      for (var l = 0; l < i.next.length; l++) {
                        var c = i.next[l],
                          u = c.type,
                          h = c.next;
                        if (
                          !u.isText &&
                          !u.hasRequiredAttrs() &&
                          -1 == r.indexOf(h)
                        ) {
                          r.push(h);
                          var f = o(h, s.concat(u));
                          if (f) return f;
                        }
                      }
                      return null;
                    }
                    return o(this, []);
                  },
                },
                {
                  key: "findWrapping",
                  value: function (e) {
                    for (var t = 0; t < this.wrapCache.length; t += 2)
                      if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
                    var n = this.computeWrapping(e);
                    return this.wrapCache.push(e, n), n;
                  },
                },
                {
                  key: "computeWrapping",
                  value: function (e) {
                    for (
                      var t = Object.create(null),
                        n = [{ match: this, type: null, via: null }];
                      n.length;

                    ) {
                      var r = n.shift(),
                        o = r.match;
                      if (o.matchType(e)) {
                        for (var i = [], s = r; s.type; s = s.via)
                          i.push(s.type);
                        return i.reverse();
                      }
                      for (var a = 0; a < o.next.length; a++) {
                        var l = o.next[a],
                          c = l.type,
                          u = l.next;
                        c.isLeaf ||
                          c.hasRequiredAttrs() ||
                          c.name in t ||
                          (r.type && !u.validEnd) ||
                          (n.push({ match: c.contentMatch, type: c, via: r }),
                          (t[c.name] = !0));
                      }
                    }
                    return null;
                  },
                },
                {
                  key: "edgeCount",
                  get: function () {
                    return this.next.length;
                  },
                },
                {
                  key: "edge",
                  value: function (e) {
                    if (e >= this.next.length)
                      throw new RangeError(
                        "There's no ".concat(e, "th edge in this content match")
                      );
                    return this.next[e];
                  },
                },
                {
                  key: "toString",
                  value: function () {
                    var e = [];
                    return (
                      (function t(n) {
                        e.push(n);
                        for (var r = 0; r < n.next.length; r++)
                          -1 == e.indexOf(n.next[r].next) && t(n.next[r].next);
                      })(this),
                      e
                        .map(function (t, n) {
                          for (
                            var r = n + (t.validEnd ? "*" : " ") + " ", o = 0;
                            o < t.next.length;
                            o++
                          )
                            r +=
                              (o ? ", " : "") +
                              t.next[o].type.name +
                              "->" +
                              e.indexOf(t.next[o].next);
                          return r;
                        })
                        .join("\n")
                    );
                  },
                },
              ],
              [
                {
                  key: "parse",
                  value: function (t, n) {
                    var r = new Z(t, n);
                    if (null == r.next) return e.empty;
                    var o = X(r);
                    r.next && r.err("Unexpected trailing text");
                    var i = oe(
                      (function (e) {
                        var t = [[]];
                        return (
                          o(
                            (function e(t, i) {
                              if ("choice" == t.type)
                                return t.exprs.reduce(function (t, n) {
                                  return t.concat(e(n, i));
                                }, []);
                              if ("seq" != t.type) {
                                if ("star" == t.type) {
                                  var s = n();
                                  return r(i, s), o(e(t.expr, s), s), [r(s)];
                                }
                                if ("plus" == t.type) {
                                  var a = n();
                                  return (
                                    o(e(t.expr, i), a),
                                    o(e(t.expr, a), a),
                                    [r(a)]
                                  );
                                }
                                if ("opt" == t.type)
                                  return [r(i)].concat(e(t.expr, i));
                                if ("range" == t.type) {
                                  for (var l = i, c = 0; c < t.min; c++) {
                                    var u = n();
                                    o(e(t.expr, l), u), (l = u);
                                  }
                                  if (-1 == t.max) o(e(t.expr, l), l);
                                  else
                                    for (var h = t.min; h < t.max; h++) {
                                      var f = n();
                                      r(l, f), o(e(t.expr, l), f), (l = f);
                                    }
                                  return [r(l)];
                                }
                                if ("name" == t.type)
                                  return [r(i, void 0, t.value)];
                                throw new Error("Unknown expr type");
                              }
                              for (var d = 0; ; d++) {
                                var p = e(t.exprs[d], i);
                                if (d == t.exprs.length - 1) return p;
                                o(p, (i = n()));
                              }
                            })(e, 0),
                            n()
                          ),
                          t
                        );
                        function n() {
                          return t.push([]) - 1;
                        }
                        function r(e, n, r) {
                          var o = { term: r, to: n };
                          return t[e].push(o), o;
                        }
                        function o(e, t) {
                          e.forEach(function (e) {
                            return (e.to = t);
                          });
                        }
                      })(o)
                    );
                    return (
                      (function (e, t) {
                        for (var n = 0, r = [e]; n < r.length; n++) {
                          for (
                            var o = r[n], i = !o.validEnd, s = [], a = 0;
                            a < o.next.length;
                            a++
                          ) {
                            var l = o.next[a],
                              c = l.type,
                              u = l.next;
                            s.push(c.name),
                              !i ||
                                c.isText ||
                                c.hasRequiredAttrs() ||
                                (i = !1),
                              -1 == r.indexOf(u) && r.push(u);
                          }
                          i &&
                            t.err(
                              "Only non-generatable nodes (" +
                                s.join(", ") +
                                ") in a required position (see https://prosemirror.net/docs/guide/#generatable)"
                            );
                        }
                      })(i, r),
                      i
                    );
                  },
                },
              ]
            ),
            e
          );
        })();
        G.empty = new G(!0);
        var Z = (function () {
          function e(t, n) {
            p(this, e),
              (this.string = t),
              (this.nodeTypes = n),
              (this.inline = null),
              (this.pos = 0),
              (this.tokens = t.split(/\s*(?=\b|\W|$)/)),
              "" == this.tokens[this.tokens.length - 1] && this.tokens.pop(),
              "" == this.tokens[0] && this.tokens.shift();
          }
          return (
            v(e, [
              {
                key: "next",
                get: function () {
                  return this.tokens[this.pos];
                },
              },
              {
                key: "eat",
                value: function (e) {
                  return this.next == e && (this.pos++ || !0);
                },
              },
              {
                key: "err",
                value: function (e) {
                  throw new SyntaxError(
                    e + " (in content expression '" + this.string + "')"
                  );
                },
              },
            ]),
            e
          );
        })();
        function X(e) {
          var t = [];
          do {
            t.push(Y(e));
          } while (e.eat("|"));
          return 1 == t.length ? t[0] : { type: "choice", exprs: t };
        }
        function Y(e) {
          var t = [];
          do {
            t.push(Q(e));
          } while (e.next && ")" != e.next && "|" != e.next);
          return 1 == t.length ? t[0] : { type: "seq", exprs: t };
        }
        function Q(e) {
          for (
            var t = (function (e) {
              if (e.eat("(")) {
                var t = X(e);
                return e.eat(")") || e.err("Missing closing paren"), t;
              }
              if (!/\W/.test(e.next)) {
                var n = (function (e, t) {
                  var n = e.nodeTypes,
                    r = n[t];
                  if (r) return [r];
                  var o = [];
                  for (var i in n) {
                    var s = n[i];
                    s.groups.indexOf(t) > -1 && o.push(s);
                  }
                  return (
                    0 == o.length &&
                      e.err("No node type or group '" + t + "' found"),
                    o
                  );
                })(e, e.next).map(function (t) {
                  return (
                    null == e.inline
                      ? (e.inline = t.isInline)
                      : e.inline != t.isInline &&
                        e.err("Mixing inline and block content"),
                    { type: "name", value: t }
                  );
                });
                return (
                  e.pos++, 1 == n.length ? n[0] : { type: "choice", exprs: n }
                );
              }
              e.err("Unexpected token '" + e.next + "'");
            })(e);
            ;

          )
            if (e.eat("+")) t = { type: "plus", expr: t };
            else if (e.eat("*")) t = { type: "star", expr: t };
            else if (e.eat("?")) t = { type: "opt", expr: t };
            else {
              if (!e.eat("{")) break;
              t = te(e, t);
            }
          return t;
        }
        function ee(e) {
          /\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
          var t = Number(e.next);
          return e.pos++, t;
        }
        function te(e, t) {
          var n = ee(e),
            r = n;
          return (
            e.eat(",") && (r = "}" != e.next ? ee(e) : -1),
            e.eat("}") || e.err("Unclosed braced range"),
            { type: "range", min: n, max: r, expr: t }
          );
        }
        function ne(e, t) {
          return t - e;
        }
        function re(e, t) {
          var n = [];
          return (
            (function t(r) {
              var o = e[r];
              if (1 == o.length && !o[0].term) return t(o[0].to);
              n.push(r);
              for (var i = 0; i < o.length; i++) {
                var s = o[i],
                  a = s.term,
                  l = s.to;
                a || -1 != n.indexOf(l) || t(l);
              }
            })(t),
            n.sort(ne)
          );
        }
        function oe(e) {
          var t = Object.create(null);
          return (function n(r) {
            var o = [];
            r.forEach(function (t) {
              e[t].forEach(function (t) {
                var n = t.term,
                  r = t.to;
                if (n) {
                  for (var i, s = 0; s < o.length; s++)
                    o[s][0] == n && (i = o[s][1]);
                  re(e, r).forEach(function (e) {
                    i || o.push([n, (i = [])]), -1 == i.indexOf(e) && i.push(e);
                  });
                }
              });
            });
            for (
              var i = (t[r.join(",")] = new G(r.indexOf(e.length - 1) > -1)),
                s = 0;
              s < o.length;
              s++
            ) {
              var a = o[s][1].sort(ne);
              i.next.push({ type: o[s][0], next: t[a.join(",")] || n(a) });
            }
            return i;
          })(re(e, 0));
        }
        function ie(e) {
          var t = Object.create(null);
          for (var n in e) {
            var r = e[n];
            if (!r.hasDefault) return null;
            t[n] = r.default;
          }
          return t;
        }
        function se(e, t) { //aqui entran las menciones como lista
          // console.log(e,t);
          var n = Object.create(null);
          for (var r in e) {
            var o = t && t[r];
            if (void 0 === o) {
              var i = e[r];
              if (!i.hasDefault)
                throw new RangeError("No value supplied for attribute " + r);
              o = i.default;
            }
            n[r] = o;
          }
          return n;
        }
        function ae(e) {
          var t = Object.create(null);
          if (e) for (var n in e) t[n] = new ce(e[n]);
          return t;
        }
        var le = (function () {
            function e(t, n, r) {
              p(this, e),
                (this.name = t),
                (this.schema = n),
                (this.spec = r),
                (this.markSet = null),
                (this.groups = r.group ? r.group.split(" ") : []),
                (this.attrs = ae(r.attrs)),
                (this.defaultAttrs = ie(this.attrs)),
                (this.contentMatch = null),
                (this.inlineContent = null),
                (this.isBlock = !(r.inline || "text" == t)),
                (this.isText = "text" == t);
            }
            return (
              v(
                e,
                [
                  {
                    key: "isInline",
                    get: function () {
                      return !this.isBlock;
                    },
                  },
                  {
                    key: "isTextblock",
                    get: function () {
                      return this.isBlock && this.inlineContent;
                    },
                  },
                  {
                    key: "isLeaf",
                    get: function () {
                      return this.contentMatch == G.empty;
                    },
                  },
                  {
                    key: "isAtom",
                    get: function () {
                      return this.isLeaf || !!this.spec.atom;
                    },
                  },
                  {
                    key: "whitespace",
                    get: function () {
                      return (
                        this.spec.whitespace ||
                        (this.spec.code ? "pre" : "normal")
                      );
                    },
                  },
                  {
                    key: "hasRequiredAttrs",
                    value: function () {
                      for (var e in this.attrs)
                        if (this.attrs[e].isRequired) return !0;
                      return !1;
                    },
                  },
                  {
                    key: "compatibleContent",
                    value: function (e) {
                      return (
                        this == e ||
                        this.contentMatch.compatible(e.contentMatch)
                      );
                    },
                  },
                  {
                    key: "computeAttrs",
                    value: function (e) {
                      return !e && this.defaultAttrs
                        ? this.defaultAttrs
                        : se(this.attrs, e);
                    },
                  },
                  {
                    key: "create",
                    value: function () {
                      var e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : null,
                        t = arguments.length > 1 ? arguments[1] : void 0,
                        n = arguments.length > 2 ? arguments[2] : void 0;
                      if (this.isText)
                        throw new Error(
                          "NodeType.create can't construct text nodes"
                        );
                      return new K(
                        this,
                        this.computeAttrs(e),
                        S.from(t),
                        C.setFrom(n)
                      );
                    },
                  },
                  {
                    key: "createChecked",
                    value: function () {
                      var e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : null,
                        t = arguments.length > 1 ? arguments[1] : void 0,
                        n = arguments.length > 2 ? arguments[2] : void 0;
                      return (
                        (t = S.from(t)),
                        this.checkContent(t),
                        new K(this, this.computeAttrs(e), t, C.setFrom(n))
                      );
                    },
                  },
                  {
                    key: "createAndFill",
                    value: function () {
                      var e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : null,
                        t = arguments.length > 1 ? arguments[1] : void 0,
                        n = arguments.length > 2 ? arguments[2] : void 0;
                      if (((e = this.computeAttrs(e)), (t = S.from(t)).size)) {
                        var r = this.contentMatch.fillBefore(t);
                        if (!r) return null;
                        t = r.append(t);
                      }
                      var o = this.contentMatch.matchFragment(t),
                        i = o && o.fillBefore(S.empty, !0);
                      return i
                        ? new K(this, e, t.append(i), C.setFrom(n))
                        : null;
                    },
                  },
                  {
                    key: "validContent",
                    value: function (e) {
                      var t = this.contentMatch.matchFragment(e);
                      if (!t || !t.validEnd) return !1;
                      for (var n = 0; n < e.childCount; n++)
                        if (!this.allowsMarks(e.child(n).marks)) return !1;
                      return !0;
                    },
                  },
                  {
                    key: "checkContent",
                    value: function (e) {
                      if (!this.validContent(e))
                        throw new RangeError(
                          "Invalid content for node "
                            .concat(this.name, ": ")
                            .concat(e.toString().slice(0, 50))
                        );
                    },
                  },
                  {
                    key: "allowsMarkType",
                    value: function (e) {
                      return (
                        null == this.markSet || this.markSet.indexOf(e) > -1
                      );
                    },
                  },
                  {
                    key: "allowsMarks",
                    value: function (e) {
                      if (null == this.markSet) return !0;
                      for (var t = 0; t < e.length; t++)
                        if (!this.allowsMarkType(e[t].type)) return !1;
                      return !0;
                    },
                  },
                  {
                    key: "allowedMarks",
                    value: function (e) {
                      if (null == this.markSet) return e;
                      for (var t, n = 0; n < e.length; n++)
                        this.allowsMarkType(e[n].type)
                          ? t && t.push(e[n])
                          : t || (t = e.slice(0, n));
                      return t ? (t.length ? t : C.none) : e;
                    },
                  },
                ],
                [
                  {
                    key: "compile",
                    value: function (t, n) {
                      var r = Object.create(null);
                      t.forEach(function (t, o) {
                        return (r[t] = new e(t, n, o));
                      });
                      var o = n.spec.topNode || "doc";
                      if (!r[o])
                        throw new RangeError(
                          "Schema is missing its top node type ('" + o + "')"
                        );
                      if (!r.text)
                        throw new RangeError(
                          "Every schema needs a 'text' type"
                        );
                      for (var i in r.text.attrs)
                        throw new RangeError(
                          "The text node type should not have attributes"
                        );
                      return r;
                    },
                  },
                ]
              ),
              e
            );
          })(),
          ce = (function () {
            function e(t) {
              p(this, e),
                (this.hasDefault = Object.prototype.hasOwnProperty.call(
                  t,
                  "default"
                )),
                (this.default = t.default);
            }
            return (
              v(e, [
                {
                  key: "isRequired",
                  get: function () {
                    return !this.hasDefault;
                  },
                },
              ]),
              e
            );
          })(),
          ue = (function () {
            function e(t, n, r, o) {
              p(this, e),
                (this.name = t),
                (this.rank = n),
                (this.schema = r),
                (this.spec = o),
                (this.attrs = ae(o.attrs)),
                (this.excluded = null);
              var i = ie(this.attrs);
              this.instance = i ? new C(this, i) : null;
            }
            return (
              v(
                e,
                [
                  {
                    key: "create",
                    value: function () {
                      var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : null;
                      return !e && this.instance
                        ? this.instance
                        : new C(this, se(this.attrs, e));
                    },
                  },
                  {
                    key: "removeFromSet",
                    value: function (e) {
                      for (var t = 0; t < e.length; t++)
                        e[t].type == this &&
                          ((e = e.slice(0, t).concat(e.slice(t + 1))), t--);
                      return e;
                    },
                  },
                  {
                    key: "isInSet",
                    value: function (e) {
                      for (var t = 0; t < e.length; t++)
                        if (e[t].type == this) return e[t];
                    },
                  },
                  {
                    key: "excludes",
                    value: function (e) {
                      return this.excluded.indexOf(e) > -1;
                    },
                  },
                ],
                [
                  {
                    key: "compile",
                    value: function (t, n) {
                      var r = Object.create(null),
                        o = 0;
                      return (
                        t.forEach(function (t, i) {
                          return (r[t] = new e(t, o++, n, i));
                        }),
                        r
                      );
                    },
                  },
                ]
              ),
              e
            );
          })(),
          he = (function () {
            function e(t) {
              p(this, e), (this.cached = Object.create(null));
              var n = (this.spec = {});
              for (var r in t) n[r] = t[r];
              (n.nodes = k.default.from(t.nodes)),
                (n.marks = k.default.from(t.marks || {})),
                (this.nodes = le.compile(this.spec.nodes, this)),
                (this.marks = ue.compile(this.spec.marks, this));
              var o = Object.create(null);
              for (var i in this.nodes) {
                if (i in this.marks)
                  throw new RangeError(
                    i + " can not be both a node and a mark"
                  );
                var s = this.nodes[i],
                  a = s.spec.content || "",
                  l = s.spec.marks;
                (s.contentMatch = o[a] || (o[a] = G.parse(a, this.nodes))),
                  (s.inlineContent = s.contentMatch.inlineContent),
                  (s.markSet =
                    "_" == l
                      ? null
                      : l
                      ? fe(this, l.split(" "))
                      : "" != l && s.inlineContent
                      ? null
                      : []);
              }
              for (var c in this.marks) {
                var u = this.marks[c],
                  h = u.spec.excludes;
                u.excluded =
                  null == h ? [u] : "" == h ? [] : fe(this, h.split(" "));
              }
              (this.nodeFromJSON = this.nodeFromJSON.bind(this)),
                (this.markFromJSON = this.markFromJSON.bind(this)),
                (this.topNodeType = this.nodes[this.spec.topNode || "doc"]),
                (this.cached.wrappings = Object.create(null));
            }
            return (
              v(e, [
                {
                  key: "node",
                  value: function (e) {
                    var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : null,
                      n = arguments.length > 2 ? arguments[2] : void 0,
                      r = arguments.length > 3 ? arguments[3] : void 0;
                    if ("string" == typeof e) e = this.nodeType(e);
                    else {
                      if (!(e instanceof le))
                        throw new RangeError("Invalid node type: " + e);
                      if (e.schema != this)
                        throw new RangeError(
                          "Node type from different schema used (" +
                            e.name +
                            ")"
                        );
                    }
                    return e.createChecked(t, n, r);
                  },
                },
                {
                  key: "text",
                  value: function (e, t) {
                    var n = this.nodes.text;
                    return new H(n, n.defaultAttrs, e, C.setFrom(t));
                  },
                },
                {
                  key: "mark",
                  value: function (e, t) {
                    return (
                      "string" == typeof e && (e = this.marks[e]), e.create(t)
                    );
                  },
                },
                {
                  key: "nodeFromJSON",
                  value: function (e) {
                    return K.fromJSON(this, e);
                  },
                },
                {
                  key: "markFromJSON",
                  value: function (e) {
                    return C.fromJSON(this, e);
                  },
                },
                {
                  key: "nodeType",
                  value: function (e) {
                    var t = this.nodes[e];
                    if (!t) throw new RangeError("Unknown node type: " + e);
                    return t;
                  },
                },
              ]),
              e
            );
          })();
        function fe(e, t) {
          for (var n = [], r = 0; r < t.length; r++) {
            var o = t[r],
              i = e.marks[o],
              s = i;
            if (i) n.push(i);
            else
              for (var a in e.marks) {
                var l = e.marks[a];
                ("_" == o ||
                  (l.spec.group && l.spec.group.split(" ").indexOf(o) > -1)) &&
                  n.push((s = l));
              }
            if (!s) throw new SyntaxError("Unknown mark type: '" + t[r] + "'");
          }
          return n;
        }
        var de = (function () {
            function e(t, n) {
              var r = this;
              p(this, e),
                (this.schema = t),
                (this.rules = n),
                (this.tags = []),
                (this.styles = []),
                n.forEach(function (e) {
                  e.tag ? r.tags.push(e) : e.style && r.styles.push(e);
                }),
                (this.normalizeLists = !this.tags.some(function (e) {
                  if (!/^(ul|ol)\b/.test(e.tag) || !e.node) return !1;
                  var n = t.nodes[e.node];
                  return n.contentMatch.matchType(n);
                }));
            }
            return (
              v(
                e,
                [
                  {
                    key: "parse",
                    value: function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                        n = new ke(this, t, !1);
                      return n.addAll(e, t.from, t.to), n.finish();
                    },
                  },
                  {
                    key: "parseSlice",
                    value: function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                        n = new ke(this, t, !0);
                      return n.addAll(e, t.from, t.to), T.maxOpen(n.finish());
                    },
                  },
                  {
                    key: "matchTag",
                    value: function (e, t, n) {
                      for (
                        var r = n ? this.tags.indexOf(n) + 1 : 0;
                        r < this.tags.length;
                        r++
                      ) {
                        var o = this.tags[r];
                        if (
                          we(e, o.tag) &&
                          (void 0 === o.namespace ||
                            e.namespaceURI == o.namespace) &&
                          (!o.context || t.matchesContext(o.context))
                        ) {
                          if (o.getAttrs) {
                            var i = o.getAttrs(e);
                            if (!1 === i) continue;
                            o.attrs = i || void 0;
                          }
                          return o;
                        }
                      }
                    },
                  },
                  {
                    key: "matchStyle",
                    value: function (e, t, n, r) {
                      for (
                        var o = r ? this.styles.indexOf(r) + 1 : 0;
                        o < this.styles.length;
                        o++
                      ) {
                        var i = this.styles[o],
                          s = i.style;
                        if (
                          !(
                            0 != s.indexOf(e) ||
                            (i.context && !n.matchesContext(i.context)) ||
                            (s.length > e.length &&
                              (61 != s.charCodeAt(e.length) ||
                                s.slice(e.length + 1) != t))
                          )
                        ) {
                          if (i.getAttrs) {
                            var a = i.getAttrs(t);
                            if (!1 === a) continue;
                            i.attrs = a || void 0;
                          }
                          return i;
                        }
                      }
                    },
                  },
                ],
                [
                  {
                    key: "schemaRules",
                    value: function (e) {
                      var t = [];
                      function n(e) {
                        for (
                          var n = null == e.priority ? 50 : e.priority, r = 0;
                          r < t.length;
                          r++
                        ) {
                          var o = t[r];
                          if ((null == o.priority ? 50 : o.priority) < n) break;
                        }
                        t.splice(r, 0, e);
                      }
                      var r = function (t) {
                        var r = e.marks[t].spec.parseDOM;
                        r &&
                          r.forEach(function (e) {
                            n((e = be(e))),
                              e.mark || e.ignore || e.clearMark || (e.mark = t);
                          });
                      };
                      for (var o in e.marks) r(o);
                      var i = function (t) {
                        var r = e.nodes[t].spec.parseDOM;
                        r &&
                          r.forEach(function (e) {
                            n((e = be(e))),
                              e.node || e.ignore || e.mark || (e.node = t);
                          });
                      };
                      for (var s in e.nodes) i(s);
                      return t;
                    },
                  },
                  {
                    key: "fromSchema",
                    value: function (t) {
                      return (
                        t.cached.domParser ||
                        (t.cached.domParser = new e(t, e.schemaRules(t)))
                      );
                    },
                  },
                ]
              ),
              e
            );
          })(),
          pe = {
            address: !0,
            article: !0,
            aside: !0,
            blockquote: !0,
            canvas: !0,
            dd: !0,
            div: !0,
            dl: !0,
            fieldset: !0,
            figcaption: !0,
            figure: !0,
            footer: !0,
            form: !0,
            h1: !0,
            h2: !0,
            h3: !0,
            h4: !0,
            h5: !0,
            h6: !0,
            header: !0,
            hgroup: !0,
            hr: !0,
            li: !0,
            noscript: !0,
            ol: !0,
            output: !0,
            p: !0,
            pre: !0,
            section: !0,
            table: !0,
            tfoot: !0,
            ul: !0,
          },
          me = {
            head: !0,
            noscript: !0,
            object: !0,
            script: !0,
            style: !0,
            title: !0,
          },
          ve = { ol: !0, ul: !0 };
        function ge(e, t, n) {
          return null != t
            ? (t ? 1 : 0) | ("full" === t ? 2 : 0)
            : e && "pre" == e.whitespace
            ? 3
            : -5 & n;
        }
        var ye = (function () {
            function e(t, n, r, o, i, s, a) {
              p(this, e),
                (this.type = t),
                (this.attrs = n),
                (this.marks = r),
                (this.pendingMarks = o),
                (this.solid = i),
                (this.options = a),
                (this.content = []),
                (this.activeMarks = C.none),
                (this.stashMarks = []),
                (this.match = s || (4 & a ? null : t.contentMatch));
            }
            return (
              v(e, [
                {
                  key: "findWrapping",
                  value: function (e) {
                    if (!this.match) {
                      if (!this.type) return [];
                      var t = this.type.contentMatch.fillBefore(S.from(e));
                      if (!t) {
                        var n,
                          r = this.type.contentMatch;
                        return (n = r.findWrapping(e.type))
                          ? ((this.match = r), n)
                          : null;
                      }
                      this.match = this.type.contentMatch.matchFragment(t);
                    }
                    return this.match.findWrapping(e.type);
                  },
                },
                {
                  key: "finish",
                  value: function (e) {
                    if (!(1 & this.options)) {
                      var t,
                        n = this.content[this.content.length - 1];
                      if (
                        n &&
                        n.isText &&
                        (t = /[ \t\r\n\u000c]+$/.exec(n.text))
                      ) {
                        var r = n;
                        n.text.length == t[0].length
                          ? this.content.pop()
                          : (this.content[this.content.length - 1] = r.withText(
                              r.text.slice(0, r.text.length - t[0].length)
                            ));
                      }
                    }
                    var o = S.from(this.content);
                    return (
                      !e &&
                        this.match &&
                        (o = o.append(this.match.fillBefore(S.empty, !0))),
                      this.type
                        ? this.type.create(this.attrs, o, this.marks)
                        : o
                    );
                  },
                },
                {
                  key: "popFromStashMark",
                  value: function (e) {
                    for (var t = this.stashMarks.length - 1; t >= 0; t--)
                      if (e.eq(this.stashMarks[t]))
                        return this.stashMarks.splice(t, 1)[0];
                  },
                },
                {
                  key: "applyPending",
                  value: function (e) {
                    for (var t = 0, n = this.pendingMarks; t < n.length; t++) {
                      var r = n[t];
                      (this.type
                        ? this.type.allowsMarkType(r.type)
                        : Se(r.type, e)) &&
                        !r.isInSet(this.activeMarks) &&
                        ((this.activeMarks = r.addToSet(this.activeMarks)),
                        (this.pendingMarks = r.removeFromSet(
                          this.pendingMarks
                        )));
                    }
                  },
                },
                {
                  key: "inlineContext",
                  value: function (e) {
                    return this.type
                      ? this.type.inlineContent
                      : this.content.length
                      ? this.content[0].isInline
                      : e.parentNode &&
                        !pe.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
                  },
                },
              ]),
              e
            );
          })(),
          ke = (function () {
            function e(t, n, r) {
              p(this, e),
                (this.parser = t),
                (this.options = n),
                (this.isOpen = r),
                (this.open = 0);
              var o,
                i = n.topNode,
                s = ge(null, n.preserveWhitespace, 0) | (r ? 4 : 0);
              (o = i
                ? new ye(
                    i.type,
                    i.attrs,
                    C.none,
                    C.none,
                    !0,
                    n.topMatch || i.type.contentMatch,
                    s
                  )
                : new ye(
                    r ? null : t.schema.topNodeType,
                    null,
                    C.none,
                    C.none,
                    !0,
                    null,
                    s
                  )),
                (this.nodes = [o]),
                (this.find = n.findPositions),
                (this.needsBlock = !1);
            }
            return (
              v(e, [
                {
                  key: "top",
                  get: function () {
                    return this.nodes[this.open];
                  },
                },
                {
                  key: "addDOM",
                  value: function (e) {
                    if (3 == e.nodeType) this.addTextNode(e);
                    else if (1 == e.nodeType) {
                      var t = e.getAttribute("style");
                      if (t) {
                        var n = this.readStyles(
                          (function (e) {
                            for (
                              var t, n = /\s*([\w-]+)\s*:\s*([^;]+)/g, r = [];
                              (t = n.exec(e));

                            )
                              r.push(t[1], t[2].trim());
                            return r;
                          })(t)
                        );
                        if (!n) return;
                        for (
                          var o = (function (e, t) {
                              return (
                                (function (e) {
                                  if (Array.isArray(e)) return e;
                                })(e) ||
                                (function (e, t) {
                                  var n =
                                    null == e
                                      ? null
                                      : ("undefined" != typeof Symbol &&
                                          e[Symbol.iterator]) ||
                                        e["@@iterator"];
                                  if (null != n) {
                                    var r,
                                      o,
                                      i = [],
                                      s = !0,
                                      a = !1;
                                    try {
                                      for (
                                        n = n.call(e);
                                        !(s = (r = n.next()).done) &&
                                        (i.push(r.value), !t || i.length !== t);
                                        s = !0
                                      );
                                    } catch (e) {
                                      (a = !0), (o = e);
                                    } finally {
                                      try {
                                        s || null == n.return || n.return();
                                      } finally {
                                        if (a) throw o;
                                      }
                                    }
                                    return i;
                                  }
                                })(e, t) ||
                                (function (e, t) {
                                  if (e) {
                                    if ("string" == typeof e) return r(e, t);
                                    var n = Object.prototype.toString
                                      .call(e)
                                      .slice(8, -1);
                                    return (
                                      "Object" === n &&
                                        e.constructor &&
                                        (n = e.constructor.name),
                                      "Map" === n || "Set" === n
                                        ? Array.from(e)
                                        : "Arguments" === n ||
                                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                            n
                                          )
                                        ? r(e, t)
                                        : void 0
                                    );
                                  }
                                })(e, t) ||
                                (function () {
                                  throw new TypeError(
                                    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                                  );
                                })()
                              );
                            })(n, 2),
                            i = o[0],
                            s = o[1],
                            a = this.top,
                            l = 0;
                          l < s.length;
                          l++
                        )
                          this.removePendingMark(s[l], a);
                        for (var c = 0; c < i.length; c++)
                          this.addPendingMark(i[c]);
                        this.addElement(e);
                        for (var u = 0; u < i.length; u++)
                          this.removePendingMark(i[u], a);
                        for (var h = 0; h < s.length; h++)
                          this.addPendingMark(s[h]);
                      } else this.addElement(e);
                    }
                  },
                },
                {
                  key: "addTextNode",
                  value: function (e) {
                    var t = e.nodeValue,
                      n = this.top;
                    if (
                      2 & n.options ||
                      n.inlineContext(e) ||
                      /[^ \t\r\n\u000c]/.test(t)
                    ) {
                      if (1 & n.options)
                        t =
                          2 & n.options
                            ? t.replace(/\r\n?/g, "\n")
                            : t.replace(/\r?\n|\r/g, " ");
                      else if (
                        ((t = t.replace(/[ \t\r\n\u000c]+/g, " ")),
                        /^[ \t\r\n\u000c]/.test(t) &&
                          this.open == this.nodes.length - 1)
                      ) {
                        var r = n.content[n.content.length - 1],
                          o = e.previousSibling;
                        (!r ||
                          (o && "BR" == o.nodeName) ||
                          (r.isText && /[ \t\r\n\u000c]$/.test(r.text))) &&
                          (t = t.slice(1));
                      }
                      t && this.insertNode(this.parser.schema.text(t)),
                        this.findInText(e);
                    } else this.findInside(e);
                  },
                },
                {
                  key: "addElement",
                  value: function (e, t) {
                    var n,
                      r = e.nodeName.toLowerCase();
                    ve.hasOwnProperty(r) &&
                      this.parser.normalizeLists &&
                      (function (e) {
                        for (
                          var t = e.firstChild, n = null;
                          t;
                          t = t.nextSibling
                        ) {
                          var r =
                            1 == t.nodeType ? t.nodeName.toLowerCase() : null;
                          r && ve.hasOwnProperty(r) && n
                            ? (n.appendChild(t), (t = n))
                            : "li" == r
                            ? (n = t)
                            : r && (n = null);
                        }
                      })(e);
                    var o =
                      (this.options.ruleFromNode &&
                        this.options.ruleFromNode(e)) ||
                      (n = this.parser.matchTag(e, this, t));
                    if (o ? o.ignore : me.hasOwnProperty(r))
                      this.findInside(e), this.ignoreFallback(e);
                    else if (!o || o.skip || o.closeParent) {
                      o && o.closeParent
                        ? (this.open = Math.max(0, this.open - 1))
                        : o && o.skip.nodeType && (e = o.skip);
                      var i,
                        s = this.top,
                        a = this.needsBlock;
                      if (pe.hasOwnProperty(r))
                        s.content.length &&
                          s.content[0].isInline &&
                          this.open &&
                          (this.open--, (s = this.top)),
                          (i = !0),
                          s.type || (this.needsBlock = !0);
                      else if (!e.firstChild) return void this.leafFallback(e);
                      this.addAll(e), i && this.sync(s), (this.needsBlock = a);
                    } else
                      this.addElementByRule(
                        e,
                        o,
                        !1 === o.consuming ? n : void 0
                      );
                  },
                },
                {
                  key: "leafFallback",
                  value: function (e) {
                    "BR" == e.nodeName &&
                      this.top.type &&
                      this.top.type.inlineContent &&
                      this.addTextNode(e.ownerDocument.createTextNode("\n"));
                  },
                },
                {
                  key: "ignoreFallback",
                  value: function (e) {
                    "BR" != e.nodeName ||
                      (this.top.type && this.top.type.inlineContent) ||
                      this.findPlace(this.parser.schema.text("-"));
                  },
                },
                {
                  key: "readStyles",
                  value: function (e) {
                    var t = this,
                      n = C.none,
                      r = C.none;
                    e: for (var o = 0; o < e.length; o += 2)
                      for (
                        var i = function (i) {
                            var a = t.parser.matchStyle(e[o], e[o + 1], t, i);
                            return a
                              ? a.ignore
                                ? ((s = i), { v: null })
                                : (a.clearMark
                                    ? t.top.pendingMarks.forEach(function (e) {
                                        a.clearMark(e) && (r = e.addToSet(r));
                                      })
                                    : (n = t.parser.schema.marks[a.mark]
                                        .create(a.attrs)
                                        .addToSet(n)),
                                  !1 !== a.consuming
                                    ? ((s = i), "break")
                                    : void (s = i = a))
                              : ((s = i), "continue|style");
                          },
                          s = void 0;
                        ;

                      ) {
                        var a = i(s);
                        if ("continue|style" === a) continue e;
                        if ("break" === a) break;
                        if ("object" === g(a)) return a.v;
                      }
                    return [n, r];
                  },
                },
                {
                  key: "addElementByRule",
                  value: function (e, t, n) {
                    var r,
                      o,
                      i,
                      s = this;
                    t.node
                      ? (o = this.parser.schema.nodes[t.node]).isLeaf
                        ? this.insertNode(o.create(t.attrs)) ||
                          this.leafFallback(e)
                        : (r = this.enter(
                            o,
                            t.attrs || null,
                            t.preserveWhitespace
                          ))
                      : ((i = this.parser.schema.marks[t.mark].create(t.attrs)),
                        this.addPendingMark(i));
                    var a = this.top;
                    if (o && o.isLeaf) this.findInside(e);
                    else if (n) this.addElement(e, n);
                    else if (t.getContent)
                      this.findInside(e),
                        t
                          .getContent(e, this.parser.schema)
                          .forEach(function (e) {
                            return s.insertNode(e);
                          });
                    else {
                      var l = e;
                      "string" == typeof t.contentElement
                        ? (l = e.querySelector(t.contentElement))
                        : "function" == typeof t.contentElement
                        ? (l = t.contentElement(e))
                        : t.contentElement && (l = t.contentElement),
                        this.findAround(e, l, !0),
                        this.addAll(l);
                    }
                    r && this.sync(a) && this.open--,
                      i && this.removePendingMark(i, a);
                  },
                },
                {
                  key: "addAll",
                  value: function (e, t, n) {
                    for (
                      var r = t || 0,
                        o = t ? e.childNodes[t] : e.firstChild,
                        i = null == n ? null : e.childNodes[n];
                      o != i;
                      o = o.nextSibling, ++r
                    )
                      this.findAtPoint(e, r), this.addDOM(o);
                    this.findAtPoint(e, r);
                  },
                },
                {
                  key: "findPlace",
                  value: function (e) {
                    for (var t, n, r = this.open; r >= 0; r--) {
                      var o = this.nodes[r],
                        i = o.findWrapping(e);
                      if (
                        i &&
                        (!t || t.length > i.length) &&
                        ((t = i), (n = o), !i.length)
                      )
                        break;
                      if (o.solid) break;
                    }
                    if (!t) return !1;
                    this.sync(n);
                    for (var s = 0; s < t.length; s++)
                      this.enterInner(t[s], null, !1);
                    return !0;
                  },
                },
                {
                  key: "insertNode",
                  value: function (e) {
                    if (e.isInline && this.needsBlock && !this.top.type) {
                      var t = this.textblockFromContext();
                      t && this.enterInner(t);
                    }
                    if (this.findPlace(e)) {
                      this.closeExtra();
                      var n = this.top;
                      n.applyPending(e.type),
                        n.match && (n.match = n.match.matchType(e.type));
                      for (
                        var r = n.activeMarks, o = 0;
                        o < e.marks.length;
                        o++
                      )
                        (n.type && !n.type.allowsMarkType(e.marks[o].type)) ||
                          (r = e.marks[o].addToSet(r));
                      return n.content.push(e.mark(r)), !0;
                    }
                    return !1;
                  },
                },
                {
                  key: "enter",
                  value: function (e, t, n) {
                    var r = this.findPlace(e.create(t));
                    return r && this.enterInner(e, t, !0, n), r;
                  },
                },
                {
                  key: "enterInner",
                  value: function (e) {
                    var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : null,
                      n =
                        arguments.length > 2 &&
                        void 0 !== arguments[2] &&
                        arguments[2],
                      r = arguments.length > 3 ? arguments[3] : void 0;
                    this.closeExtra();
                    var o = this.top;
                    o.applyPending(e),
                      (o.match = o.match && o.match.matchType(e));
                    var i = ge(e, r, o.options);
                    4 & o.options && 0 == o.content.length && (i |= 4),
                      this.nodes.push(
                        new ye(e, t, o.activeMarks, o.pendingMarks, n, null, i)
                      ),
                      this.open++;
                  },
                },
                {
                  key: "closeExtra",
                  value: function () {
                    var e =
                        arguments.length > 0 &&
                        void 0 !== arguments[0] &&
                        arguments[0],
                      t = this.nodes.length - 1;
                    if (t > this.open) {
                      for (; t > this.open; t--)
                        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
                      this.nodes.length = this.open + 1;
                    }
                  },
                },
                {
                  key: "finish",
                  value: function () {
                    return (
                      (this.open = 0),
                      this.closeExtra(this.isOpen),
                      this.nodes[0].finish(this.isOpen || this.options.topOpen)
                    );
                  },
                },
                {
                  key: "sync",
                  value: function (e) {
                    for (var t = this.open; t >= 0; t--)
                      if (this.nodes[t] == e) return (this.open = t), !0;
                    return !1;
                  },
                },
                {
                  key: "currentPos",
                  get: function () {
                    this.closeExtra();
                    for (var e = 0, t = this.open; t >= 0; t--) {
                      for (
                        var n = this.nodes[t].content, r = n.length - 1;
                        r >= 0;
                        r--
                      )
                        e += n[r].nodeSize;
                      t && e++;
                    }
                    return e;
                  },
                },
                {
                  key: "findAtPoint",
                  value: function (e, t) {
                    if (this.find)
                      for (var n = 0; n < this.find.length; n++)
                        this.find[n].node == e &&
                          this.find[n].offset == t &&
                          (this.find[n].pos = this.currentPos);
                  },
                },
                {
                  key: "findInside",
                  value: function (e) {
                    if (this.find)
                      for (var t = 0; t < this.find.length; t++)
                        null == this.find[t].pos &&
                          1 == e.nodeType &&
                          e.contains(this.find[t].node) &&
                          (this.find[t].pos = this.currentPos);
                  },
                },
                {
                  key: "findAround",
                  value: function (e, t, n) {
                    if (e != t && this.find)
                      for (var r = 0; r < this.find.length; r++)
                        null == this.find[r].pos &&
                          1 == e.nodeType &&
                          e.contains(this.find[r].node) &&
                          t.compareDocumentPosition(this.find[r].node) &
                            (n ? 2 : 4) &&
                          (this.find[r].pos = this.currentPos);
                  },
                },
                {
                  key: "findInText",
                  value: function (e) {
                    if (this.find)
                      for (var t = 0; t < this.find.length; t++)
                        this.find[t].node == e &&
                          (this.find[t].pos =
                            this.currentPos -
                            (e.nodeValue.length - this.find[t].offset));
                  },
                },
                {
                  key: "matchesContext",
                  value: function (e) {
                    var t = this;
                    if (e.indexOf("|") > -1)
                      return e
                        .split(/\s*\|\s*/)
                        .some(this.matchesContext, this);
                    var n = e.split("/"),
                      r = this.options.context,
                      o = !(
                        this.isOpen ||
                        (r && r.parent.type != this.nodes[0].type)
                      ),
                      i = -(r ? r.depth + 1 : 0) + (o ? 0 : 1);
                    return (function e(s, a) {
                      for (; s >= 0; s--) {
                        var l = n[s];
                        if ("" == l) {
                          if (s == n.length - 1 || 0 == s) continue;
                          for (; a >= i; a--) if (e(s - 1, a)) return !0;
                          return !1;
                        }
                        var c =
                          a > 0 || (0 == a && o)
                            ? t.nodes[a].type
                            : r && a >= i
                            ? r.node(a - i).type
                            : null;
                        if (!c || (c.name != l && -1 == c.groups.indexOf(l)))
                          return !1;
                        a--;
                      }
                      return !0;
                    })(n.length - 1, this.open);
                  },
                },
                {
                  key: "textblockFromContext",
                  value: function () {
                    var e = this.options.context;
                    if (e)
                      for (var t = e.depth; t >= 0; t--) {
                        var n = e
                          .node(t)
                          .contentMatchAt(e.indexAfter(t)).defaultType;
                        if (n && n.isTextblock && n.defaultAttrs) return n;
                      }
                    for (var r in this.parser.schema.nodes) {
                      var o = this.parser.schema.nodes[r];
                      if (o.isTextblock && o.defaultAttrs) return o;
                    }
                  },
                },
                {
                  key: "addPendingMark",
                  value: function (e) {
                    var t = (function (e, t) {
                      for (var n = 0; n < t.length; n++)
                        if (e.eq(t[n])) return t[n];
                    })(e, this.top.pendingMarks);
                    t && this.top.stashMarks.push(t),
                      (this.top.pendingMarks = e.addToSet(
                        this.top.pendingMarks
                      ));
                  },
                },
                {
                  key: "removePendingMark",
                  value: function (e, t) {
                    for (var n = this.open; n >= 0; n--) {
                      var r = this.nodes[n];
                      if (r.pendingMarks.lastIndexOf(e) > -1)
                        r.pendingMarks = e.removeFromSet(r.pendingMarks);
                      else {
                        r.activeMarks = e.removeFromSet(r.activeMarks);
                        var o = r.popFromStashMark(e);
                        o &&
                          r.type &&
                          r.type.allowsMarkType(o.type) &&
                          (r.activeMarks = o.addToSet(r.activeMarks));
                      }
                      if (r == t) break;
                    }
                  },
                },
              ]),
              e
            );
          })();
        function we(e, t) {
          return (
            e.matches ||
            e.msMatchesSelector ||
            e.webkitMatchesSelector ||
            e.mozMatchesSelector
          ).call(e, t);
        }
        function be(e) {
          var t = {};
          for (var n in e) t[n] = e[n];
          return t;
        }
        function Se(e, t) {
          var n = t.schema.nodes,
            r = function (r) {
              var o = n[r];
              if (!o.allowsMarkType(e)) return "continue";
              var i = [];
              return (function e(n) {
                i.push(n);
                for (var r = 0; r < n.edgeCount; r++) {
                  var o = n.edge(r),
                    s = o.type,
                    a = o.next;
                  if (s == t) return !0;
                  if (i.indexOf(a) < 0 && e(a)) return !0;
                }
              })(o.contentMatch)
                ? { v: !0 }
                : void 0;
            };
          for (var o in n) {
            var i = r(o);
            if ("continue" !== i && "object" === g(i)) return i.v;
          }
        }
        var xe = (function () {
          function e(t, n) {
            p(this, e), (this.nodes = t), (this.marks = n);
          }
          return (
            v(
              e,
              [
                {
                  key: "serializeFragment",
                  value: function (e) {
                    var t = this,
                      n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {},
                      r = arguments.length > 2 ? arguments[2] : void 0;
                    r || (r = Oe(n).createDocumentFragment());
                    var o = r,
                      i = [];
                    return (
                      e.forEach(function (e) {
                        if (i.length || e.marks.length) {
                          for (
                            var r = 0, s = 0;
                            r < i.length && s < e.marks.length;

                          ) {
                            var a = e.marks[s];
                            if (t.marks[a.type.name]) {
                              if (!a.eq(i[r][0]) || !1 === a.type.spec.spanning)
                                break;
                              r++, s++;
                            } else s++;
                          }
                          for (; r < i.length; ) o = i.pop()[1];
                          for (; s < e.marks.length; ) {
                            var l = e.marks[s++],
                              c = t.serializeMark(l, e.isInline, n);
                            c &&
                              (i.push([l, o]),
                              o.appendChild(c.dom),
                              (o = c.contentDOM || c.dom));
                          }
                        }
                        o.appendChild(t.serializeNodeInner(e, n));
                      }),
                      r
                    );
                  },
                },
                {
                  key: "serializeNodeInner",
                  value: function (t, n) {
                    var r = e.renderSpec(Oe(n), this.nodes[t.type.name](t)),
                      o = r.dom,
                      i = r.contentDOM;
                    if (i) {
                      if (t.isLeaf)
                        throw new RangeError(
                          "Content hole not allowed in a leaf node spec"
                        );
                      this.serializeFragment(t.content, n, i);
                    }
                    return o;
                  },
                },
                {
                  key: "serializeNode",
                  value: function (e) {
                    for (
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                        n = this.serializeNodeInner(e, t),
                        r = e.marks.length - 1;
                      r >= 0;
                      r--
                    ) {
                      var o = this.serializeMark(e.marks[r], e.isInline, t);
                      o &&
                        ((o.contentDOM || o.dom).appendChild(n), (n = o.dom));
                    }
                    return n;
                  },
                },
                {
                  key: "serializeMark",
                  value: function (t, n) {
                    var r =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {},
                      o = this.marks[t.type.name];
                    return o && e.renderSpec(Oe(r), o(t, n));
                  },
                },
              ],
              [
                {
                  key: "renderSpec",
                  value: function (t, n) {
                    
                    var r =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : null;
                    if ("string" == typeof n)
                      return { dom: t.createTextNode(n) };
                    if (null != n.nodeType) return { dom: n };
                    if (n.dom && null != n.dom.nodeType) return n;
                    var o,
                      i = n[0],
                      s = i.indexOf(" ");
                    s > 0 && ((r = i.slice(0, s)), (i = i.slice(s + 1)));
                    var a = r ? t.createElementNS(r, i) : t.createElement(i),//aqui se crean los objetos
                      l = n[1],
                      c = 1;
                      // console.log(a,r,i);
                    if (
                      l &&
                      "object" == g(l) &&
                      null == l.nodeType &&
                      !Array.isArray(l)
                    )
                      for (var u in ((c = 2), l))
                        if (null != l[u]) {
                          var h = u.indexOf(" ");
                          h > 0
                            ? a.setAttributeNS(
                                u.slice(0, h),
                                u.slice(h + 1),
                                l[u]
                              )
                            : a.setAttribute(u, l[u]);
                        }
                    for (var f = c; f < n.length; f++) {
                      var d = n[f];
                      if (0 === d) {
                        if (f < n.length - 1 || f > c)
                          throw new RangeError(
                            "Content hole must be the only child of its parent node"
                          );
                        return { dom: a, contentDOM: a };
                      }
                      var p = e.renderSpec(t, d, r),
                        m = p.dom,
                        v = p.contentDOM;
                      if ((a.appendChild(m), v)) {
                        if (o) throw new RangeError("Multiple content holes");
                        o = v;
                      }
                    }
                    return { dom: a, contentDOM: o };
                  },
                },
                {
                  key: "fromSchema",
                  value: function (t) {
                    return (
                      t.cached.domSerializer ||
                      (t.cached.domSerializer = new e(
                        this.nodesFromSchema(t),
                        this.marksFromSchema(t)
                      ))
                    );
                  },
                },
                {
                  key: "nodesFromSchema",
                  value: function (e) {
                    var t = Me(e.nodes);
                    return (
                      t.text ||
                        (t.text = function (e) {
                          return e.text;
                        }),
                      t
                    );
                  },
                },
                {
                  key: "marksFromSchema",
                  value: function (e) {
                    return Me(e.marks);
                  },
                },
              ]
            ),
            e
          );
        })();
        function Me(e) {
          var t = {};
          for (var n in e) {
            var r = e[n].spec.toDOM;
            r && (t[n] = r);
          }
          return t;
        }
        function Oe(e) {
          return e.document || window.document;
        }
        (t.ContentMatch = G),
          (t.DOMParser = de),
          (t.DOMSerializer = xe),
          (t.Fragment = S),
          (t.Mark = C),
          (t.MarkType = ue),
          (t.Node = K),
          (t.NodeRange = _),
          (t.NodeType = le),
          (t.ReplaceError = N),
          (t.ResolvedPos = j),
          (t.Schema = he),
          (t.Slice = T);
      },
      190: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(443),
          o = ["p", 0],
          i = ["blockquote", 0],
          s = ["hr"],
          a = ["pre", ["code", 0]],
          l = ["br"],
          c = {
            doc: { content: "block+" },
            paragraph: {
              content: "inline*",
              group: "block",
              parseDOM: [{ tag: "p" },
              ],
              toDOM: function () {
                return o;
              },
            },
            span: {//se agrego para que el editor lograra interpretar los bloques de span ya que los eliminaba 
              inline: true,
              group: "inline",
              content: "inline",
              attrs: {
                id: { default:null},
                style: {default:null},
                },
                parseDOM: [
                  {
                    tag: "span",
                    getAttrs: function(dom) {
                      return{
                        id: dom.getAttribute("id"),
                        style: dom.getAttribute("style")
                      };
                    }
                  }
                ],
                toDOM: function(node){
                  let spn = node.attrs;
                  return ["span", {id: spn.id, style: spn.style}, 0]
                }
              },            
            blockquote: {
              content: "block+",
              group: "block",
              defining: !0,
              parseDOM: [{ tag: "blockquote" }],
              toDOM: function () {
                return i;
              },
            },
            horizontal_rule: {
              group: "block",
              parseDOM: [{ tag: "hr" }],
              toDOM: function () {
                return s;
              },
            },
            heading: {
              attrs: { level: { default: 1 } },
              content: "inline*",
              group: "block",
              defining: !0,
              parseDOM: [
                { tag: "h1", attrs: { level: 1 } },
                { tag: "h2", attrs: { level: 2 } },
                { tag: "h3", attrs: { level: 3 } },
                { tag: "h4", attrs: { level: 4 } },
                { tag: "h5", attrs: { level: 5 } },
                { tag: "h6", attrs: { level: 6 } },
              ],
              toDOM: function (e) {
                return ["h" + e.attrs.level, 0];
              },
            },
            code_block: {
              content: "text*",
              marks: "",
              group: "block",
              code: !0,
              defining: !0,
              parseDOM: [{ tag: "pre", preserveWhitespace: "full" }],
              toDOM: function () {
                return a;
              },
            },
            text: { group: "inline" },
            image: {
              inline: !0,
              attrs: {
                id: {default: null},
                src: {},
                alt: { default: null },
                title: { default: null },
              },
              group: "inline",
              draggable: !0,
              parseDOM: [
                {
                  tag: "img[src]",
                  getAttrs: function (e) {
                    return {  
                      id: e.getAttribute("id"),                    
                      src: e.getAttribute("src"),
                      title: e.getAttribute("title"),
                      alt: e.getAttribute("alt"),
                    };
                  },                  
                },
              ],
              toDOM: function (e) {
                var t = e.attrs;
                // console.log(t);
                return ["img", { id: t.id, src: t.src, alt: t.alt, title: t.title }];
              },
            },
            hard_break: {
              inline: !0,
              group: "inline",
              selectable: !1,
              parseDOM: [{ tag: "br" }],
              toDOM: function () {
                return l;
              },
            },
          },
          u = ["em", 0],
          h = ["strong", 0],
          f = ["code", 0],
          d = {
            link: {
              attrs: { href: {}, title: { default: null } },
              inclusive: !1,
              parseDOM: [
                {
                  tag: "a[href]",
                  getAttrs: function (e) {
                    return {
                      href: e.getAttribute("href"),
                      title: e.getAttribute("title"),
                    };
                  },
                },
              ],
              toDOM: function (e) {
                var t = e.attrs;
                return ["a", { href: t.href, title: t.title }, 0];
              },
            },
            em: {
              parseDOM: [
                { tag: "i" },
                { tag: "em" },
                { style: "font-style=italic" },
                {
                  style: "font-style=normal",
                  clearMark: function (e) {
                    return "em" == e.type.name;
                  },
                },
              ],
              toDOM: function () {
                return u;
              },
            },
            strong: {
              parseDOM: [
                { tag: "strong" },
                {
                  tag: "b",
                  getAttrs: function (e) {
                    return "normal" != e.style.fontWeight && null;
                  },
                },
                {
                  style: "font-weight=400",
                  clearMark: function (e) {
                    return "strong" == e.type.name;
                  },
                },
                {
                  style: "font-weight",
                  getAttrs: function (e) {
                    return /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null;
                  },
                },                
              ],
              toDOM: function () {
                return h;
              },
            },
            code: {
              parseDOM: [{ tag: "code" }],
              toDOM: function () {
                return f;
              },
            },
          },
          p = new r.Schema({ nodes: c, marks: d });
        (t.marks = d), (t.nodes = c), (t.schema = p);
      },
      32: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(843),
          o = n(443),
          i = n(391),
          s = ["ol", 0],
          a = ["ul", 0],
          l = ["li", 0],
          c = {
            attrs: { order: { default: 1 } },
            parseDOM: [
              {
                tag: "ol",
                getAttrs: function (e) {
                  return {
                    order: e.hasAttribute("start")
                      ? +e.getAttribute("start")
                      : 1,
                  };
                },
              },
            ],
            toDOM: function (e) {
              return 1 == e.attrs.order
                ? s
                : ["ol", { start: e.attrs.order }, 0];
            },
          },
          u = {
            parseDOM: [{ tag: "ul" }],
            toDOM: function () {
              return a;
            },
          },
          h = {
            parseDOM: [{ tag: "li" }],
            toDOM: function () {
              return l;
            },
            defining: !0,
          };
        function f(e, t) {
          var n = {};
          for (var r in e) n[r] = e[r];
          for (var o in t) n[o] = t[o];
          return n;
        }
        function d(e, t, n, i, s) {
          for (var a = o.Fragment.empty, l = n.length - 1; l >= 0; l--)
            a = o.Fragment.from(n[l].type.create(n[l].attrs, a));
          e.step(
            new r.ReplaceAroundStep(
              t.start - (i ? 2 : 0),
              t.end,
              t.start,
              t.end,
              new o.Slice(a, 0, 0),
              n.length,
              !0
            )
          );
          for (var c = 0, u = 0; u < n.length; u++)
            n[u].type == s && (c = u + 1);
          for (
            var h = n.length - c,
              f = t.start + n.length - (i ? 2 : 0),
              d = t.parent,
              p = t.startIndex,
              m = t.endIndex,
              v = !0;
            p < m;
            p++, v = !1
          )
            !v && r.canSplit(e.doc, f, h) && (e.split(f, h), (f += 2 * h)),
              (f += d.child(p).nodeSize);
          return e;
        }
        (t.addListNodes = function (e, t, n) {
          return e.append({
            ordered_list: f(c, { content: "list_item+", group: n }),
            bullet_list: f(u, { content: "list_item+", group: n }),
            list_item: f(h, { content: t }),
          });
        }),
          (t.bulletList = u),
          (t.liftListItem = function (e) {
            return function (t, n) {
              var i = t.selection,
                s = i.$from,
                a = i.$to,
                l = s.blockRange(a, function (t) {
                  return t.childCount > 0 && t.firstChild.type == e;
                });
              return (
                !!l &&
                (!n ||
                  (s.node(l.depth - 1).type == e
                    ? (function (e, t, n, i) {
                        var s = e.tr,
                          a = i.end,
                          l = i.$to.end(i.depth);
                        a < l &&
                          (s.step(
                            new r.ReplaceAroundStep(
                              a - 1,
                              l,
                              a,
                              l,
                              new o.Slice(
                                o.Fragment.from(
                                  n.create(null, i.parent.copy())
                                ),
                                1,
                                0
                              ),
                              1,
                              !0
                            )
                          ),
                          (i = new o.NodeRange(
                            s.doc.resolve(i.$from.pos),
                            s.doc.resolve(l),
                            i.depth
                          )));
                        var c = r.liftTarget(i);
                        if (null == c) return !1;
                        s.lift(i, c);
                        var u = s.mapping.map(a, -1) - 1;
                        return (
                          r.canJoin(s.doc, u) && s.join(u),
                          t(s.scrollIntoView()),
                          !0
                        );
                      })(t, n, e, l)
                    : (function (e, t, n) {
                        for (
                          var i = e.tr,
                            s = n.parent,
                            a = n.end,
                            l = n.endIndex - 1,
                            c = n.startIndex;
                          l > c;
                          l--
                        )
                          (a -= s.child(l).nodeSize), i.delete(a - 1, a + 1);
                        var u = i.doc.resolve(n.start),
                          h = u.nodeAfter;
                        if (
                          i.mapping.map(n.end) !=
                          n.start + u.nodeAfter.nodeSize
                        )
                          return !1;
                        var f = 0 == n.startIndex,
                          d = n.endIndex == s.childCount,
                          p = u.node(-1),
                          m = u.index(-1);
                        if (
                          !p.canReplace(
                            m + (f ? 0 : 1),
                            m + 1,
                            h.content.append(
                              d ? o.Fragment.empty : o.Fragment.from(s)
                            )
                          )
                        )
                          return !1;
                        var v = u.pos,
                          g = v + h.nodeSize;
                        return (
                          i.step(
                            new r.ReplaceAroundStep(
                              v - (f ? 1 : 0),
                              g + (d ? 1 : 0),
                              v + 1,
                              g - 1,
                              new o.Slice(
                                (f
                                  ? o.Fragment.empty
                                  : o.Fragment.from(s.copy(o.Fragment.empty))
                                ).append(
                                  d
                                    ? o.Fragment.empty
                                    : o.Fragment.from(s.copy(o.Fragment.empty))
                                ),
                                f ? 0 : 1,
                                d ? 0 : 1
                              ),
                              f ? 0 : 1
                            )
                          ),
                          t(i.scrollIntoView()),
                          !0
                        );
                      })(t, n, l)))
              );
            };
          }),
          (t.listItem = h),
          (t.orderedList = c),
          (t.sinkListItem = function (e) {
            return function (t, n) {
              var i = t.selection,
                s = i.$from,
                a = i.$to,
                l = s.blockRange(a, function (t) {
                  return t.childCount > 0 && t.firstChild.type == e;
                });
              if (!l) return !1;
              var c = l.startIndex;
              if (0 == c) return !1;
              var u = l.parent,
                h = u.child(c - 1);
              if (h.type != e) return !1;
              if (n) {
                var f = h.lastChild && h.lastChild.type == u.type,
                  d = o.Fragment.from(f ? e.create() : null),
                  p = new o.Slice(
                    o.Fragment.from(
                      e.create(null, o.Fragment.from(u.type.create(null, d)))
                    ),
                    f ? 3 : 1,
                    0
                  ),
                  m = l.start,
                  v = l.end;
                n(
                  t.tr
                    .step(
                      new r.ReplaceAroundStep(
                        m - (f ? 3 : 1),
                        v,
                        m,
                        v,
                        p,
                        1,
                        !0
                      )
                    )
                    .scrollIntoView()
                );
              }
              return !0;
            };
          }),
          (t.splitListItem = function (e) {
            return function (t, n) {
              var s = t.selection,
                a = s.$from,
                l = s.$to,
                c = s.node;
              if ((c && c.isBlock) || a.depth < 2 || !a.sameParent(l))
                return !1;
              var u = a.node(-1);
              if (u.type != e) return !1;
              if (
                0 == a.parent.content.size &&
                a.node(-1).childCount == a.indexAfter(-1)
              ) {
                if (
                  3 == a.depth ||
                  a.node(-3).type != e ||
                  a.index(-2) != a.node(-2).childCount - 1
                )
                  return !1;
                if (n) {
                  for (
                    var h = o.Fragment.empty,
                      f = a.index(-1) ? 1 : a.index(-2) ? 2 : 3,
                      d = a.depth - f;
                    d >= a.depth - 3;
                    d--
                  )
                    h = o.Fragment.from(a.node(d).copy(h));
                  var p =
                    a.indexAfter(-1) < a.node(-2).childCount
                      ? 1
                      : a.indexAfter(-2) < a.node(-3).childCount
                      ? 2
                      : 3;
                  h = h.append(o.Fragment.from(e.createAndFill()));
                  var m = a.before(a.depth - (f - 1)),
                    v = t.tr.replace(m, a.after(-p), new o.Slice(h, 4 - f, 0)),
                    g = -1;
                  v.doc.nodesBetween(m, v.doc.content.size, function (e, t) {
                    if (g > -1) return !1;
                    e.isTextblock && 0 == e.content.size && (g = t + 1);
                  }),
                    g > -1 &&
                      v.setSelection(i.Selection.near(v.doc.resolve(g))),
                    n(v.scrollIntoView());
                }
                return !0;
              }
              var y = l.pos == a.end() ? u.contentMatchAt(0).defaultType : null,
                k = t.tr.delete(a.pos, l.pos),
                w = y ? [null, { type: y }] : void 0;
              return (
                !!r.canSplit(k.doc, a.pos, 2, w) &&
                (n && n(k.split(a.pos, 2, w).scrollIntoView()), !0)
              );
            };
          }),
          (t.wrapInList = function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return function (n, i) {
              var s = n.selection,
                a = s.$from,
                l = s.$to,
                c = a.blockRange(l),
                u = !1,
                h = c;
              if (!c) return !1;
              if (
                c.depth >= 2 &&
                a.node(c.depth - 1).type.compatibleContent(e) &&
                0 == c.startIndex
              ) {
                if (0 == a.index(c.depth - 1)) return !1;
                var f = n.doc.resolve(c.start - 2);
                (h = new o.NodeRange(f, f, c.depth)),
                  c.endIndex < c.parent.childCount &&
                    (c = new o.NodeRange(
                      a,
                      n.doc.resolve(l.end(c.depth)),
                      c.depth
                    )),
                  (u = !0);
              }
              var p = r.findWrapping(h, e, t, c);
              return !!p && (i && i(d(n.tr, c, p, u, e).scrollIntoView()), !0);
            };
          });
      },
      391: (e, t, n) => {
        function r(e) {
          return (
            (r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            r(e)
          );
        }
        function o() {
          return (
            (o =
              "undefined" != typeof Reflect && Reflect.get
                ? Reflect.get
                : function (e, t, n) {
                    var r = i(e, t);
                    if (r) {
                      var o = Object.getOwnPropertyDescriptor(r, t);
                      return o.get
                        ? o.get.call(arguments.length < 3 ? e : n)
                        : o.value;
                    }
                  }),
            o.apply(this, arguments)
          );
        }
        function i(e, t) {
          for (
            ;
            !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = u(e));

          );
          return e;
        }
        function s(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            t && a(e, t);
        }
        function a(e, t) {
          return (
            (a =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e;
              }),
            a(e, t)
          );
        }
        function l(e) {
          var t = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch (e) {
              return !1;
            }
          })();
          return function () {
            var n,
              r = u(e);
            if (t) {
              var o = u(this).constructor;
              n = Reflect.construct(r, arguments, o);
            } else n = r.apply(this, arguments);
            return c(this, n);
          };
        }
        function c(e, t) {
          if (t && ("object" === r(t) || "function" == typeof t)) return t;
          if (void 0 !== t)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return (function (e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return e;
          })(e);
        }
        function u(e) {
          return (
            (u = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            u(e)
          );
        }
        function h(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function f(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function d(e, t, n) {
          return (
            t && f(e.prototype, t),
            n && f(e, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var p = n(443),
          m = n(843),
          v = Object.create(null),
          g = (function () {
            function e(t, n, r) {
              h(this, e),
                (this.$anchor = t),
                (this.$head = n),
                (this.ranges = r || [new y(t.min(n), t.max(n))]);
            }
            return (
              d(
                e,
                [
                  {
                    key: "anchor",
                    get: function () {
                      return this.$anchor.pos;
                    },
                  },
                  {
                    key: "head",
                    get: function () {
                      return this.$head.pos;
                    },
                  },
                  {
                    key: "from",
                    get: function () {
                      return this.$from.pos;
                    },
                  },
                  {
                    key: "to",
                    get: function () {
                      return this.$to.pos;
                    },
                  },
                  {
                    key: "$from",
                    get: function () {
                      return this.ranges[0].$from;
                    },
                  },
                  {
                    key: "$to",
                    get: function () {
                      return this.ranges[0].$to;
                    },
                  },
                  {
                    key: "empty",
                    get: function () {
                      for (var e = this.ranges, t = 0; t < e.length; t++)
                        if (e[t].$from.pos != e[t].$to.pos) return !1;
                      return !0;
                    },
                  },
                  {
                    key: "content",
                    value: function () {
                      return this.$from.doc.slice(this.from, this.to, !0);
                    },
                  },
                  {
                    key: "replace",
                    value: function (e) {
                      for (
                        var t =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : p.Slice.empty,
                          n = t.content.lastChild,
                          r = null,
                          o = 0;
                        o < t.openEnd;
                        o++
                      )
                        (r = n), (n = n.lastChild);
                      for (
                        var i = e.steps.length, s = this.ranges, a = 0;
                        a < s.length;
                        a++
                      ) {
                        var l = s[a],
                          c = l.$from,
                          u = l.$to,
                          h = e.mapping.slice(i);
                        e.replaceRange(
                          h.map(c.pos),
                          h.map(u.pos),
                          a ? p.Slice.empty : t
                        ),
                          0 == a &&
                            T(
                              e,
                              i,
                              (n ? n.isInline : r && r.isTextblock) ? -1 : 1
                            );
                      }
                    },
                  },
                  {
                    key: "replaceWith",
                    value: function (e, t) {
                      for (
                        var n = e.steps.length, r = this.ranges, o = 0;
                        o < r.length;
                        o++
                      ) {
                        var i = r[o],
                          s = i.$from,
                          a = i.$to,
                          l = e.mapping.slice(n),
                          c = l.map(s.pos),
                          u = l.map(a.pos);
                        o
                          ? e.deleteRange(c, u)
                          : (e.replaceRangeWith(c, u, t),
                            T(e, n, t.isInline ? -1 : 1));
                      }
                    },
                  },
                  {
                    key: "getBookmark",
                    value: function () {
                      return b.between(this.$anchor, this.$head).getBookmark();
                    },
                  },
                ],
                [
                  {
                    key: "findFrom",
                    value: function (e, t) {
                      var n =
                          arguments.length > 2 &&
                          void 0 !== arguments[2] &&
                          arguments[2],
                        r = e.parent.inlineContent
                          ? new b(e)
                          : N(e.node(0), e.parent, e.pos, e.index(), t, n);
                      if (r) return r;
                      for (var o = e.depth - 1; o >= 0; o--) {
                        var i =
                          t < 0
                            ? N(
                                e.node(0),
                                e.node(o),
                                e.before(o + 1),
                                e.index(o),
                                t,
                                n
                              )
                            : N(
                                e.node(0),
                                e.node(o),
                                e.after(o + 1),
                                e.index(o) + 1,
                                t,
                                n
                              );
                        if (i) return i;
                      }
                      return null;
                    },
                  },
                  {
                    key: "near",
                    value: function (e) {
                      var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : 1;
                      return (
                        this.findFrom(e, t) ||
                        this.findFrom(e, -t) ||
                        new O(e.node(0))
                      );
                    },
                  },
                  {
                    key: "atStart",
                    value: function (e) {
                      return N(e, e, 0, 0, 1) || new O(e);
                    },
                  },
                  {
                    key: "atEnd",
                    value: function (e) {
                      return (
                        N(e, e, e.content.size, e.childCount, -1) || new O(e)
                      );
                    },
                  },
                  {
                    key: "fromJSON",
                    value: function (e, t) {
                      if (!t || !t.type)
                        throw new RangeError(
                          "Invalid input for Selection.fromJSON"
                        );
                      var n = v[t.type];
                      if (!n)
                        throw new RangeError(
                          "No selection type ".concat(t.type, " defined")
                        );
                      return n.fromJSON(e, t);
                    },
                  },
                  {
                    key: "jsonID",
                    value: function (e, t) {
                      if (e in v)
                        throw new RangeError(
                          "Duplicate use of selection JSON ID " + e
                        );
                      return (v[e] = t), (t.prototype.jsonID = e), t;
                    },
                  },
                ]
              ),
              e
            );
          })();
        g.prototype.visible = !0;
        var y = d(function e(t, n) {
            h(this, e), (this.$from = t), (this.$to = n);
          }),
          k = !1;
        function w(e) {
          k ||
            e.parent.inlineContent ||
            ((k = !0),
            console.warn(
              "TextSelection endpoint not pointing into a node with inline content (" +
                e.parent.type.name +
                ")"
            ));
        }
        var b = (function (e) {
          s(n, e);
          var t = l(n);
          function n(e) {
            var r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : e;
            return h(this, n), w(e), w(r), t.call(this, e, r);
          }
          return (
            d(
              n,
              [
                {
                  key: "$cursor",
                  get: function () {
                    return this.$anchor.pos == this.$head.pos
                      ? this.$head
                      : null;
                  },
                },
                {
                  key: "map",
                  value: function (e, t) {
                    var r = e.resolve(t.map(this.head));
                    if (!r.parent.inlineContent) return g.near(r);
                    var o = e.resolve(t.map(this.anchor));
                    return new n(o.parent.inlineContent ? o : r, r);
                  },
                },
                {
                  key: "replace",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : p.Slice.empty;
                    if (
                      (o(u(n.prototype), "replace", this).call(this, e, t),
                      t == p.Slice.empty)
                    ) {
                      var r = this.$from.marksAcross(this.$to);
                      r && e.ensureMarks(r);
                    }
                  },
                },
                {
                  key: "eq",
                  value: function (e) {
                    return (
                      e instanceof n &&
                      e.anchor == this.anchor &&
                      e.head == this.head
                    );
                  },
                },
                {
                  key: "getBookmark",
                  value: function () {
                    return new S(this.anchor, this.head);
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    return {
                      type: "text",
                      anchor: this.anchor,
                      head: this.head,
                    };
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (e, t) {
                    if (
                      "number" != typeof t.anchor ||
                      "number" != typeof t.head
                    )
                      throw new RangeError(
                        "Invalid input for TextSelection.fromJSON"
                      );
                    return new n(e.resolve(t.anchor), e.resolve(t.head));
                  },
                },
                {
                  key: "create",
                  value: function (e, t) {
                    var n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : t,
                      r = e.resolve(t);
                    return new this(r, n == t ? r : e.resolve(n));
                  },
                },
                {
                  key: "between",
                  value: function (e, t, r) {
                    var o = e.pos - t.pos;
                    if (
                      ((r && !o) || (r = o >= 0 ? 1 : -1),
                      !t.parent.inlineContent)
                    ) {
                      var i = g.findFrom(t, r, !0) || g.findFrom(t, -r, !0);
                      if (!i) return g.near(t, r);
                      t = i.$head;
                    }
                    return (
                      e.parent.inlineContent ||
                        ((0 == o ||
                          (e = (g.findFrom(e, -r, !0) || g.findFrom(e, r, !0))
                            .$anchor).pos <
                            t.pos !=
                            o < 0) &&
                          (e = t)),
                      new n(e, t)
                    );
                  },
                },
              ]
            ),
            n
          );
        })(g);
        g.jsonID("text", b);
        var S = (function () {
            function e(t, n) {
              h(this, e), (this.anchor = t), (this.head = n);
            }
            return (
              d(e, [
                {
                  key: "map",
                  value: function (t) {
                    return new e(t.map(this.anchor), t.map(this.head));
                  },
                },
                {
                  key: "resolve",
                  value: function (e) {
                    return b.between(
                      e.resolve(this.anchor),
                      e.resolve(this.head)
                    );
                  },
                },
              ]),
              e
            );
          })(),
          x = (function (e) {
            s(n, e);
            var t = l(n);
            function n(e) {
              var r;
              h(this, n);
              var o = e.nodeAfter,
                i = e.node(0).resolve(e.pos + o.nodeSize);
              return ((r = t.call(this, e, i)).node = o), r;
            }
            return (
              d(
                n,
                [
                  {
                    key: "map",
                    value: function (e, t) {
                      var r = t.mapResult(this.anchor),
                        o = r.deleted,
                        i = r.pos,
                        s = e.resolve(i);
                      return o ? g.near(s) : new n(s);
                    },
                  },
                  {
                    key: "content",
                    value: function () {
                      return new p.Slice(p.Fragment.from(this.node), 0, 0);
                    },
                  },
                  {
                    key: "eq",
                    value: function (e) {
                      return e instanceof n && e.anchor == this.anchor;
                    },
                  },
                  {
                    key: "toJSON",
                    value: function () {
                      return { type: "node", anchor: this.anchor };
                    },
                  },
                  {
                    key: "getBookmark",
                    value: function () {
                      return new M(this.anchor);
                    },
                  },
                ],
                [
                  {
                    key: "fromJSON",
                    value: function (e, t) {
                      if ("number" != typeof t.anchor)
                        throw new RangeError(
                          "Invalid input for NodeSelection.fromJSON"
                        );
                      return new n(e.resolve(t.anchor));
                    },
                  },
                  {
                    key: "create",
                    value: function (e, t) {
                      return new n(e.resolve(t));
                    },
                  },
                  {
                    key: "isSelectable",
                    value: function (e) {
                      return !e.isText && !1 !== e.type.spec.selectable;
                    },
                  },
                ]
              ),
              n
            );
          })(g);
        (x.prototype.visible = !1), g.jsonID("node", x);
        var M = (function () {
            function e(t) {
              h(this, e), (this.anchor = t);
            }
            return (
              d(e, [
                {
                  key: "map",
                  value: function (t) {
                    var n = t.mapResult(this.anchor),
                      r = n.deleted,
                      o = n.pos;
                    return r ? new S(o, o) : new e(o);
                  },
                },
                {
                  key: "resolve",
                  value: function (e) {
                    var t = e.resolve(this.anchor),
                      n = t.nodeAfter;
                    return n && x.isSelectable(n) ? new x(t) : g.near(t);
                  },
                },
              ]),
              e
            );
          })(),
          O = (function (e) {
            s(n, e);
            var t = l(n);
            function n(e) {
              return (
                h(this, n),
                t.call(this, e.resolve(0), e.resolve(e.content.size))
              );
            }
            return (
              d(
                n,
                [
                  {
                    key: "replace",
                    value: function (e) {
                      var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : p.Slice.empty;
                      if (t == p.Slice.empty) {
                        e.delete(0, e.doc.content.size);
                        var r = g.atStart(e.doc);
                        r.eq(e.selection) || e.setSelection(r);
                      } else
                        o(u(n.prototype), "replace", this).call(this, e, t);
                    },
                  },
                  {
                    key: "toJSON",
                    value: function () {
                      return { type: "all" };
                    },
                  },
                  {
                    key: "map",
                    value: function (e) {
                      return new n(e);
                    },
                  },
                  {
                    key: "eq",
                    value: function (e) {
                      return e instanceof n;
                    },
                  },
                  {
                    key: "getBookmark",
                    value: function () {
                      return C;
                    },
                  },
                ],
                [
                  {
                    key: "fromJSON",
                    value: function (e) {
                      return new n(e);
                    },
                  },
                ]
              ),
              n
            );
          })(g);
        g.jsonID("all", O);
        var C = {
          map: function () {
            return this;
          },
          resolve: function (e) {
            return new O(e);
          },
        };
        function N(e, t, n, r, o) {
          var i =
            arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
          if (t.inlineContent) return b.create(e, n);
          for (
            var s = r - (o > 0 ? 0 : 1);
            o > 0 ? s < t.childCount : s >= 0;
            s += o
          ) {
            var a = t.child(s);
            if (a.isAtom) {
              if (!i && x.isSelectable(a))
                return x.create(e, n - (o < 0 ? a.nodeSize : 0));
            } else {
              var l = N(e, a, n + o, o < 0 ? a.childCount : 0, o, i);
              if (l) return l;
            }
            n += a.nodeSize * o;
          }
          return null;
        }
        function T(e, t, n) {
          var r = e.steps.length - 1;
          if (!(r < t)) {
            var o,
              i = e.steps[r];
            (i instanceof m.ReplaceStep || i instanceof m.ReplaceAroundStep) &&
              (e.mapping.maps[r].forEach(function (e, t, n, r) {
                null == o && (o = r);
              }),
              e.setSelection(g.near(e.doc.resolve(o), n)));
          }
        }
        var D = (function (e) {
          s(n, e);
          var t = l(n);
          function n(e) {
            var r;
            return (
              h(this, n),
              ((r = t.call(this, e.doc)).curSelectionFor = 0),
              (r.updated = 0),
              (r.meta = Object.create(null)),
              (r.time = Date.now()),
              (r.curSelection = e.selection),
              (r.storedMarks = e.storedMarks),
              r
            );
          }
          return (
            d(n, [
              {
                key: "selection",
                get: function () {
                  return (
                    this.curSelectionFor < this.steps.length &&
                      ((this.curSelection = this.curSelection.map(
                        this.doc,
                        this.mapping.slice(this.curSelectionFor)
                      )),
                      (this.curSelectionFor = this.steps.length)),
                    this.curSelection
                  );
                },
              },
              {
                key: "setSelection",
                value: function (e) {
                  if (e.$from.doc != this.doc)
                    throw new RangeError(
                      "Selection passed to setSelection must point at the current document"
                    );
                  return (
                    (this.curSelection = e),
                    (this.curSelectionFor = this.steps.length),
                    (this.updated = -3 & (1 | this.updated)),
                    (this.storedMarks = null),
                    this
                  );
                },
              },
              {
                key: "selectionSet",
                get: function () {
                  return (1 & this.updated) > 0;
                },
              },
              {
                key: "setStoredMarks",
                value: function (e) {
                  return (this.storedMarks = e), (this.updated |= 2), this;
                },
              },
              {
                key: "ensureMarks",
                value: function (e) {
                  return (
                    p.Mark.sameSet(
                      this.storedMarks || this.selection.$from.marks(),
                      e
                    ) || this.setStoredMarks(e),
                    this
                  );
                },
              },
              {
                key: "addStoredMark",
                value: function (e) {
                  return this.ensureMarks(
                    e.addToSet(this.storedMarks || this.selection.$head.marks())
                  );
                },
              },
              {
                key: "removeStoredMark",
                value: function (e) {
                  return this.ensureMarks(
                    e.removeFromSet(
                      this.storedMarks || this.selection.$head.marks()
                    )
                  );
                },
              },
              {
                key: "storedMarksSet",
                get: function () {
                  return (2 & this.updated) > 0;
                },
              },
              {
                key: "addStep",
                value: function (e, t) {
                  o(u(n.prototype), "addStep", this).call(this, e, t),
                    (this.updated = -3 & this.updated),
                    (this.storedMarks = null);
                },
              },
              {
                key: "setTime",
                value: function (e) {
                  return (this.time = e), this;
                },
              },
              {
                key: "replaceSelection",
                value: function (e) {
                  return this.selection.replace(this, e), this;
                },
              },
              {
                key: "replaceSelectionWith",
                value: function (e) {
                  var t =
                      !(arguments.length > 1 && void 0 !== arguments[1]) ||
                      arguments[1],
                    n = this.selection;
                  return (
                    t &&
                      (e = e.mark(
                        this.storedMarks ||
                          (n.empty
                            ? n.$from.marks()
                            : n.$from.marksAcross(n.$to) || p.Mark.none)
                      )),
                    n.replaceWith(this, e),
                    this
                  );
                },
              },
              {
                key: "deleteSelection",
                value: function () {
                  return this.selection.replace(this), this;
                },
              },
              {
                key: "insertText",
                value: function (e, t, n) {
                  
                  var r = this.doc.type.schema;
                  if (null == t)
                    return e
                      ? this.replaceSelectionWith(r.text(e), !0)
                      : this.deleteSelection();
                  if ((null == n && (n = t), (n = null == n ? t : n), !e))
                    return this.deleteRange(t, n);
                  var o = this.storedMarks;
                  if (!o) {
                    var i = this.doc.resolve(t);
                    o = n == t ? i.marks() : i.marksAcross(this.doc.resolve(n));
                  }
                  return (
                    this.replaceRangeWith(t, n, r.text(e, o)),
                    this.selection.empty ||
                      this.setSelection(g.near(this.selection.$to)),
                    this
                  );
                },
              },
              {
                key: "setMeta",
                value: function (e, t) {
                  return (
                    (this.meta["string" == typeof e ? e : e.key] = t), this
                  );
                },
              },
              {
                key: "getMeta",
                value: function (e) {
                  return this.meta["string" == typeof e ? e : e.key];
                },
              },
              {
                key: "isGeneric",
                get: function () {
                  for (var e in this.meta) return !1;
                  return !0;
                },
              },
              {
                key: "scrollIntoView",
                value: function () {
                  return (this.updated |= 4), this;
                },
              },
              {
                key: "scrolledIntoView",
                get: function () {
                  return (4 & this.updated) > 0;
                },
              },
            ]),
            n
          );
        })(m.Transform);
        function E(e, t) {
          return t && e ? e.bind(t) : e;
        }
        var A = d(function e(t, n, r) {
            h(this, e),
              (this.name = t),
              (this.init = E(n.init, r)),
              (this.apply = E(n.apply, r));
          }),
          R = [
            new A("doc", {
              init: function (e) {
                return e.doc || e.schema.topNodeType.createAndFill();
              },
              apply: function (e) {
                return e.doc;
              },
            }),
            new A("selection", {
              init: function (e, t) {
                return e.selection || g.atStart(t.doc);
              },
              apply: function (e) {
                return e.selection;
              },
            }),
            new A("storedMarks", {
              init: function (e) {
                return e.storedMarks || null;
              },
              apply: function (e, t, n, r) {
                return r.selection.$cursor ? e.storedMarks : null;
              },
            }),
            new A("scrollToSelection", {
              init: function () {
                return 0;
              },
              apply: function (e, t) {
                return e.scrolledIntoView ? t + 1 : t;
              },
            }),
          ],
          P = d(function e(t, n) {
            var r = this;
            h(this, e),
              (this.schema = t),
              (this.plugins = []),
              (this.pluginsByKey = Object.create(null)),
              (this.fields = R.slice()),
              n &&
                n.forEach(function (e) {
                  if (r.pluginsByKey[e.key])
                    throw new RangeError(
                      "Adding different instances of a keyed plugin (" +
                        e.key +
                        ")"
                    );
                  r.plugins.push(e),
                    (r.pluginsByKey[e.key] = e),
                    e.spec.state &&
                      r.fields.push(new A(e.key, e.spec.state, e));
                });
          }),
          I = (function () {
            function e(t) {
              h(this, e), (this.config = t);
            }
            return (
              d(
                e,
                [
                  {
                    key: "schema",
                    get: function () {
                      return this.config.schema;
                    },
                  },
                  {
                    key: "plugins",
                    get: function () {
                      return this.config.plugins;
                    },
                  },
                  {
                    key: "apply",
                    value: function (e) {
                      return this.applyTransaction(e).state;
                    },
                  },
                  {
                    key: "filterTransaction",
                    value: function (e) {
                      for (
                        var t =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : -1,
                          n = 0;
                        n < this.config.plugins.length;
                        n++
                      )
                        if (n != t) {
                          var r = this.config.plugins[n];
                          if (
                            r.spec.filterTransaction &&
                            !r.spec.filterTransaction.call(r, e, this)
                          )
                            return !1;
                        }
                      return !0;
                    },
                  },
                  {
                    key: "applyTransaction",
                    value: function (e) {
                      if (!this.filterTransaction(e))
                        return { state: this, transactions: [] };
                      for (var t = [e], n = this.applyInner(e), r = null; ; ) {
                        for (
                          var o = !1, i = 0;
                          i < this.config.plugins.length;
                          i++
                        ) {
                          var s = this.config.plugins[i];
                          if (s.spec.appendTransaction) {
                            var a = r ? r[i].n : 0,
                              l = r ? r[i].state : this,
                              c =
                                a < t.length &&
                                s.spec.appendTransaction.call(
                                  s,
                                  a ? t.slice(a) : t,
                                  l,
                                  n
                                );
                            if (c && n.filterTransaction(c, i)) {
                              if ((c.setMeta("appendedTransaction", e), !r)) {
                                r = [];
                                for (
                                  var u = 0;
                                  u < this.config.plugins.length;
                                  u++
                                )
                                  r.push(
                                    u < i
                                      ? { state: n, n: t.length }
                                      : { state: this, n: 0 }
                                  );
                              }
                              t.push(c), (n = n.applyInner(c)), (o = !0);
                            }
                            r && (r[i] = { state: n, n: t.length });
                          }
                        }
                        if (!o) return { state: n, transactions: t };
                      }
                    },
                  },
                  {
                    key: "applyInner",
                    value: function (t) {
                      if (!t.before.eq(this.doc))
                        throw new RangeError(
                          "Applying a mismatched transaction"
                        );
                      for (
                        var n = new e(this.config),
                          r = this.config.fields,
                          o = 0;
                        o < r.length;
                        o++
                      ) {
                        var i = r[o];
                        n[i.name] = i.apply(t, this[i.name], this, n);
                      }
                      return n;
                    },
                  },
                  {
                    key: "tr",
                    get: function () {
                      return new D(this);
                    },
                  },
                  {
                    key: "reconfigure",
                    value: function (t) {
                      for (
                        var n = new P(this.schema, t.plugins),
                          r = n.fields,
                          o = new e(n),
                          i = 0;
                        i < r.length;
                        i++
                      ) {
                        var s = r[i].name;
                        o[s] = this.hasOwnProperty(s)
                          ? this[s]
                          : r[i].init(t, o);
                      }
                      return o;
                    },
                  },
                  {
                    key: "toJSON",
                    value: function (e) {
                      var t = {
                        doc: this.doc.toJSON(),
                        selection: this.selection.toJSON(),
                      };
                      if (
                        (this.storedMarks &&
                          (t.storedMarks = this.storedMarks.map(function (e) {
                            return e.toJSON();
                          })),
                        e && "object" == r(e))
                      )
                        for (var n in e) {
                          if ("doc" == n || "selection" == n)
                            throw new RangeError(
                              "The JSON fields `doc` and `selection` are reserved"
                            );
                          var o = e[n],
                            i = o.spec.state;
                          i &&
                            i.toJSON &&
                            (t[n] = i.toJSON.call(o, this[o.key]));
                        }
                      return t;
                    },
                  },
                ],
                [
                  {
                    key: "create",
                    value: function (t) {
                      for (
                        var n = new P(
                            t.doc ? t.doc.type.schema : t.schema,
                            t.plugins
                          ),
                          r = new e(n),
                          o = 0;
                        o < n.fields.length;
                        o++
                      )
                        r[n.fields[o].name] = n.fields[o].init(t, r);
                      return r;
                    },
                  },
                  {
                    key: "fromJSON",
                    value: function (t, n, r) {
                      if (!n)
                        throw new RangeError(
                          "Invalid input for EditorState.fromJSON"
                        );
                      if (!t.schema)
                        throw new RangeError(
                          "Required config field 'schema' missing"
                        );
                      var o = new P(t.schema, t.plugins),
                        i = new e(o);
                      return (
                        o.fields.forEach(function (e) {
                          if ("doc" == e.name)
                            i.doc = p.Node.fromJSON(t.schema, n.doc);
                          else if ("selection" == e.name)
                            i.selection = g.fromJSON(i.doc, n.selection);
                          else if ("storedMarks" == e.name)
                            n.storedMarks &&
                              (i.storedMarks = n.storedMarks.map(
                                t.schema.markFromJSON
                              ));
                          else {
                            if (r)
                              for (var o in r) {
                                var s = r[o],
                                  a = s.spec.state;
                                if (
                                  s.key == e.name &&
                                  a &&
                                  a.fromJSON &&
                                  Object.prototype.hasOwnProperty.call(n, o)
                                )
                                  return void (i[e.name] = a.fromJSON.call(
                                    s,
                                    t,
                                    n[o],
                                    i
                                  ));
                              }
                            i[e.name] = e.init(t, i);
                          }
                        }),
                        i
                      );
                    },
                  },
                ]
              ),
              e
            );
          })();
        function z(e, t, n) {
          for (var r in e) {
            var o = e[r];
            o instanceof Function
              ? (o = o.bind(t))
              : "handleDOMEvents" == r && (o = z(o, t, {})),
              (n[r] = o);
          }
          return n;
        }
        var F = (function () {
            function e(t) {
              h(this, e),
                (this.spec = t),
                (this.props = {}),
                t.props && z(t.props, this, this.props),
                (this.key = t.key ? t.key.key : $("plugin"));
            }
            return (
              d(e, [
                {
                  key: "getState",
                  value: function (e) {
                    return e[this.key];
                  },
                },
              ]),
              e
            );
          })(),
          B = Object.create(null);
        function $(e) {
          return e in B ? e + "$" + ++B[e] : ((B[e] = 0), e + "$");
        }
        var V = (function () {
          function e() {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "key";
            h(this, e), (this.key = $(t));
          }
          return (
            d(e, [
              {
                key: "get",
                value: function (e) {
                  return e.config.pluginsByKey[this.key];
                },
              },
              {
                key: "getState",
                value: function (e) {
                  return e[this.key];
                },
              },
            ]),
            e
          );
        })();
        (t.AllSelection = O),
          (t.EditorState = I),
          (t.NodeSelection = x),
          (t.Plugin = F),
          (t.PluginKey = V),
          (t.Selection = g),
          (t.SelectionRange = y),
          (t.TextSelection = b),
          (t.Transaction = D);
      },
      843: (e, t, n) => {
        function r(e) {
          return (
            (r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            r(e)
          );
        }
        function o(e) {
          var t = "function" == typeof Map ? new Map() : void 0;
          return (
            (o = function (e) {
              if (
                null === e ||
                ((n = e),
                -1 === Function.toString.call(n).indexOf("[native code]"))
              )
                return e;
              var n;
              if ("function" != typeof e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, r);
              }
              function r() {
                return i(e, arguments, h(this).constructor);
              }
              return (
                (r.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: r,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                a(r, e)
              );
            }),
            o(e)
          );
        }
        function i(e, t, n) {
          return (
            (i = u()
              ? Reflect.construct
              : function (e, t, n) {
                  var r = [null];
                  r.push.apply(r, t);
                  var o = new (Function.bind.apply(e, r))();
                  return n && a(o, n.prototype), o;
                }),
            i.apply(null, arguments)
          );
        }
        function s(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            t && a(e, t);
        }
        function a(e, t) {
          return (
            (a =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e;
              }),
            a(e, t)
          );
        }
        function l(e) {
          var t = u();
          return function () {
            var n,
              r = h(e);
            if (t) {
              var o = h(this).constructor;
              n = Reflect.construct(r, arguments, o);
            } else n = r.apply(this, arguments);
            return c(this, n);
          };
        }
        function c(e, t) {
          if (t && ("object" === r(t) || "function" == typeof t)) return t;
          if (void 0 !== t)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return (function (e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return e;
          })(e);
        }
        function u() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        }
        function h(e) {
          return (
            (h = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            h(e)
          );
        }
        function f(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function d(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function p(e, t, n) {
          return (
            t && d(e.prototype, t),
            n && d(e, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var m = n(443),
          v = Math.pow(2, 16);
        function g(e) {
          return 65535 & e;
        }
        var y = (function () {
            function e(t, n, r) {
              f(this, e),
                (this.pos = t),
                (this.delInfo = n),
                (this.recover = r);
            }
            return (
              p(e, [
                {
                  key: "deleted",
                  get: function () {
                    return (8 & this.delInfo) > 0;
                  },
                },
                {
                  key: "deletedBefore",
                  get: function () {
                    return (5 & this.delInfo) > 0;
                  },
                },
                {
                  key: "deletedAfter",
                  get: function () {
                    return (6 & this.delInfo) > 0;
                  },
                },
                {
                  key: "deletedAcross",
                  get: function () {
                    return (4 & this.delInfo) > 0;
                  },
                },
              ]),
              e
            );
          })(),
          k = (function () {
            function e(t) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              if (
                (f(this, e),
                (this.ranges = t),
                (this.inverted = n),
                !t.length && e.empty)
              )
                return e.empty;
            }
            return (
              p(
                e,
                [
                  {
                    key: "recover",
                    value: function (e) {
                      var t = 0,
                        n = g(e);
                      if (!this.inverted)
                        for (var r = 0; r < n; r++)
                          t += this.ranges[3 * r + 2] - this.ranges[3 * r + 1];
                      return (
                        this.ranges[3 * n] +
                        t +
                        (function (e) {
                          return (e - (65535 & e)) / v;
                        })(e)
                      );
                    },
                  },
                  {
                    key: "mapResult",
                    value: function (e) {
                      var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : 1;
                      return this._map(e, t, !1);
                    },
                  },
                  {
                    key: "map",
                    value: function (e) {
                      var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : 1;
                      return this._map(e, t, !0);
                    },
                  },
                  {
                    key: "_map",
                    value: function (e, t, n) {
                      for (
                        var r = 0,
                          o = this.inverted ? 2 : 1,
                          i = this.inverted ? 1 : 2,
                          s = 0;
                        s < this.ranges.length;
                        s += 3
                      ) {
                        var a = this.ranges[s] - (this.inverted ? r : 0);
                        if (a > e) break;
                        var l = this.ranges[s + o],
                          c = this.ranges[s + i],
                          u = a + l;
                        if (e <= u) {
                          var h =
                            a +
                            r +
                            ((l ? (e == a ? -1 : e == u ? 1 : t) : t) < 0
                              ? 0
                              : c);
                          if (n) return h;
                          var f = e == a ? 2 : e == u ? 1 : 4;
                          return (
                            (t < 0 ? e != a : e != u) && (f |= 8),
                            new y(
                              h,
                              f,
                              e == (t < 0 ? a : u) ? null : s / 3 + (e - a) * v
                            )
                          );
                        }
                        r += c - l;
                      }
                      return n ? e + r : new y(e + r, 0, null);
                    },
                  },
                  {
                    key: "touches",
                    value: function (e, t) {
                      for (
                        var n = 0,
                          r = g(t),
                          o = this.inverted ? 2 : 1,
                          i = this.inverted ? 1 : 2,
                          s = 0;
                        s < this.ranges.length;
                        s += 3
                      ) {
                        var a = this.ranges[s] - (this.inverted ? n : 0);
                        if (a > e) break;
                        var l = this.ranges[s + o];
                        if (e <= a + l && s == 3 * r) return !0;
                        n += this.ranges[s + i] - l;
                      }
                      return !1;
                    },
                  },
                  {
                    key: "forEach",
                    value: function (e) {
                      for (
                        var t = this.inverted ? 2 : 1,
                          n = this.inverted ? 1 : 2,
                          r = 0,
                          o = 0;
                        r < this.ranges.length;
                        r += 3
                      ) {
                        var i = this.ranges[r],
                          s = i - (this.inverted ? o : 0),
                          a = i + (this.inverted ? 0 : o),
                          l = this.ranges[r + t],
                          c = this.ranges[r + n];
                        e(s, s + l, a, a + c), (o += c - l);
                      }
                    },
                  },
                  {
                    key: "invert",
                    value: function () {
                      return new e(this.ranges, !this.inverted);
                    },
                  },
                  {
                    key: "toString",
                    value: function () {
                      return (
                        (this.inverted ? "-" : "") + JSON.stringify(this.ranges)
                      );
                    },
                  },
                ],
                [
                  {
                    key: "offset",
                    value: function (t) {
                      return 0 == t
                        ? e.empty
                        : new e(t < 0 ? [0, -t, 0] : [0, 0, t]);
                    },
                  },
                ]
              ),
              e
            );
          })();
        k.empty = new k([]);
        var w = (function () {
            function e() {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : [],
                n = arguments.length > 1 ? arguments[1] : void 0,
                r =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 0,
                o =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : t.length;
              f(this, e),
                (this.maps = t),
                (this.mirror = n),
                (this.from = r),
                (this.to = o);
            }
            return (
              p(e, [
                {
                  key: "slice",
                  value: function () {
                    var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 0,
                      n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : this.maps.length;
                    return new e(this.maps, this.mirror, t, n);
                  },
                },
                {
                  key: "copy",
                  value: function () {
                    return new e(
                      this.maps.slice(),
                      this.mirror && this.mirror.slice(),
                      this.from,
                      this.to
                    );
                  },
                },
                {
                  key: "appendMap",
                  value: function (e, t) {
                    (this.to = this.maps.push(e)),
                      null != t && this.setMirror(this.maps.length - 1, t);
                  },
                },
                {
                  key: "appendMapping",
                  value: function (e) {
                    for (
                      var t = 0, n = this.maps.length;
                      t < e.maps.length;
                      t++
                    ) {
                      var r = e.getMirror(t);
                      this.appendMap(
                        e.maps[t],
                        null != r && r < t ? n + r : void 0
                      );
                    }
                  },
                },
                {
                  key: "getMirror",
                  value: function (e) {
                    if (this.mirror)
                      for (var t = 0; t < this.mirror.length; t++)
                        if (this.mirror[t] == e)
                          return this.mirror[t + (t % 2 ? -1 : 1)];
                  },
                },
                {
                  key: "setMirror",
                  value: function (e, t) {
                    this.mirror || (this.mirror = []), this.mirror.push(e, t);
                  },
                },
                {
                  key: "appendMappingInverted",
                  value: function (e) {
                    for (
                      var t = e.maps.length - 1,
                        n = this.maps.length + e.maps.length;
                      t >= 0;
                      t--
                    ) {
                      var r = e.getMirror(t);
                      this.appendMap(
                        e.maps[t].invert(),
                        null != r && r > t ? n - r - 1 : void 0
                      );
                    }
                  },
                },
                {
                  key: "invert",
                  value: function () {
                    var t = new e();
                    return t.appendMappingInverted(this), t;
                  },
                },
                {
                  key: "map",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 1;
                    if (this.mirror) return this._map(e, t, !0);
                    for (var n = this.from; n < this.to; n++)
                      e = this.maps[n].map(e, t);
                    return e;
                  },
                },
                {
                  key: "mapResult",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 1;
                    return this._map(e, t, !1);
                  },
                },
                {
                  key: "_map",
                  value: function (e, t, n) {
                    for (var r = 0, o = this.from; o < this.to; o++) {
                      var i = this.maps[o].mapResult(e, t);
                      if (null != i.recover) {
                        var s = this.getMirror(o);
                        if (null != s && s > o && s < this.to) {
                          (o = s), (e = this.maps[s].recover(i.recover));
                          continue;
                        }
                      }
                      (r |= i.delInfo), (e = i.pos);
                    }
                    return n ? e : new y(e, r, null);
                  },
                },
              ]),
              e
            );
          })(),
          b = Object.create(null),
          S = (function () {
            function e() {
              f(this, e);
            }
            return (
              p(
                e,
                [
                  {
                    key: "getMap",
                    value: function () {
                      return k.empty;
                    },
                  },
                  {
                    key: "merge",
                    value: function (e) {
                      return null;
                    },
                  },
                ],
                [
                  {
                    key: "fromJSON",
                    value: function (e, t) {
                      if (!t || !t.stepType)
                        throw new RangeError("Invalid input for Step.fromJSON");
                      var n = b[t.stepType];
                      if (!n)
                        throw new RangeError(
                          "No step type ".concat(t.stepType, " defined")
                        );
                      return n.fromJSON(e, t);
                    },
                  },
                  {
                    key: "jsonID",
                    value: function (e, t) {
                      if (e in b)
                        throw new RangeError(
                          "Duplicate use of step JSON ID " + e
                        );
                      return (b[e] = t), (t.prototype.jsonID = e), t;
                    },
                  },
                ]
              ),
              e
            );
          })(),
          x = (function () {
            function e(t, n) {
              f(this, e), (this.doc = t), (this.failed = n);
            }
            return (
              p(e, null, [
                {
                  key: "ok",
                  value: function (t) {
                    return new e(t, null);
                  },
                },
                {
                  key: "fail",
                  value: function (t) {
                    return new e(null, t);
                  },
                },
                {
                  key: "fromReplace",
                  value: function (t, n, r, o) {
                    try {
                      return e.ok(t.replace(n, r, o));
                    } catch (t) {
                      if (t instanceof m.ReplaceError) return e.fail(t.message);
                      throw t;
                    }
                  },
                },
              ]),
              e
            );
          })();
        function M(e, t, n) {
          for (var r = [], o = 0; o < e.childCount; o++) {
            var i = e.child(o);
            i.content.size && (i = i.copy(M(i.content, t, i))),
              i.isInline && (i = t(i, n, o)),
              r.push(i);
          }
          return m.Fragment.fromArray(r);
        }
        var O = (function (e) {
          s(n, e);
          var t = l(n);
          function n(e, r, o) {
            var i;
            return (
              f(this, n),
              ((i = t.call(this)).from = e),
              (i.to = r),
              (i.mark = o),
              i
            );
          }
          return (
            p(
              n,
              [
                {
                  key: "apply",
                  value: function (e) {
                    var t = this,
                      n = e.slice(this.from, this.to),
                      r = e.resolve(this.from),
                      o = r.node(r.sharedDepth(this.to)),
                      i = new m.Slice(
                        M(
                          n.content,
                          function (e, n) {
                            return e.isAtom &&
                              n.type.allowsMarkType(t.mark.type)
                              ? e.mark(t.mark.addToSet(e.marks))
                              : e;
                          },
                          o
                        ),
                        n.openStart,
                        n.openEnd
                      );
                    return x.fromReplace(e, this.from, this.to, i);
                  },
                },
                {
                  key: "invert",
                  value: function () {
                    return new C(this.from, this.to, this.mark);
                  },
                },
                {
                  key: "map",
                  value: function (e) {
                    var t = e.mapResult(this.from, 1),
                      r = e.mapResult(this.to, -1);
                    return (t.deleted && r.deleted) || t.pos >= r.pos
                      ? null
                      : new n(t.pos, r.pos, this.mark);
                  },
                },
                {
                  key: "merge",
                  value: function (e) {
                    return e instanceof n &&
                      e.mark.eq(this.mark) &&
                      this.from <= e.to &&
                      this.to >= e.from
                      ? new n(
                          Math.min(this.from, e.from),
                          Math.max(this.to, e.to),
                          this.mark
                        )
                      : null;
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    return {
                      stepType: "addMark",
                      mark: this.mark.toJSON(),
                      from: this.from,
                      to: this.to,
                    };
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (e, t) {
                    if ("number" != typeof t.from || "number" != typeof t.to)
                      throw new RangeError(
                        "Invalid input for AddMarkStep.fromJSON"
                      );
                    return new n(t.from, t.to, e.markFromJSON(t.mark));
                  },
                },
              ]
            ),
            n
          );
        })(S);
        S.jsonID("addMark", O);
        var C = (function (e) {
          s(n, e);
          var t = l(n);
          function n(e, r, o) {
            var i;
            return (
              f(this, n),
              ((i = t.call(this)).from = e),
              (i.to = r),
              (i.mark = o),
              i
            );
          }
          return (
            p(
              n,
              [
                {
                  key: "apply",
                  value: function (e) {
                    var t = this,
                      n = e.slice(this.from, this.to),
                      r = new m.Slice(
                        M(
                          n.content,
                          function (e) {
                            return e.mark(t.mark.removeFromSet(e.marks));
                          },
                          e
                        ),
                        n.openStart,
                        n.openEnd
                      );
                    return x.fromReplace(e, this.from, this.to, r);
                  },
                },
                {
                  key: "invert",
                  value: function () {
                    return new O(this.from, this.to, this.mark);
                  },
                },
                {
                  key: "map",
                  value: function (e) {
                    var t = e.mapResult(this.from, 1),
                      r = e.mapResult(this.to, -1);
                    return (t.deleted && r.deleted) || t.pos >= r.pos
                      ? null
                      : new n(t.pos, r.pos, this.mark);
                  },
                },
                {
                  key: "merge",
                  value: function (e) {
                    return e instanceof n &&
                      e.mark.eq(this.mark) &&
                      this.from <= e.to &&
                      this.to >= e.from
                      ? new n(
                          Math.min(this.from, e.from),
                          Math.max(this.to, e.to),
                          this.mark
                        )
                      : null;
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    return {
                      stepType: "removeMark",
                      mark: this.mark.toJSON(),
                      from: this.from,
                      to: this.to,
                    };
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (e, t) {
                    if ("number" != typeof t.from || "number" != typeof t.to)
                      throw new RangeError(
                        "Invalid input for RemoveMarkStep.fromJSON"
                      );
                    return new n(t.from, t.to, e.markFromJSON(t.mark));
                  },
                },
              ]
            ),
            n
          );
        })(S);
        S.jsonID("removeMark", C);
        var N = (function (e) {
          s(n, e);
          var t = l(n);
          function n(e, r) {
            var o;
            return f(this, n), ((o = t.call(this)).pos = e), (o.mark = r), o;
          }
          return (
            p(
              n,
              [
                {
                  key: "apply",
                  value: function (e) {
                    var t = e.nodeAt(this.pos);
                    if (!t) return x.fail("No node at mark step's position");
                    var n = t.type.create(
                      t.attrs,
                      null,
                      this.mark.addToSet(t.marks)
                    );
                    return x.fromReplace(
                      e,
                      this.pos,
                      this.pos + 1,
                      new m.Slice(m.Fragment.from(n), 0, t.isLeaf ? 0 : 1)
                    );
                  },
                },
                {
                  key: "invert",
                  value: function (e) {
                    var t = e.nodeAt(this.pos);
                    if (t) {
                      var r = this.mark.addToSet(t.marks);
                      if (r.length == t.marks.length) {
                        for (var o = 0; o < t.marks.length; o++)
                          if (!t.marks[o].isInSet(r))
                            return new n(this.pos, t.marks[o]);
                        return new n(this.pos, this.mark);
                      }
                    }
                    return new T(this.pos, this.mark);
                  },
                },
                {
                  key: "map",
                  value: function (e) {
                    var t = e.mapResult(this.pos, 1);
                    return t.deletedAfter ? null : new n(t.pos, this.mark);
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    return {
                      stepType: "addNodeMark",
                      pos: this.pos,
                      mark: this.mark.toJSON(),
                    };
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (e, t) {
                    if ("number" != typeof t.pos)
                      throw new RangeError(
                        "Invalid input for AddNodeMarkStep.fromJSON"
                      );
                    return new n(t.pos, e.markFromJSON(t.mark));
                  },
                },
              ]
            ),
            n
          );
        })(S);
        S.jsonID("addNodeMark", N);
        var T = (function (e) {
          s(n, e);
          var t = l(n);
          function n(e, r) {
            var o;
            return f(this, n), ((o = t.call(this)).pos = e), (o.mark = r), o;
          }
          return (
            p(
              n,
              [
                {
                  key: "apply",
                  value: function (e) {
                    var t = e.nodeAt(this.pos);
                    if (!t) return x.fail("No node at mark step's position");
                    var n = t.type.create(
                      t.attrs,
                      null,
                      this.mark.removeFromSet(t.marks)
                    );
                    return x.fromReplace(
                      e,
                      this.pos,
                      this.pos + 1,
                      new m.Slice(m.Fragment.from(n), 0, t.isLeaf ? 0 : 1)
                    );
                  },
                },
                {
                  key: "invert",
                  value: function (e) {
                    var t = e.nodeAt(this.pos);
                    return t && this.mark.isInSet(t.marks)
                      ? new N(this.pos, this.mark)
                      : this;
                  },
                },
                {
                  key: "map",
                  value: function (e) {
                    var t = e.mapResult(this.pos, 1);
                    return t.deletedAfter ? null : new n(t.pos, this.mark);
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    return {
                      stepType: "removeNodeMark",
                      pos: this.pos,
                      mark: this.mark.toJSON(),
                    };
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (e, t) {
                    if ("number" != typeof t.pos)
                      throw new RangeError(
                        "Invalid input for RemoveNodeMarkStep.fromJSON"
                      );
                    return new n(t.pos, e.markFromJSON(t.mark));
                  },
                },
              ]
            ),
            n
          );
        })(S);
        S.jsonID("removeNodeMark", T);
        var D = (function (e) {
          s(n, e);
          var t = l(n);
          function n(e, r, o) {
            var i,
              s =
                arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            return (
              f(this, n),
              ((i = t.call(this)).from = e),
              (i.to = r),
              (i.slice = o),
              (i.structure = s),
              i
            );
          }
          return (
            p(
              n,
              [
                {
                  key: "apply",
                  value: function (e) {
                    return this.structure && A(e, this.from, this.to)
                      ? x.fail("Structure replace would overwrite content")
                      : x.fromReplace(e, this.from, this.to, this.slice);
                  },
                },
                {
                  key: "getMap",
                  value: function () {
                    return new k([
                      this.from,
                      this.to - this.from,
                      this.slice.size,
                    ]);
                  },
                },
                {
                  key: "invert",
                  value: function (e) {
                    return new n(
                      this.from,
                      this.from + this.slice.size,
                      e.slice(this.from, this.to)
                    );
                  },
                },
                {
                  key: "map",
                  value: function (e) {
                    var t = e.mapResult(this.from, 1),
                      r = e.mapResult(this.to, -1);
                    return t.deletedAcross && r.deletedAcross
                      ? null
                      : new n(t.pos, Math.max(t.pos, r.pos), this.slice);
                  },
                },
                {
                  key: "merge",
                  value: function (e) {
                    if (!(e instanceof n) || e.structure || this.structure)
                      return null;
                    if (
                      this.from + this.slice.size != e.from ||
                      this.slice.openEnd ||
                      e.slice.openStart
                    ) {
                      if (
                        e.to != this.from ||
                        this.slice.openStart ||
                        e.slice.openEnd
                      )
                        return null;
                      var t =
                        this.slice.size + e.slice.size == 0
                          ? m.Slice.empty
                          : new m.Slice(
                              e.slice.content.append(this.slice.content),
                              e.slice.openStart,
                              this.slice.openEnd
                            );
                      return new n(e.from, this.to, t, this.structure);
                    }
                    var r =
                      this.slice.size + e.slice.size == 0
                        ? m.Slice.empty
                        : new m.Slice(
                            this.slice.content.append(e.slice.content),
                            this.slice.openStart,
                            e.slice.openEnd
                          );
                    return new n(
                      this.from,
                      this.to + (e.to - e.from),
                      r,
                      this.structure
                    );
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    var e = {
                      stepType: "replace",
                      from: this.from,
                      to: this.to,
                    };
                    return (
                      this.slice.size && (e.slice = this.slice.toJSON()),
                      this.structure && (e.structure = !0),
                      e
                    );
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (e, t) {
                    if ("number" != typeof t.from || "number" != typeof t.to)
                      throw new RangeError(
                        "Invalid input for ReplaceStep.fromJSON"
                      );
                    return new n(
                      t.from,
                      t.to,
                      m.Slice.fromJSON(e, t.slice),
                      !!t.structure
                    );
                  },
                },
              ]
            ),
            n
          );
        })(S);
        S.jsonID("replace", D);
        var E = (function (e) {
          s(n, e);
          var t = l(n);
          function n(e, r, o, i, s, a) {
            var l,
              c =
                arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
            return (
              f(this, n),
              ((l = t.call(this)).from = e),
              (l.to = r),
              (l.gapFrom = o),
              (l.gapTo = i),
              (l.slice = s),
              (l.insert = a),
              (l.structure = c),
              l
            );
          }
          return (
            p(
              n,
              [
                {
                  key: "apply",
                  value: function (e) {
                    if (
                      this.structure &&
                      (A(e, this.from, this.gapFrom) ||
                        A(e, this.gapTo, this.to))
                    )
                      return x.fail(
                        "Structure gap-replace would overwrite content"
                      );
                    var t = e.slice(this.gapFrom, this.gapTo);
                    if (t.openStart || t.openEnd)
                      return x.fail("Gap is not a flat range");
                    var n = this.slice.insertAt(this.insert, t.content);
                    return n
                      ? x.fromReplace(e, this.from, this.to, n)
                      : x.fail("Content does not fit in gap");
                  },
                },
                {
                  key: "getMap",
                  value: function () {
                    return new k([
                      this.from,
                      this.gapFrom - this.from,
                      this.insert,
                      this.gapTo,
                      this.to - this.gapTo,
                      this.slice.size - this.insert,
                    ]);
                  },
                },
                {
                  key: "invert",
                  value: function (e) {
                    var t = this.gapTo - this.gapFrom;
                    return new n(
                      this.from,
                      this.from + this.slice.size + t,
                      this.from + this.insert,
                      this.from + this.insert + t,
                      e
                        .slice(this.from, this.to)
                        .removeBetween(
                          this.gapFrom - this.from,
                          this.gapTo - this.from
                        ),
                      this.gapFrom - this.from,
                      this.structure
                    );
                  },
                },
                {
                  key: "map",
                  value: function (e) {
                    var t = e.mapResult(this.from, 1),
                      r = e.mapResult(this.to, -1),
                      o = e.map(this.gapFrom, -1),
                      i = e.map(this.gapTo, 1);
                    return (t.deletedAcross && r.deletedAcross) ||
                      o < t.pos ||
                      i > r.pos
                      ? null
                      : new n(
                          t.pos,
                          r.pos,
                          o,
                          i,
                          this.slice,
                          this.insert,
                          this.structure
                        );
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    var e = {
                      stepType: "replaceAround",
                      from: this.from,
                      to: this.to,
                      gapFrom: this.gapFrom,
                      gapTo: this.gapTo,
                      insert: this.insert,
                    };
                    return (
                      this.slice.size && (e.slice = this.slice.toJSON()),
                      this.structure && (e.structure = !0),
                      e
                    );
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (e, t) {
                    if (
                      "number" != typeof t.from ||
                      "number" != typeof t.to ||
                      "number" != typeof t.gapFrom ||
                      "number" != typeof t.gapTo ||
                      "number" != typeof t.insert
                    )
                      throw new RangeError(
                        "Invalid input for ReplaceAroundStep.fromJSON"
                      );
                    return new n(
                      t.from,
                      t.to,
                      t.gapFrom,
                      t.gapTo,
                      m.Slice.fromJSON(e, t.slice),
                      t.insert,
                      !!t.structure
                    );
                  },
                },
              ]
            ),
            n
          );
        })(S);
        function A(e, t, n) {
          for (
            var r = e.resolve(t), o = n - t, i = r.depth;
            o > 0 && i > 0 && r.indexAfter(i) == r.node(i).childCount;

          )
            i--, o--;
          if (o > 0)
            for (var s = r.node(i).maybeChild(r.indexAfter(i)); o > 0; ) {
              if (!s || s.isLeaf) return !0;
              (s = s.firstChild), o--;
            }
          return !1;
        }
        function R(e, t, n) {
          return (
            (0 == t || e.canReplace(t, e.childCount)) &&
            (n == e.childCount || e.canReplace(0, n))
          );
        }
        function P(e) {
          return { type: e, attrs: null };
        }
        function I(e, t) {
          var n = e.parent,
            r = e.startIndex,
            o = e.endIndex,
            i = n.contentMatchAt(r).findWrapping(t);
          if (!i) return null;
          var s = i.length ? i[0] : t;
          return n.canReplaceWith(r, o, s) ? i : null;
        }
        function z(e, t) {
          var n = e.parent,
            r = e.startIndex,
            o = e.endIndex,
            i = n.child(r),
            s = t.contentMatch.findWrapping(i.type);
          if (!s) return null;
          for (
            var a = (s.length ? s[s.length - 1] : t).contentMatch, l = r;
            a && l < o;
            l++
          )
            a = a.matchType(n.child(l).type);
          return a && a.validEnd ? s : null;
        }
        function F(e, t, n, r, o) {
          if (!r.isTextblock)
            throw new RangeError(
              "Type given to setBlockType should be a textblock"
            );
          var i = e.steps.length;
          e.doc.nodesBetween(t, n, function (t, n) {
            if (
              t.isTextblock &&
              !t.hasMarkup(r, o) &&
              (function (e, t, n) {
                var r = e.resolve(t),
                  o = r.index();
                return r.parent.canReplaceWith(o, o + 1, n);
              })(e.doc, e.mapping.slice(i).map(n), r)
            ) {
              e.clearIncompatible(e.mapping.slice(i).map(n, 1), r);
              var s = e.mapping.slice(i),
                a = s.map(n, 1),
                l = s.map(n + t.nodeSize, 1);
              return (
                e.step(
                  new E(
                    a,
                    l,
                    a + 1,
                    l - 1,
                    new m.Slice(
                      m.Fragment.from(r.create(o, null, t.marks)),
                      0,
                      0
                    ),
                    1,
                    !0
                  )
                ),
                !1
              );
            }
          });
        }
        function B(e, t, n, r, o) {
          var i = e.doc.nodeAt(t);
          if (!i) throw new RangeError("No node at given position");
          n || (n = i.type);
          var s = n.create(r, null, o || i.marks);
          if (i.isLeaf) return e.replaceWith(t, t + i.nodeSize, s);
          if (!n.validContent(i.content))
            throw new RangeError("Invalid content for node type " + n.name);
          e.step(
            new E(
              t,
              t + i.nodeSize,
              t + 1,
              t + i.nodeSize - 1,
              new m.Slice(m.Fragment.from(s), 0, 0),
              1,
              !0
            )
          );
        }
        function $(e, t) {
          for (
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 1,
              r = arguments.length > 3 ? arguments[3] : void 0,
              o = e.doc.resolve(t),
              i = m.Fragment.empty,
              s = m.Fragment.empty,
              a = o.depth,
              l = o.depth - n,
              c = n - 1;
            a > l;
            a--, c--
          ) {
            i = m.Fragment.from(o.node(a).copy(i));
            var u = r && r[c];
            s = m.Fragment.from(
              u ? u.type.create(u.attrs, s) : o.node(a).copy(s)
            );
          }
          e.step(new D(t, t, new m.Slice(i.append(s), n, n), !0));
        }
        function V(e, t) {
          return !(!e || !t || e.isLeaf || !e.canAppend(t));
        }
        function j(e, t, n) {
          var r = new D(t - n, t + n, m.Slice.empty, !0);
          e.step(r);
        }
        function q(e, t, n) {
          var r = e.resolve(t);
          if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
          if (0 == r.parentOffset)
            for (var o = r.depth - 1; o >= 0; o--) {
              var i = r.index(o);
              if (r.node(o).canReplaceWith(i, i, n)) return r.before(o + 1);
              if (i > 0) return null;
            }
          if (r.parentOffset == r.parent.content.size)
            for (var s = r.depth - 1; s >= 0; s--) {
              var a = r.indexAfter(s);
              if (r.node(s).canReplaceWith(a, a, n)) return r.after(s + 1);
              if (a < r.node(s).childCount) return null;
            }
          return null;
        }
        function L(e, t) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : t,
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : m.Slice.empty;
          if (t == n && !r.size) return null;
          var o = e.resolve(t),
            i = e.resolve(n);
          return J(o, i, r) ? new D(t, n, r) : new _(o, i, r).fit();
        }
        function J(e, t, n) {
          return (
            !n.openStart &&
            !n.openEnd &&
            e.start() == t.start() &&
            e.parent.canReplace(e.index(), t.index(), n.content)
          );
        }
        S.jsonID("replaceAround", E);
        var _ = (function () {
          function e(t, n, r) {
            f(this, e),
              (this.$from = t),
              (this.$to = n),
              (this.unplaced = r),
              (this.frontier = []),
              (this.placed = m.Fragment.empty);
            for (var o = 0; o <= t.depth; o++) {
              var i = t.node(o);
              this.frontier.push({
                type: i.type,
                match: i.contentMatchAt(t.indexAfter(o)),
              });
            }
            for (var s = t.depth; s > 0; s--)
              this.placed = m.Fragment.from(t.node(s).copy(this.placed));
          }
          return (
            p(e, [
              {
                key: "depth",
                get: function () {
                  return this.frontier.length - 1;
                },
              },
              {
                key: "fit",
                value: function () {
                  for (; this.unplaced.size; ) {
                    var e = this.findFittable();
                    e ? this.placeNodes(e) : this.openMore() || this.dropNode();
                  }
                  var t = this.mustMoveInline(),
                    n = this.placed.size - this.depth - this.$from.depth,
                    r = this.$from,
                    o = this.close(t < 0 ? this.$to : r.doc.resolve(t));
                  if (!o) return null;
                  for (
                    var i = this.placed, s = r.depth, a = o.depth;
                    s && a && 1 == i.childCount;

                  )
                    (i = i.firstChild.content), s--, a--;
                  var l = new m.Slice(i, s, a);
                  return t > -1
                    ? new E(r.pos, t, this.$to.pos, this.$to.end(), l, n)
                    : l.size || r.pos != this.$to.pos
                    ? new D(r.pos, o.pos, l)
                    : null;
                },
              },
              {
                key: "findFittable",
                value: function () {
                  for (
                    var e = this.unplaced.openStart,
                      t = this.unplaced.content,
                      n = 0,
                      r = this.unplaced.openEnd;
                    n < e;
                    n++
                  ) {
                    var o = t.firstChild;
                    if (
                      (t.childCount > 1 && (r = 0),
                      o.type.spec.isolating && r <= n)
                    ) {
                      e = n;
                      break;
                    }
                    t = o.content;
                  }
                  for (var i = 1; i <= 2; i++)
                    for (
                      var s = 1 == i ? e : this.unplaced.openStart;
                      s >= 0;
                      s--
                    )
                      for (
                        var a = null,
                          l = (
                            s
                              ? (a = H(this.unplaced.content, s - 1).firstChild)
                                  .content
                              : this.unplaced.content
                          ).firstChild,
                          c = this.depth;
                        c >= 0;
                        c--
                      ) {
                        var u = this.frontier[c],
                          h = u.type,
                          f = u.match,
                          d = void 0,
                          p = null;
                        if (
                          1 == i &&
                          (l
                            ? f.matchType(l.type) ||
                              (p = f.fillBefore(m.Fragment.from(l), !1))
                            : a && h.compatibleContent(a.type))
                        )
                          return {
                            sliceDepth: s,
                            frontierDepth: c,
                            parent: a,
                            inject: p,
                          };
                        if (2 == i && l && (d = f.findWrapping(l.type)))
                          return {
                            sliceDepth: s,
                            frontierDepth: c,
                            parent: a,
                            wrap: d,
                          };
                        if (a && f.matchType(a.type)) break;
                      }
                },
              },
              {
                key: "openMore",
                value: function () {
                  var e = this.unplaced,
                    t = e.content,
                    n = e.openStart,
                    r = e.openEnd,
                    o = H(t, n);
                  return !(
                    !o.childCount ||
                    o.firstChild.isLeaf ||
                    ((this.unplaced = new m.Slice(
                      t,
                      n + 1,
                      Math.max(r, o.size + n >= t.size - r ? n + 1 : 0)
                    )),
                    0)
                  );
                },
              },
              {
                key: "dropNode",
                value: function () {
                  var e = this.unplaced,
                    t = e.content,
                    n = e.openStart,
                    r = e.openEnd,
                    o = H(t, n);
                  if (o.childCount <= 1 && n > 0) {
                    var i = t.size - n <= n + o.size;
                    this.unplaced = new m.Slice(
                      W(t, n - 1, 1),
                      n - 1,
                      i ? n - 1 : r
                    );
                  } else this.unplaced = new m.Slice(W(t, n, 1), n, r);
                },
              },
              {
                key: "placeNodes",
                value: function (e) {
                  for (
                    var t = e.sliceDepth,
                      n = e.frontierDepth,
                      r = e.parent,
                      o = e.inject,
                      i = e.wrap;
                    this.depth > n;

                  )
                    this.closeFrontierNode();
                  if (i)
                    for (var s = 0; s < i.length; s++)
                      this.openFrontierNode(i[s]);
                  var a = this.unplaced,
                    l = r ? r.content : a.content,
                    c = a.openStart - t,
                    u = 0,
                    h = [],
                    f = this.frontier[n],
                    d = f.match,
                    p = f.type;
                  if (o) {
                    for (s = 0; s < o.childCount; s++) h.push(o.child(s));
                    d = d.matchFragment(o);
                  }
                  for (
                    var v = l.size + t - (a.content.size - a.openEnd);
                    u < l.childCount;

                  ) {
                    var g = l.child(u),
                      y = d.matchType(g.type);
                    if (!y) break;
                    (++u > 1 || 0 == c || g.content.size) &&
                      ((d = y),
                      h.push(
                        U(
                          g.mark(p.allowedMarks(g.marks)),
                          1 == u ? c : 0,
                          u == l.childCount ? v : -1
                        )
                      ));
                  }
                  var k = u == l.childCount;
                  k || (v = -1),
                    (this.placed = K(this.placed, n, m.Fragment.from(h))),
                    (this.frontier[n].match = d),
                    k &&
                      v < 0 &&
                      r &&
                      r.type == this.frontier[this.depth].type &&
                      this.frontier.length > 1 &&
                      this.closeFrontierNode();
                  for (var w = 0, b = l; w < v; w++) {
                    var S = b.lastChild;
                    this.frontier.push({
                      type: S.type,
                      match: S.contentMatchAt(S.childCount),
                    }),
                      (b = S.content);
                  }
                  this.unplaced = k
                    ? 0 == t
                      ? m.Slice.empty
                      : new m.Slice(
                          W(a.content, t - 1, 1),
                          t - 1,
                          v < 0 ? a.openEnd : t - 1
                        )
                    : new m.Slice(W(a.content, t, u), a.openStart, a.openEnd);
                },
              },
              {
                key: "mustMoveInline",
                value: function () {
                  if (!this.$to.parent.isTextblock) return -1;
                  var e,
                    t = this.frontier[this.depth];
                  if (
                    !t.type.isTextblock ||
                    !G(this.$to, this.$to.depth, t.type, t.match, !1) ||
                    (this.$to.depth == this.depth &&
                      (e = this.findCloseLevel(this.$to)) &&
                      e.depth == this.depth)
                  )
                    return -1;
                  for (
                    var n = this.$to.depth, r = this.$to.after(n);
                    n > 1 && r == this.$to.end(--n);

                  )
                    ++r;
                  return r;
                },
              },
              {
                key: "findCloseLevel",
                value: function (e) {
                  e: for (var t = Math.min(this.depth, e.depth); t >= 0; t--) {
                    var n = this.frontier[t],
                      r = n.match,
                      o = n.type,
                      i =
                        t < e.depth &&
                        e.end(t + 1) == e.pos + (e.depth - (t + 1)),
                      s = G(e, t, o, r, i);
                    if (s) {
                      for (var a = t - 1; a >= 0; a--) {
                        var l = this.frontier[a],
                          c = l.match,
                          u = G(e, a, l.type, c, !0);
                        if (!u || u.childCount) continue e;
                      }
                      return {
                        depth: t,
                        fit: s,
                        move: i ? e.doc.resolve(e.after(t + 1)) : e,
                      };
                    }
                  }
                },
              },
              {
                key: "close",
                value: function (e) {
                  var t = this.findCloseLevel(e);
                  if (!t) return null;
                  for (; this.depth > t.depth; ) this.closeFrontierNode();
                  t.fit.childCount &&
                    (this.placed = K(this.placed, t.depth, t.fit)),
                    (e = t.move);
                  for (var n = t.depth + 1; n <= e.depth; n++) {
                    var r = e.node(n),
                      o = r.type.contentMatch.fillBefore(
                        r.content,
                        !0,
                        e.index(n)
                      );
                    this.openFrontierNode(r.type, r.attrs, o);
                  }
                  return e;
                },
              },
              {
                key: "openFrontierNode",
                value: function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : null,
                    n = arguments.length > 2 ? arguments[2] : void 0,
                    r = this.frontier[this.depth];
                  (r.match = r.match.matchType(e)),
                    (this.placed = K(
                      this.placed,
                      this.depth,
                      m.Fragment.from(e.create(t, n))
                    )),
                    this.frontier.push({ type: e, match: e.contentMatch });
                },
              },
              {
                key: "closeFrontierNode",
                value: function () {
                  var e = this.frontier
                    .pop()
                    .match.fillBefore(m.Fragment.empty, !0);
                  e.childCount &&
                    (this.placed = K(this.placed, this.frontier.length, e));
                },
              },
            ]),
            e
          );
        })();
        function W(e, t, n) {
          return 0 == t
            ? e.cutByIndex(n, e.childCount)
            : e.replaceChild(
                0,
                e.firstChild.copy(W(e.firstChild.content, t - 1, n))
              );
        }
        function K(e, t, n) {
          return 0 == t
            ? e.append(n)
            : e.replaceChild(
                e.childCount - 1,
                e.lastChild.copy(K(e.lastChild.content, t - 1, n))
              );
        }
        function H(e, t) {
          for (var n = 0; n < t; n++) e = e.firstChild.content;
          return e;
        }
        function U(e, t, n) {
          if (t <= 0) return e;
          var r = e.content;
          return (
            t > 1 &&
              (r = r.replaceChild(
                0,
                U(r.firstChild, t - 1, 1 == r.childCount ? n - 1 : 0)
              )),
            t > 0 &&
              ((r = e.type.contentMatch.fillBefore(r).append(r)),
              n <= 0 &&
                (r = r.append(
                  e.type.contentMatch
                    .matchFragment(r)
                    .fillBefore(m.Fragment.empty, !0)
                ))),
            e.copy(r)
          );
        }
        function G(e, t, n, r, o) {
          var i = e.node(t),
            s = o ? e.indexAfter(t) : e.index(t);
          if (s == i.childCount && !n.compatibleContent(i.type)) return null;
          var a = r.fillBefore(i.content, !0, s);
          return a &&
            !(function (e, t, n) {
              for (var r = n; r < t.childCount; r++)
                if (!e.allowsMarks(t.child(r).marks)) return !0;
              return !1;
            })(n, i.content, s)
            ? a
            : null;
        }
        function Z(e) {
          return e.spec.defining || e.spec.definingForContent;
        }
        function X(e, t, n, r, o) {
          if (t < n) {
            var i = e.firstChild;
            e = e.replaceChild(0, i.copy(X(i.content, t + 1, n, r, i)));
          }
          if (t > r) {
            var s = o.contentMatchAt(0),
              a = s.fillBefore(e).append(e);
            e = a.append(s.matchFragment(a).fillBefore(m.Fragment.empty, !0));
          }
          return e;
        }
        function Y(e, t) {
          for (var n = [], r = Math.min(e.depth, t.depth); r >= 0; r--) {
            var o = e.start(r);
            if (
              o < e.pos - (e.depth - r) ||
              t.end(r) > t.pos + (t.depth - r) ||
              e.node(r).type.spec.isolating ||
              t.node(r).type.spec.isolating
            )
              break;
            (o == t.start(r) ||
              (r == e.depth &&
                r == t.depth &&
                e.parent.inlineContent &&
                t.parent.inlineContent &&
                r &&
                t.start(r - 1) == o - 1)) &&
              n.push(r);
          }
          return n;
        }
        var Q = (function (e) {
          s(n, e);
          var t = l(n);
          function n(e, r, o) {
            var i;
            return (
              f(this, n),
              ((i = t.call(this)).pos = e),
              (i.attr = r),
              (i.value = o),
              i
            );
          }
          return (
            p(
              n,
              [
                {
                  key: "apply",
                  value: function (e) {
                    var t = e.nodeAt(this.pos);
                    if (!t)
                      return x.fail("No node at attribute step's position");
                    var n = Object.create(null);
                    for (var r in t.attrs) n[r] = t.attrs[r];
                    n[this.attr] = this.value;
                    var o = t.type.create(n, null, t.marks);
                    return x.fromReplace(
                      e,
                      this.pos,
                      this.pos + 1,
                      new m.Slice(m.Fragment.from(o), 0, t.isLeaf ? 0 : 1)
                    );
                  },
                },
                {
                  key: "getMap",
                  value: function () {
                    return k.empty;
                  },
                },
                {
                  key: "invert",
                  value: function (e) {
                    return new n(
                      this.pos,
                      this.attr,
                      e.nodeAt(this.pos).attrs[this.attr]
                    );
                  },
                },
                {
                  key: "map",
                  value: function (e) {
                    var t = e.mapResult(this.pos, 1);
                    return t.deletedAfter
                      ? null
                      : new n(t.pos, this.attr, this.value);
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    return {
                      stepType: "attr",
                      pos: this.pos,
                      attr: this.attr,
                      value: this.value,
                    };
                  },
                },
              ],
              [
                {
                  key: "fromJSON",
                  value: function (e, t) {
                    if ("number" != typeof t.pos || "string" != typeof t.attr)
                      throw new RangeError(
                        "Invalid input for AttrStep.fromJSON"
                      );
                    return new n(t.pos, t.attr, t.value);
                  },
                },
              ]
            ),
            n
          );
        })(S);
        S.jsonID("attr", Q),
          (t.TransformError = (function (e) {
            s(n, e);
            var t = l(n);
            function n() {
              return f(this, n), t.apply(this, arguments);
            }
            return p(n);
          })(o(Error))),
          (t.TransformError = function e(t) {
            var n = Error.call(this, t);
            return (n.__proto__ = e.prototype), n;
          }),
          (t.TransformError.prototype = Object.create(Error.prototype)),
          (t.TransformError.prototype.constructor = t.TransformError),
          (t.TransformError.prototype.name = "TransformError");
        var ee = (function () {
          function e(t) {
            f(this, e),
              (this.doc = t),
              (this.steps = []),
              (this.docs = []),
              (this.mapping = new w());
          }
          return (
            p(e, [
              {
                key: "before",
                get: function () {
                  return this.docs.length ? this.docs[0] : this.doc;
                },
              },
              {
                key: "step",
                value: function (e) {
                  var n = this.maybeStep(e);
                  if (n.failed) throw new t.TransformError(n.failed);
                  return this;
                },
              },
              {
                key: "maybeStep",
                value: function (e) {
                  var t = e.apply(this.doc);
                  return t.failed || this.addStep(e, t.doc), t;
                },
              },
              {
                key: "docChanged",
                get: function () {
                  return this.steps.length > 0;
                },
              },
              {
                key: "addStep",
                value: function (e, t) {
                  this.docs.push(this.doc),
                    this.steps.push(e),
                    this.mapping.appendMap(e.getMap()),
                    (this.doc = t);
                },
              },
              {
                key: "replace",
                value: function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : e,
                    n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : m.Slice.empty,
                    r = L(this.doc, e, t, n);
                  return r && this.step(r), this;
                },
              },
              {
                key: "replaceWith",
                value: function (e, t, n) {
                  return this.replace(
                    e,
                    t,
                    new m.Slice(m.Fragment.from(n), 0, 0)
                  );
                },
              },
              {
                key: "delete",
                value: function (e, t) {
                  return this.replace(e, t, m.Slice.empty);
                },
              },
              {
                key: "insert",
                value: function (e, t) {
                  return this.replaceWith(e, e, t);
                },
              },
              {
                key: "replaceRange",
                value: function (e, t, n) {
                  return (
                    (function (e, t, n, r) {
                      if (!r.size) return e.deleteRange(t, n);
                      var o = e.doc.resolve(t),
                        i = e.doc.resolve(n);
                      if (J(o, i, r)) return e.step(new D(t, n, r));
                      var s = Y(o, e.doc.resolve(n));
                      0 == s[s.length - 1] && s.pop();
                      var a = -(o.depth + 1);
                      s.unshift(a);
                      for (var l = o.depth, c = o.pos - 1; l > 0; l--, c--) {
                        var u = o.node(l).type.spec;
                        if (u.defining || u.definingAsContext || u.isolating)
                          break;
                        s.indexOf(l) > -1
                          ? (a = l)
                          : o.before(l) == c && s.splice(1, 0, -l);
                      }
                      for (
                        var h = s.indexOf(a),
                          f = [],
                          d = r.openStart,
                          p = r.content,
                          v = 0;
                        ;
                        v++
                      ) {
                        var g = p.firstChild;
                        if ((f.push(g), v == r.openStart)) break;
                        p = g.content;
                      }
                      for (var y = d - 1; y >= 0; y--) {
                        var k = f[y].type,
                          w = Z(k);
                        if (w && o.node(h).type != k) d = y;
                        else if (w || !k.isTextblock) break;
                      }
                      for (var b = r.openStart; b >= 0; b--) {
                        var S = (b + d + 1) % (r.openStart + 1),
                          x = f[S];
                        if (x)
                          for (var M = 0; M < s.length; M++) {
                            var O = s[(M + h) % s.length],
                              C = !0;
                            O < 0 && ((C = !1), (O = -O));
                            var N = o.node(O - 1),
                              T = o.index(O - 1);
                            if (N.canReplaceWith(T, T, x.type, x.marks))
                              return e.replace(
                                o.before(O),
                                C ? i.after(O) : n,
                                new m.Slice(
                                  X(r.content, 0, r.openStart, S),
                                  S,
                                  r.openEnd
                                )
                              );
                          }
                      }
                      for (
                        var E = e.steps.length, A = s.length - 1;
                        A >= 0 && (e.replace(t, n, r), !(e.steps.length > E));
                        A--
                      ) {
                        var R = s[A];
                        R < 0 || ((t = o.before(R)), (n = i.after(R)));
                      }
                    })(this, e, t, n),
                    this
                  );
                },
              },
              {
                key: "replaceRangeWith",
                value: function (e, t, n) {
                  return (
                    (function (e, t, n, r) {
                      if (
                        !r.isInline &&
                        t == n &&
                        e.doc.resolve(t).parent.content.size
                      ) {
                        var o = q(e.doc, t, r.type);
                        null != o && (t = n = o);
                      }
                      e.replaceRange(
                        t,
                        n,
                        new m.Slice(m.Fragment.from(r), 0, 0)
                      );
                    })(this, e, t, n),
                    this
                  );
                },
              },
              {
                key: "deleteRange",
                value: function (e, t) {
                  return (
                    (function (e, t, n) {
                      for (
                        var r = e.doc.resolve(t),
                          o = e.doc.resolve(n),
                          i = Y(r, o),
                          s = 0;
                        s < i.length;
                        s++
                      ) {
                        var a = i[s],
                          l = s == i.length - 1;
                        if (
                          (l && 0 == a) ||
                          r.node(a).type.contentMatch.validEnd
                        )
                          return e.delete(r.start(a), o.end(a));
                        if (
                          a > 0 &&
                          (l ||
                            r
                              .node(a - 1)
                              .canReplace(r.index(a - 1), o.indexAfter(a - 1)))
                        )
                          return e.delete(r.before(a), o.after(a));
                      }
                      for (var c = 1; c <= r.depth && c <= o.depth; c++)
                        if (
                          t - r.start(c) == r.depth - c &&
                          n > r.end(c) &&
                          o.end(c) - n != o.depth - c
                        )
                          return e.delete(r.before(c), n);
                      e.delete(t, n);
                    })(this, e, t),
                    this
                  );
                },
              },
              {
                key: "lift",
                value: function (e, t) {
                  return (
                    (function (e, t, n) {
                      for (
                        var r = t.$from,
                          o = t.$to,
                          i = t.depth,
                          s = r.before(i + 1),
                          a = o.after(i + 1),
                          l = s,
                          c = a,
                          u = m.Fragment.empty,
                          h = 0,
                          f = i,
                          d = !1;
                        f > n;
                        f--
                      )
                        d || r.index(f) > 0
                          ? ((d = !0),
                            (u = m.Fragment.from(r.node(f).copy(u))),
                            h++)
                          : l--;
                      for (
                        var p = m.Fragment.empty, v = 0, g = i, y = !1;
                        g > n;
                        g--
                      )
                        y || o.after(g + 1) < o.end(g)
                          ? ((y = !0),
                            (p = m.Fragment.from(o.node(g).copy(p))),
                            v++)
                          : c++;
                      e.step(
                        new E(
                          l,
                          c,
                          s,
                          a,
                          new m.Slice(u.append(p), h, v),
                          u.size - h,
                          !0
                        )
                      );
                    })(this, e, t),
                    this
                  );
                },
              },
              {
                key: "join",
                value: function (e) {
                  var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 1;
                  return j(this, e, t), this;
                },
              },
              {
                key: "wrap",
                value: function (e, t) {
                  return (
                    (function (e, t, n) {
                      for (
                        var r = m.Fragment.empty, o = n.length - 1;
                        o >= 0;
                        o--
                      ) {
                        if (r.size) {
                          var i = n[o].type.contentMatch.matchFragment(r);
                          if (!i || !i.validEnd)
                            throw new RangeError(
                              "Wrapper type given to Transform.wrap does not form valid content of its parent wrapper"
                            );
                        }
                        r = m.Fragment.from(n[o].type.create(n[o].attrs, r));
                      }
                      var s = t.start,
                        a = t.end;
                      e.step(
                        new E(s, a, s, a, new m.Slice(r, 0, 0), n.length, !0)
                      );
                    })(this, e, t),
                    this
                  );
                },
              },
              {
                key: "setBlockType",
                value: function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : e,
                    n = arguments.length > 2 ? arguments[2] : void 0,
                    r =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : null;
                  return F(this, e, t, n, r), this;
                },
              },
              {
                key: "setNodeMarkup",
                value: function (e, t) {
                  var n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : null,
                    r = arguments.length > 3 ? arguments[3] : void 0;
                  return B(this, e, t, n, r), this;
                },
              },
              {
                key: "setNodeAttribute",
                value: function (e, t, n) {
                  return this.step(new Q(e, t, n)), this;
                },
              },
              {
                key: "addNodeMark",
                value: function (e, t) {
                  return this.step(new N(e, t)), this;
                },
              },
              {
                key: "removeNodeMark",
                value: function (e, t) {
                  if (!(t instanceof m.Mark)) {
                    var n = this.doc.nodeAt(e);
                    if (!n) throw new RangeError("No node at position " + e);
                    if (!(t = t.isInSet(n.marks))) return this;
                  }
                  return this.step(new T(e, t)), this;
                },
              },
              {
                key: "split",
                value: function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 1,
                    n = arguments.length > 2 ? arguments[2] : void 0;
                  return $(this, e, t, n), this;
                },
              },
              {
                key: "addMark",
                value: function (e, t, n) {
                  return (
                    (function (e, t, n, r) {
                      var o,
                        i,
                        s = [],
                        a = [];
                      e.doc.nodesBetween(t, n, function (e, l, c) {
                        if (e.isInline) {
                          var u = e.marks;
                          if (!r.isInSet(u) && c.type.allowsMarkType(r.type)) {
                            for (
                              var h = Math.max(l, t),
                                f = Math.min(l + e.nodeSize, n),
                                d = r.addToSet(u),
                                p = 0;
                              p < u.length;
                              p++
                            )
                              u[p].isInSet(d) ||
                                (o && o.to == h && o.mark.eq(u[p])
                                  ? (o.to = f)
                                  : s.push((o = new C(h, f, u[p]))));
                            i && i.to == h
                              ? (i.to = f)
                              : a.push((i = new O(h, f, r)));
                          }
                        }
                      }),
                        s.forEach(function (t) {
                          return e.step(t);
                        }),
                        a.forEach(function (t) {
                          return e.step(t);
                        });
                    })(this, e, t, n),
                    this
                  );
                },
              },
              {
                key: "removeMark",
                value: function (e, t, n) {
                  
                  return (
                    (function (e, t, n, r) {
                      var o = [],
                        i = 0;
                      e.doc.nodesBetween(t, n, function (e, s) {
                        if (e.isInline) {
                          i++;
                          var a = null;
                          if (r instanceof m.MarkType)
                            for (var l, c = e.marks; (l = r.isInSet(c)); )
                              (a || (a = [])).push(l), (c = l.removeFromSet(c));
                          else
                            r ? r.isInSet(e.marks) && (a = [r]) : (a = e.marks);
                          if (a && a.length)
                            for (
                              var u = Math.min(s + e.nodeSize, n), h = 0;
                              h < a.length;
                              h++
                            ) {
                              for (
                                var f = a[h], d = void 0, p = 0;
                                p < o.length;
                                p++
                              ) {
                                var v = o[p];
                                v.step == i - 1 && f.eq(o[p].style) && (d = v);
                              }
                              d
                                ? ((d.to = u), (d.step = i))
                                : o.push({
                                    style: f,
                                    from: Math.max(s, t),
                                    to: u,
                                    step: i,
                                  });
                            }
                        }
                      }),
                        o.forEach(function (t) {
                          return e.step(new C(t.from, t.to, t.style));
                        });
                    })(this, e, t, n),
                    this
                  );
                },
              },
              {
                key: "clearIncompatible",
                value: function (e, t, n) {
                  return (
                    (function (e, t, n) {
                      for (
                        var r =
                            arguments.length > 3 && void 0 !== arguments[3]
                              ? arguments[3]
                              : n.contentMatch,
                          o = e.doc.nodeAt(t),
                          i = [],
                          s = t + 1,
                          a = 0;
                        a < o.childCount;
                        a++
                      ) {
                        var l = o.child(a),
                          c = s + l.nodeSize,
                          u = r.matchType(l.type);
                        if (u) {
                          r = u;
                          for (var h = 0; h < l.marks.length; h++)
                            n.allowsMarkType(l.marks[h].type) ||
                              e.step(new C(s, c, l.marks[h]));
                        } else i.push(new D(s, c, m.Slice.empty));
                        s = c;
                      }
                      if (!r.validEnd) {
                        var f = r.fillBefore(m.Fragment.empty, !0);
                        e.replace(s, s, new m.Slice(f, 0, 0));
                      }
                      for (var d = i.length - 1; d >= 0; d--) e.step(i[d]);
                    })(this, e, t, n),
                    this
                  );
                },
              },
            ]),
            e
          );
        })();
        (t.AddMarkStep = O),
          (t.AddNodeMarkStep = N),
          (t.AttrStep = Q),
          (t.MapResult = y),
          (t.Mapping = w),
          (t.RemoveMarkStep = C),
          (t.RemoveNodeMarkStep = T),
          (t.ReplaceAroundStep = E),
          (t.ReplaceStep = D),
          (t.Step = S),
          (t.StepMap = k),
          (t.StepResult = x),
          (t.Transform = ee),
          (t.canJoin = function (e, t) {
            var n = e.resolve(t),
              r = n.index();
            return (
              V(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1)
            );
          }),
          (t.canSplit = function (e, t) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 1,
              r = arguments.length > 3 ? arguments[3] : void 0,
              o = e.resolve(t),
              i = o.depth - n,
              s = (r && r[r.length - 1]) || o.parent;
            if (
              i < 0 ||
              o.parent.type.spec.isolating ||
              !o.parent.canReplace(o.index(), o.parent.childCount) ||
              !s.type.validContent(
                o.parent.content.cutByIndex(o.index(), o.parent.childCount)
              )
            )
              return !1;
            for (var a = o.depth - 1, l = n - 2; a > i; a--, l--) {
              var c = o.node(a),
                u = o.index(a);
              if (c.type.spec.isolating) return !1;
              var h = c.content.cutByIndex(u, c.childCount),
                f = (r && r[l]) || c;
              if (
                (f != c && (h = h.replaceChild(0, f.type.create(f.attrs))),
                !c.canReplace(u + 1, c.childCount) || !f.type.validContent(h))
              )
                return !1;
            }
            var d = o.indexAfter(i),
              p = r && r[0];
            return o
              .node(i)
              .canReplaceWith(d, d, p ? p.type : o.node(i + 1).type);
          }),
          (t.dropPoint = function (e, t, n) {
            var r = e.resolve(t);
            if (!n.content.size) return t;
            for (var o = n.content, i = 0; i < n.openStart; i++)
              o = o.firstChild.content;
            for (var s = 1; s <= (0 == n.openStart && n.size ? 2 : 1); s++)
              for (var a = r.depth; a >= 0; a--) {
                var l =
                    a == r.depth
                      ? 0
                      : r.pos <= (r.start(a + 1) + r.end(a + 1)) / 2
                      ? -1
                      : 1,
                  c = r.index(a) + (l > 0 ? 1 : 0),
                  u = r.node(a),
                  h = !1;
                if (1 == s) h = u.canReplace(c, c, o);
                else {
                  var f = u.contentMatchAt(c).findWrapping(o.firstChild.type);
                  h = f && u.canReplaceWith(c, c, f[0]);
                }
                if (h)
                  return 0 == l
                    ? r.pos
                    : l < 0
                    ? r.before(a + 1)
                    : r.after(a + 1);
              }
            return null;
          }),
          (t.findWrapping = function (e, t) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null,
              r =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : e,
              o = I(e, t),
              i = o && z(r, t);
            return i
              ? o.map(P).concat({ type: t, attrs: n }).concat(i.map(P))
              : null;
          }),
          (t.insertPoint = q),
          (t.joinPoint = function (e, t) {
            for (
              var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : -1,
                r = e.resolve(t),
                o = r.depth;
              ;
              o--
            ) {
              var i = void 0,
                s = void 0,
                a = r.index(o);
              if (
                (o == r.depth
                  ? ((i = r.nodeBefore), (s = r.nodeAfter))
                  : n > 0
                  ? ((i = r.node(o + 1)), a++, (s = r.node(o).maybeChild(a)))
                  : ((i = r.node(o).maybeChild(a - 1)), (s = r.node(o + 1))),
                i &&
                  !i.isTextblock &&
                  V(i, s) &&
                  r.node(o).canReplace(a, a + 1))
              )
                return t;
              if (0 == o) break;
              t = n < 0 ? r.before(o) : r.after(o);
            }
          }),
          (t.liftTarget = function (e) {
            for (
              var t = e.parent.content.cutByIndex(e.startIndex, e.endIndex),
                n = e.depth;
              ;
              --n
            ) {
              var r = e.$from.node(n),
                o = e.$from.index(n),
                i = e.$to.indexAfter(n);
              if (n < e.depth && r.canReplace(o, i, t)) return n;
              if (0 == n || r.type.spec.isolating || !R(r, o, i)) break;
            }
            return null;
          }),
          (t.replaceStep = L);
      },
      222: (e, t, n) => {
        function r(e) {
          return (
            (r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            r(e)
          );
        }
        function o() {
          return (
            (o =
              "undefined" != typeof Reflect && Reflect.get
                ? Reflect.get
                : function (e, t, n) {
                    var r = i(e, t);
                    if (r) {
                      var o = Object.getOwnPropertyDescriptor(r, t);
                      return o.get
                        ? o.get.call(arguments.length < 3 ? e : n)
                        : o.value;
                    }
                  }),
            o.apply(this, arguments)
          );
        }
        function i(e, t) {
          for (
            ;
            !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = h(e));

          );
          return e;
        }
        function s(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            t && a(e, t);
        }
        function a(e, t) {
          return (
            (a =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e;
              }),
            a(e, t)
          );
        }
        function l(e) {
          var t = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch (e) {
              return !1;
            }
          })();
          return function () {
            var n,
              r = h(e);
            if (t) {
              var o = h(this).constructor;
              n = Reflect.construct(r, arguments, o);
            } else n = r.apply(this, arguments);
            return c(this, n);
          };
        }
        function c(e, t) {
          if (t && ("object" === r(t) || "function" == typeof t)) return t;
          if (void 0 !== t)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return u(e);
        }
        function u(e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        }
        function h(e) {
          return (
            (h = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            h(e)
          );
        }
        function f(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function d(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function p(e, t, n) {
          return (
            t && d(e.prototype, t),
            n && d(e, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var m = n(391),
          v = n(443),
          g = n(843),
          y = function (e) {
            for (var t = 0; ; t++) if (!(e = e.previousSibling)) return t;
          },
          k = function (e) {
            var t = e.assignedSlot || e.parentNode;
            return t && 11 == t.nodeType ? t.host : t;
          },
          w = null,
          b = function (e, t, n) {
            var r = w || (w = document.createRange());
            return (
              r.setEnd(e, null == n ? e.nodeValue.length : n),
              r.setStart(e, t || 0),
              r
            );
          },
          S = function (e, t, n, r) {
            return n && (M(e, t, n, r, -1) || M(e, t, n, r, 1));
          },
          x = /^(img|br|input|textarea|hr)$/i;
        function M(e, t, n, r, o) {
          for (;;) {
            if (e == n && t == r) return !0;
            if (t == (o < 0 ? 0 : O(e))) {
              var i = e.parentNode;
              if (
                !i ||
                1 != i.nodeType ||
                N(e) ||
                x.test(e.nodeName) ||
                "false" == e.contentEditable
              )
                return !1;
              (t = y(e) + (o < 0 ? 0 : 1)), (e = i);
            } else {
              if (1 != e.nodeType) return !1;
              if (
                "false" ==
                (e = e.childNodes[t + (o < 0 ? -1 : 0)]).contentEditable
              )
                return !1;
              t = o < 0 ? O(e) : 0;
            }
          }
        }
        function O(e) {
          return 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length;
        }
        function C(e, t, n) {
          for (var r = 0 == t, o = t == O(e); r || o; ) {
            if (e == n) return !0;
            var i = y(e);
            if (!(e = e.parentNode)) return !1;
            (r = r && 0 == i), (o = o && i == O(e));
          }
        }
        function N(e) {
          for (var t, n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
          return (
            t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e)
          );
        }
        var T = function (e) {
          return (
            e.focusNode &&
            S(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
          );
        };
        function D(e, t) {
          var n = document.createEvent("Event");
          return (
            n.initEvent("keydown", !0, !0),
            (n.keyCode = e),
            (n.key = n.code = t),
            n
          );
        }
        var E = "undefined" != typeof navigator ? navigator : null,
          A = "undefined" != typeof document ? document : null,
          R = (E && E.userAgent) || "",
          P = /Edge\/(\d+)/.exec(R),
          I = /MSIE \d/.exec(R),
          z = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(R),
          F = !!(I || z || P),
          B = I ? document.documentMode : z ? +z[1] : P ? +P[1] : 0,
          $ = !F && /gecko\/(\d+)/i.test(R);
        $ && (/Firefox\/(\d+)/.exec(R) || [0, 0])[1];
        var V = !F && /Chrome\/(\d+)/.exec(R),
          j = !!V,
          q = V ? +V[1] : 0,
          L = !F && !!E && /Apple Computer/.test(E.vendor),
          J = L && (/Mobile\/\w+/.test(R) || (!!E && E.maxTouchPoints > 2)),
          _ = J || (!!E && /Mac/.test(E.platform)),
          W = /Android \d/.test(R),
          K = !!A && "webkitFontSmoothing" in A.documentElement.style,
          H = K
            ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
            : 0;
        function U(e) {
          return {
            left: 0,
            right: e.documentElement.clientWidth,
            top: 0,
            bottom: e.documentElement.clientHeight,
          };
        }
        function G(e, t) {
          return "number" == typeof e ? e : e[t];
        }
        function Z(e) {
          var t = e.getBoundingClientRect(),
            n = t.width / e.offsetWidth || 1,
            r = t.height / e.offsetHeight || 1;
          return {
            left: t.left,
            right: t.left + e.clientWidth * n,
            top: t.top,
            bottom: t.top + e.clientHeight * r,
          };
        }
        function X(e, t, n) {
          for (
            var r = e.someProp("scrollThreshold") || 0,
              o = e.someProp("scrollMargin") || 5,
              i = e.dom.ownerDocument,
              s = n || e.dom;
            s;
            s = k(s)
          )
            if (1 == s.nodeType) {
              var a = s,
                l = a == i.body,
                c = l ? U(i) : Z(a),
                u = 0,
                h = 0;
              if (
                (t.top < c.top + G(r, "top")
                  ? (h = -(c.top - t.top + G(o, "top")))
                  : t.bottom > c.bottom - G(r, "bottom") &&
                    (h = t.bottom - c.bottom + G(o, "bottom")),
                t.left < c.left + G(r, "left")
                  ? (u = -(c.left - t.left + G(o, "left")))
                  : t.right > c.right - G(r, "right") &&
                    (u = t.right - c.right + G(o, "right")),
                u || h)
              )
                if (l) i.defaultView.scrollBy(u, h);
                else {
                  var f = a.scrollLeft,
                    d = a.scrollTop;
                  h && (a.scrollTop += h), u && (a.scrollLeft += u);
                  var p = a.scrollLeft - f,
                    m = a.scrollTop - d;
                  t = {
                    left: t.left - p,
                    top: t.top - m,
                    right: t.right - p,
                    bottom: t.bottom - m,
                  };
                }
              if (l) break;
            }
        }
        function Y(e) {
          for (
            var t = [], n = e.ownerDocument, r = e;
            r &&
            (t.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), e != n);
            r = k(r)
          );
          return t;
        }
        function Q(e, t) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n],
              o = r.dom,
              i = r.top,
              s = r.left;
            o.scrollTop != i + t && (o.scrollTop = i + t),
              o.scrollLeft != s && (o.scrollLeft = s);
          }
        }
        var ee = null;
        function te(e, t) {
          for (
            var n,
              r,
              o = 2e8,
              i = 0,
              s = t.top,
              a = t.top,
              l = e.firstChild,
              c = 0;
            l;
            l = l.nextSibling, c++
          ) {
            var u = void 0;
            if (1 == l.nodeType) u = l.getClientRects();
            else {
              if (3 != l.nodeType) continue;
              u = b(l).getClientRects();
            }
            for (var h = 0; h < u.length; h++) {
              var f = u[h];
              if (f.top <= s && f.bottom >= a) {
                (s = Math.max(f.bottom, s)), (a = Math.min(f.top, a));
                var d =
                  f.left > t.left
                    ? f.left - t.left
                    : f.right < t.left
                    ? t.left - f.right
                    : 0;
                if (d < o) {
                  (n = l),
                    (o = d),
                    (r =
                      d && 3 == n.nodeType
                        ? {
                            left: f.right < t.left ? f.right : f.left,
                            top: t.top,
                          }
                        : t),
                    1 == l.nodeType &&
                      d &&
                      (i = c + (t.left >= (f.left + f.right) / 2 ? 1 : 0));
                  continue;
                }
              }
              !n &&
                ((t.left >= f.right && t.top >= f.top) ||
                  (t.left >= f.left && t.top >= f.bottom)) &&
                (i = c + 1);
            }
          }
          return n && 3 == n.nodeType
            ? (function (e, t) {
                for (
                  var n = e.nodeValue.length, r = document.createRange(), o = 0;
                  o < n;
                  o++
                ) {
                  r.setEnd(e, o + 1), r.setStart(e, o);
                  var i = ie(r, 1);
                  if (i.top != i.bottom && ne(t, i))
                    return {
                      node: e,
                      offset: o + (t.left >= (i.left + i.right) / 2 ? 1 : 0),
                    };
                }
                return { node: e, offset: 0 };
              })(n, r)
            : !n || (o && 1 == n.nodeType)
            ? { node: e, offset: i }
            : te(n, r);
        }
        function ne(e, t) {
          return (
            e.left >= t.left - 1 &&
            e.left <= t.right + 1 &&
            e.top >= t.top - 1 &&
            e.top <= t.bottom + 1
          );
        }
        function re(e, t, n) {
          var r = e.childNodes.length;
          if (r && n.top < n.bottom)
            for (
              var o = Math.max(
                  0,
                  Math.min(
                    r - 1,
                    Math.floor((r * (t.top - n.top)) / (n.bottom - n.top)) - 2
                  )
                ),
                i = o;
              ;

            ) {
              var s = e.childNodes[i];
              if (1 == s.nodeType)
                for (var a = s.getClientRects(), l = 0; l < a.length; l++) {
                  var c = a[l];
                  if (ne(t, c)) return re(s, t, c);
                }
              if ((i = (i + 1) % r) == o) break;
            }
          return e;
        }
        function oe(e, t) {
          var n,
            r = e.dom.ownerDocument,
            o = 0;
          if (r.caretPositionFromPoint)
            try {
              var i = r.caretPositionFromPoint(t.left, t.top);
              i && ((n = i.offsetNode), (o = i.offset));
            } catch (e) {}
          if (!n && r.caretRangeFromPoint) {
            var s = r.caretRangeFromPoint(t.left, t.top);
            s && ((n = s.startContainer), (o = s.startOffset));
          }
          var a,
            l = (e.root.elementFromPoint ? e.root : r).elementFromPoint(
              t.left,
              t.top
            );
          if (!l || !e.dom.contains(1 != l.nodeType ? l.parentNode : l)) {
            var c = e.dom.getBoundingClientRect();
            if (!ne(t, c)) return null;
            if (!(l = re(e.dom, t, c))) return null;
          }
          if (L) for (var u = l; n && u; u = k(u)) u.draggable && (n = void 0);
          if (
            ((l = (function (e, t) {
              var n = e.parentNode;
              return n &&
                /^li$/i.test(n.nodeName) &&
                t.left < e.getBoundingClientRect().left
                ? n
                : e;
            })(l, t)),
            n)
          ) {
            if (
              $ &&
              1 == n.nodeType &&
              (o = Math.min(o, n.childNodes.length)) < n.childNodes.length
            ) {
              var h,
                f = n.childNodes[o];
              "IMG" == f.nodeName &&
                (h = f.getBoundingClientRect()).right <= t.left &&
                h.bottom > t.top &&
                o++;
            }
            n == e.dom &&
            o == n.childNodes.length - 1 &&
            1 == n.lastChild.nodeType &&
            t.top > n.lastChild.getBoundingClientRect().bottom
              ? (a = e.state.doc.content.size)
              : (0 != o &&
                  1 == n.nodeType &&
                  "BR" == n.childNodes[o - 1].nodeName) ||
                (a = (function (e, t, n, r) {
                  for (var o = -1, i = t; i != e.dom; ) {
                    var s = e.docView.nearestDesc(i, !0);
                    if (!s) return null;
                    if (s.node.isBlock && s.parent) {
                      var a = s.dom.getBoundingClientRect();
                      if (a.left > r.left || a.top > r.top) o = s.posBefore;
                      else {
                        if (!(a.right < r.left || a.bottom < r.top)) break;
                        o = s.posAfter;
                      }
                    }
                    i = s.dom.parentNode;
                  }
                  return o > -1 ? o : e.docView.posFromDOM(t, n, 1);
                })(e, n, o, t));
          }
          null == a &&
            (a = (function (e, t, n) {
              var r = te(t, n),
                o = r.node,
                i = r.offset,
                s = -1;
              if (1 == o.nodeType && !o.firstChild) {
                var a = o.getBoundingClientRect();
                s =
                  a.left != a.right && n.left > (a.left + a.right) / 2 ? 1 : -1;
              }
              return e.docView.posFromDOM(o, i, s);
            })(e, l, t));
          var d = e.docView.nearestDesc(l, !0);
          return { pos: a, inside: d ? d.posAtStart - d.border : -1 };
        }
        function ie(e, t) {
          var n = e.getClientRects();
          return n.length
            ? n[t < 0 ? 0 : n.length - 1]
            : e.getBoundingClientRect();
        }
        var se = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
        function ae(e, t, n) {
          var r = e.docView.domFromPos(t, n < 0 ? -1 : 1),
            o = r.node,
            i = r.offset,
            s = r.atom,
            a = K || $;
          if (3 == o.nodeType) {
            if (
              !a ||
              (!se.test(o.nodeValue) && (n < 0 ? i : i != o.nodeValue.length))
            ) {
              var l = i,
                c = i,
                u = n < 0 ? 1 : -1;
              return (
                n < 0 && !i
                  ? (c++, (u = -1))
                  : n >= 0 && i == o.nodeValue.length
                  ? (l--, (u = 1))
                  : n < 0
                  ? l--
                  : c++,
                le(ie(b(o, l, c), 1), u < 0)
              );
            }
            var h = ie(b(o, i, i), n);
            if (
              $ &&
              i &&
              /\s/.test(o.nodeValue[i - 1]) &&
              i < o.nodeValue.length
            ) {
              var f = ie(b(o, i - 1, i - 1), -1);
              if (f.top == h.top) {
                var d = ie(b(o, i, i + 1), -1);
                if (d.top != h.top) return le(d, d.left < f.left);
              }
            }
            return h;
          }
          if (!e.state.doc.resolve(t - (s || 0)).parent.inlineContent) {
            if (null == s && i && (n < 0 || i == O(o))) {
              var p = o.childNodes[i - 1];
              if (1 == p.nodeType) return ce(p.getBoundingClientRect(), !1);
            }
            if (null == s && i < O(o)) {
              var m = o.childNodes[i];
              if (1 == m.nodeType) return ce(m.getBoundingClientRect(), !0);
            }
            return ce(o.getBoundingClientRect(), n >= 0);
          }
          if (null == s && i && (n < 0 || i == O(o))) {
            var v = o.childNodes[i - 1],
              g =
                3 == v.nodeType
                  ? b(v, O(v) - (a ? 0 : 1))
                  : 1 != v.nodeType || ("BR" == v.nodeName && v.nextSibling)
                  ? null
                  : v;
            if (g) return le(ie(g, 1), !1);
          }
          if (null == s && i < O(o)) {
            for (
              var y = o.childNodes[i];
              y.pmViewDesc && y.pmViewDesc.ignoreForCoords;

            )
              y = y.nextSibling;
            var k = y
              ? 3 == y.nodeType
                ? b(y, 0, a ? 0 : 1)
                : 1 == y.nodeType
                ? y
                : null
              : null;
            if (k) return le(ie(k, -1), !0);
          }
          return le(ie(3 == o.nodeType ? b(o) : o, -n), n >= 0);
        }
        function le(e, t) {
          if (0 == e.width) return e;
          var n = t ? e.left : e.right;
          return { top: e.top, bottom: e.bottom, left: n, right: n };
        }
        function ce(e, t) {
          if (0 == e.height) return e;
          var n = t ? e.top : e.bottom;
          return { top: n, bottom: n, left: e.left, right: e.right };
        }
        function ue(e, t, n) {
          var r = e.state,
            o = e.root.activeElement;
          r != t && e.updateState(t), o != e.dom && e.focus();
          try {
            return n();
          } finally {
            r != t && e.updateState(r), o != e.dom && o && o.focus();
          }
        }
        var he = /[\u0590-\u08ac]/,
          fe = null,
          de = null,
          pe = !1;
        var me = (function () {
            function e(t, n, r, o) {
              f(this, e),
                (this.parent = t),
                (this.children = n),
                (this.dom = r),
                (this.contentDOM = o),
                (this.dirty = 0),
                (r.pmViewDesc = this);
            }
            return (
              p(e, [
                {
                  key: "matchesWidget",
                  value: function (e) {
                    return !1;
                  },
                },
                {
                  key: "matchesMark",
                  value: function (e) {
                    return !1;
                  },
                },
                {
                  key: "matchesNode",
                  value: function (e, t, n) {
                    return !1;
                  },
                },
                {
                  key: "matchesHack",
                  value: function (e) {
                    return !1;
                  },
                },
                {
                  key: "parseRule",
                  value: function () {
                    return null;
                  },
                },
                {
                  key: "stopEvent",
                  value: function (e) {
                    return !1;
                  },
                },
                {
                  key: "size",
                  get: function () {
                    for (var e = 0, t = 0; t < this.children.length; t++)
                      e += this.children[t].size;
                    return e;
                  },
                },
                {
                  key: "border",
                  get: function () {
                    return 0;
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    (this.parent = void 0),
                      this.dom.pmViewDesc == this &&
                        (this.dom.pmViewDesc = void 0);
                    for (var e = 0; e < this.children.length; e++)
                      this.children[e].destroy();
                  },
                },
                {
                  key: "posBeforeChild",
                  value: function (e) {
                    for (var t = 0, n = this.posAtStart; ; t++) {
                      var r = this.children[t];
                      if (r == e) return n;
                      n += r.size;
                    }
                  },
                },
                {
                  key: "posBefore",
                  get: function () {
                    return this.parent.posBeforeChild(this);
                  },
                },
                {
                  key: "posAtStart",
                  get: function () {
                    return this.parent
                      ? this.parent.posBeforeChild(this) + this.border
                      : 0;
                  },
                },
                {
                  key: "posAfter",
                  get: function () {
                    return this.posBefore + this.size;
                  },
                },
                {
                  key: "posAtEnd",
                  get: function () {
                    return this.posAtStart + this.size - 2 * this.border;
                  },
                },
                {
                  key: "localPosFromDOM",
                  value: function (e, t, n) {
                    if (
                      this.contentDOM &&
                      this.contentDOM.contains(
                        1 == e.nodeType ? e : e.parentNode
                      )
                    ) {
                      if (n < 0) {
                        var r, o;
                        if (e == this.contentDOM) r = e.childNodes[t - 1];
                        else {
                          for (; e.parentNode != this.contentDOM; )
                            e = e.parentNode;
                          r = e.previousSibling;
                        }
                        for (; r && (!(o = r.pmViewDesc) || o.parent != this); )
                          r = r.previousSibling;
                        return r
                          ? this.posBeforeChild(o) + o.size
                          : this.posAtStart;
                      }
                      var i, s;
                      if (e == this.contentDOM) i = e.childNodes[t];
                      else {
                        for (; e.parentNode != this.contentDOM; )
                          e = e.parentNode;
                        i = e.nextSibling;
                      }
                      for (; i && (!(s = i.pmViewDesc) || s.parent != this); )
                        i = i.nextSibling;
                      return i ? this.posBeforeChild(s) : this.posAtEnd;
                    }
                    var a;
                    if (e == this.dom && this.contentDOM)
                      a = t > y(this.contentDOM);
                    else if (
                      this.contentDOM &&
                      this.contentDOM != this.dom &&
                      this.dom.contains(this.contentDOM)
                    )
                      a = 2 & e.compareDocumentPosition(this.contentDOM);
                    else if (this.dom.firstChild) {
                      if (0 == t)
                        for (var l = e; ; l = l.parentNode) {
                          if (l == this.dom) {
                            a = !1;
                            break;
                          }
                          if (l.previousSibling) break;
                        }
                      if (null == a && t == e.childNodes.length)
                        for (var c = e; ; c = c.parentNode) {
                          if (c == this.dom) {
                            a = !0;
                            break;
                          }
                          if (c.nextSibling) break;
                        }
                    }
                    return (null == a ? n > 0 : a)
                      ? this.posAtEnd
                      : this.posAtStart;
                  },
                },
                {
                  key: "nearestDesc",
                  value: function (e) {
                    for (
                      var t =
                          arguments.length > 1 &&
                          void 0 !== arguments[1] &&
                          arguments[1],
                        n = !0,
                        r = e;
                      r;
                      r = r.parentNode
                    ) {
                      var o = this.getDesc(r),
                        i = void 0;
                      if (o && (!t || o.node)) {
                        if (
                          !n ||
                          !(i = o.nodeDOM) ||
                          (1 == i.nodeType
                            ? i.contains(1 == e.nodeType ? e : e.parentNode)
                            : i == e)
                        )
                          return o;
                        n = !1;
                      }
                    }
                  },
                },
                {
                  key: "getDesc",
                  value: function (e) {
                    for (var t = e.pmViewDesc, n = t; n; n = n.parent)
                      if (n == this) return t;
                  },
                },
                {
                  key: "posFromDOM",
                  value: function (e, t, n) {
                    for (var r = e; r; r = r.parentNode) {
                      var o = this.getDesc(r);
                      if (o) return o.localPosFromDOM(e, t, n);
                    }
                    return -1;
                  },
                },
                {
                  key: "descAt",
                  value: function (e) {
                    for (var t = 0, n = 0; t < this.children.length; t++) {
                      var r = this.children[t],
                        o = n + r.size;
                      if (n == e && o != n) {
                        for (; !r.border && r.children.length; )
                          r = r.children[0];
                        return r;
                      }
                      if (e < o) return r.descAt(e - n - r.border);
                      n = o;
                    }
                  },
                },
                {
                  key: "domFromPos",
                  value: function (e, t) {
                    if (!this.contentDOM)
                      return { node: this.dom, offset: 0, atom: e + 1 };
                    for (
                      var n, r = 0, o = 0, i = 0;
                      r < this.children.length;
                      r++
                    ) {
                      var s = this.children[r],
                        a = i + s.size;
                      if (a > e || s instanceof Se) {
                        o = e - i;
                        break;
                      }
                      i = a;
                    }
                    if (o)
                      return this.children[r].domFromPos(
                        o - this.children[r].border,
                        t
                      );
                    for (
                      ;
                      r &&
                      !(n = this.children[r - 1]).size &&
                      n instanceof ve &&
                      n.side >= 0;
                      r--
                    );
                    if (t <= 0) {
                      for (
                        var l, c = !0;
                        (l = r ? this.children[r - 1] : null) &&
                        l.dom.parentNode != this.contentDOM;
                        r--, c = !1
                      );
                      return l && t && c && !l.border && !l.domAtom
                        ? l.domFromPos(l.size, t)
                        : {
                            node: this.contentDOM,
                            offset: l ? y(l.dom) + 1 : 0,
                          };
                    }
                    for (
                      var u, h = !0;
                      (u =
                        r < this.children.length ? this.children[r] : null) &&
                      u.dom.parentNode != this.contentDOM;
                      r++, h = !1
                    );
                    return u && h && !u.border && !u.domAtom
                      ? u.domFromPos(0, t)
                      : {
                          node: this.contentDOM,
                          offset: u
                            ? y(u.dom)
                            : this.contentDOM.childNodes.length,
                        };
                  },
                },
                {
                  key: "parseRange",
                  value: function (e, t) {
                    var n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : 0;
                    if (0 == this.children.length)
                      return {
                        node: this.contentDOM,
                        from: e,
                        to: t,
                        fromOffset: 0,
                        toOffset: this.contentDOM.childNodes.length,
                      };
                    for (var r = -1, o = -1, i = n, s = 0; ; s++) {
                      var a = this.children[s],
                        l = i + a.size;
                      if (-1 == r && e <= l) {
                        var c = i + a.border;
                        if (
                          e >= c &&
                          t <= l - a.border &&
                          a.node &&
                          a.contentDOM &&
                          this.contentDOM.contains(a.contentDOM)
                        )
                          return a.parseRange(e, t, c);
                        e = i;
                        for (var u = s; u > 0; u--) {
                          var h = this.children[u - 1];
                          if (
                            h.size &&
                            h.dom.parentNode == this.contentDOM &&
                            !h.emptyChildAt(1)
                          ) {
                            r = y(h.dom) + 1;
                            break;
                          }
                          e -= h.size;
                        }
                        -1 == r && (r = 0);
                      }
                      if (r > -1 && (l > t || s == this.children.length - 1)) {
                        t = l;
                        for (var f = s + 1; f < this.children.length; f++) {
                          var d = this.children[f];
                          if (
                            d.size &&
                            d.dom.parentNode == this.contentDOM &&
                            !d.emptyChildAt(-1)
                          ) {
                            o = y(d.dom);
                            break;
                          }
                          t += d.size;
                        }
                        -1 == o && (o = this.contentDOM.childNodes.length);
                        break;
                      }
                      i = l;
                    }
                    return {
                      node: this.contentDOM,
                      from: e,
                      to: t,
                      fromOffset: r,
                      toOffset: o,
                    };
                  },
                },
                {
                  key: "emptyChildAt",
                  value: function (e) {
                    if (
                      this.border ||
                      !this.contentDOM ||
                      !this.children.length
                    )
                      return !1;
                    var t = this.children[e < 0 ? 0 : this.children.length - 1];
                    return 0 == t.size || t.emptyChildAt(e);
                  },
                },
                {
                  key: "domAfterPos",
                  value: function (e) {
                    var t = this.domFromPos(e, 0),
                      n = t.node,
                      r = t.offset;
                    if (1 != n.nodeType || r == n.childNodes.length)
                      throw new RangeError("No node after pos " + e);
                    return n.childNodes[r];
                  },
                },
                {
                  key: "setSelection",
                  value: function (e, t, n) {
                    for (
                      var r =
                          arguments.length > 3 &&
                          void 0 !== arguments[3] &&
                          arguments[3],
                        o = Math.min(e, t),
                        i = Math.max(e, t),
                        s = 0,
                        a = 0;
                      s < this.children.length;
                      s++
                    ) {
                      var l = this.children[s],
                        c = a + l.size;
                      if (o > a && i < c)
                        return l.setSelection(
                          e - a - l.border,
                          t - a - l.border,
                          n,
                          r
                        );
                      a = c;
                    }
                    var u = this.domFromPos(e, e ? -1 : 1),
                      h = t == e ? u : this.domFromPos(t, t ? -1 : 1),
                      f = n.getSelection(),
                      d = !1;
                    if (($ || L) && e == t) {
                      var p = u,
                        m = p.node,
                        v = p.offset;
                      if (3 == m.nodeType) {
                        if (
                          (d = !(!v || "\n" != m.nodeValue[v - 1])) &&
                          v == m.nodeValue.length
                        )
                          for (var g, k = m; k; k = k.parentNode) {
                            if ((g = k.nextSibling)) {
                              "BR" == g.nodeName &&
                                (u = h =
                                  { node: g.parentNode, offset: y(g) + 1 });
                              break;
                            }
                            var w = k.pmViewDesc;
                            if (w && w.node && w.node.isBlock) break;
                          }
                      } else {
                        var b = m.childNodes[v - 1];
                        d =
                          b &&
                          ("BR" == b.nodeName || "false" == b.contentEditable);
                      }
                    }
                    if (
                      $ &&
                      f.focusNode &&
                      f.focusNode != h.node &&
                      1 == f.focusNode.nodeType
                    ) {
                      var x = f.focusNode.childNodes[f.focusOffset];
                      x && "false" == x.contentEditable && (r = !0);
                    }
                    if (
                      r ||
                      (d && L) ||
                      !S(u.node, u.offset, f.anchorNode, f.anchorOffset) ||
                      !S(h.node, h.offset, f.focusNode, f.focusOffset)
                    ) {
                      var M = !1;
                      if ((f.extend || e == t) && !d) {
                        f.collapse(u.node, u.offset);
                        try {
                          e != t && f.extend(h.node, h.offset), (M = !0);
                        } catch (e) {}
                      }
                      if (!M) {
                        if (e > t) {
                          var O = u;
                          (u = h), (h = O);
                        }
                        var C = document.createRange();
                        C.setEnd(h.node, h.offset),
                          C.setStart(u.node, u.offset),
                          f.removeAllRanges(),
                          f.addRange(C);
                      }
                    }
                  },
                },
                {
                  key: "ignoreMutation",
                  value: function (e) {
                    return !this.contentDOM && "selection" != e.type;
                  },
                },
                {
                  key: "contentLost",
                  get: function () {
                    return (
                      this.contentDOM &&
                      this.contentDOM != this.dom &&
                      !this.dom.contains(this.contentDOM)
                    );
                  },
                },
                {
                  key: "markDirty",
                  value: function (e, t) {
                    for (var n = 0, r = 0; r < this.children.length; r++) {
                      var o = this.children[r],
                        i = n + o.size;
                      if (n == i ? e <= i && t >= n : e < i && t > n) {
                        var s = n + o.border,
                          a = i - o.border;
                        if (e >= s && t <= a)
                          return (
                            (this.dirty = e == n || t == i ? 2 : 1),
                            void (e != s ||
                            t != a ||
                            (!o.contentLost &&
                              o.dom.parentNode == this.contentDOM)
                              ? o.markDirty(e - s, t - s)
                              : (o.dirty = 3))
                          );
                        o.dirty =
                          o.dom != o.contentDOM ||
                          o.dom.parentNode != this.contentDOM ||
                          o.children.length
                            ? 3
                            : 2;
                      }
                      n = i;
                    }
                    this.dirty = 2;
                  },
                },
                {
                  key: "markParentsDirty",
                  value: function () {
                    for (var e = 1, t = this.parent; t; t = t.parent, e++) {
                      var n = 1 == e ? 2 : 1;
                      t.dirty < n && (t.dirty = n);
                    }
                  },
                },
                {
                  key: "domAtom",
                  get: function () {
                    return !1;
                  },
                },
                {
                  key: "ignoreForCoords",
                  get: function () {
                    return !1;
                  },
                },
              ]),
              e
            );
          })(),
          ve = (function (e) {
            s(n, e);
            var t = l(n);
            function n(e, r, o, i) {
              var s;
              f(this, n);
              var a,
                l = r.type.toDOM;
              if (
                ("function" == typeof l &&
                  (l = l(o, function () {
                    return a
                      ? a.parent
                        ? a.parent.posBeforeChild(a)
                        : void 0
                      : i;
                  })),
                !r.type.spec.raw)
              ) {
                if (1 != l.nodeType) {
                  var c = document.createElement("span");
                  c.appendChild(l), (l = c);
                }
                (l.contentEditable = "false"),
                  l.classList.add("ProseMirror-widget");
              }
              return (
                ((s = t.call(this, e, [], l, null)).widget = r),
                (s.widget = r),
                (a = u(s)),
                s
              );
            }
            return (
              p(n, [
                {
                  key: "matchesWidget",
                  value: function (e) {
                    return 0 == this.dirty && e.type.eq(this.widget.type);
                  },
                },
                {
                  key: "parseRule",
                  value: function () {
                    return { ignore: !0 };
                  },
                },
                {
                  key: "stopEvent",
                  value: function (e) {
                    var t = this.widget.spec.stopEvent;
                    return !!t && t(e);
                  },
                },
                {
                  key: "ignoreMutation",
                  value: function (e) {
                    return (
                      "selection" != e.type || this.widget.spec.ignoreSelection
                    );
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    this.widget.type.destroy(this.dom),
                      o(h(n.prototype), "destroy", this).call(this);
                  },
                },
                {
                  key: "domAtom",
                  get: function () {
                    return !0;
                  },
                },
                {
                  key: "side",
                  get: function () {
                    return this.widget.type.side;
                  },
                },
              ]),
              n
            );
          })(me),
          ge = (function (e) {
            s(n, e);
            var t = l(n);
            function n(e, r, o, i) {
              var s;
              return (
                f(this, n),
                ((s = t.call(this, e, [], r, null)).textDOM = o),
                (s.text = i),
                s
              );
            }
            return (
              p(n, [
                {
                  key: "size",
                  get: function () {
                    return this.text.length;
                  },
                },
                {
                  key: "localPosFromDOM",
                  value: function (e, t) {
                    return e != this.textDOM
                      ? this.posAtStart + (t ? this.size : 0)
                      : this.posAtStart + t;
                  },
                },
                {
                  key: "domFromPos",
                  value: function (e) {
                    return { node: this.textDOM, offset: e };
                  },
                },
                {
                  key: "ignoreMutation",
                  value: function (e) {
                    return (
                      "characterData" === e.type &&
                      e.target.nodeValue == e.oldValue
                    );
                  },
                },
              ]),
              n
            );
          })(me),
          ye = (function (e) {
            s(n, e);
            var t = l(n);
            function n(e, r, o, i) {
              var s;
              return f(this, n), ((s = t.call(this, e, [], o, i)).mark = r), s;
            }
            return (
              p(
                n,
                [
                  {
                    key: "parseRule",
                    value: function () {
                      return 3 & this.dirty || this.mark.type.spec.reparseInView
                        ? null
                        : {
                            mark: this.mark.type.name,
                            attrs: this.mark.attrs,
                            contentElement: this.contentDOM || void 0,
                          };
                    },
                  },
                  {
                    key: "matchesMark",
                    value: function (e) {
                      return 3 != this.dirty && this.mark.eq(e);
                    },
                  },
                  {
                    key: "markDirty",
                    value: function (e, t) {
                      if (
                        (o(h(n.prototype), "markDirty", this).call(this, e, t),
                        0 != this.dirty)
                      ) {
                        for (var r = this.parent; !r.node; ) r = r.parent;
                        r.dirty < this.dirty && (r.dirty = this.dirty),
                          (this.dirty = 0);
                      }
                    },
                  },
                  {
                    key: "slice",
                    value: function (e, t, r) {
                      var o = n.create(this.parent, this.mark, !0, r),
                        i = this.children,
                        s = this.size;
                      t < s && (i = ze(i, t, s, r)),
                        e > 0 && (i = ze(i, 0, e, r));
                      for (var a = 0; a < i.length; a++) i[a].parent = o;
                      return (o.children = i), o;
                    },
                  },
                ],
                [
                  {
                    key: "create",
                    value: function (e, t, r, o) {
                      var i = o.nodeViews[t.type.name],
                        s = i && i(t, o, r);
                      return (
                        (s && s.dom) ||
                          (s = v.DOMSerializer.renderSpec(
                            document,
                            t.type.spec.toDOM(t, r)
                          )),
                        new n(e, t, s.dom, s.contentDOM || s.dom)
                      );
                    },
                  },
                ]
              ),
              n
            );
          })(me),
          ke = (function (e) {
            s(n, e);
            var t = l(n);
            function n(e, r, o, i, s, a, l, c, u) {
              var h;
              return (
                f(this, n),
                ((h = t.call(this, e, [], s, a)).node = r),
                (h.outerDeco = o),
                (h.innerDeco = i),
                (h.nodeDOM = l),
                a && h.updateChildren(c, u),
                h
              );
            }
            return (
              p(
                n,
                [
                  {
                    key: "parseRule",
                    value: function () {
                      var e = this;
                      if (this.node.type.spec.reparseInView) return null;
                      var t = {
                        node: this.node.type.name,
                        attrs: this.node.attrs,
                      };
                      if (
                        ("pre" == this.node.type.whitespace &&
                          (t.preserveWhitespace = "full"),
                        this.contentDOM)
                      )
                        if (this.contentLost) {
                          for (var n = this.children.length - 1; n >= 0; n--) {
                            var r = this.children[n];
                            if (this.dom.contains(r.dom.parentNode)) {
                              t.contentElement = r.dom.parentNode;
                              break;
                            }
                          }
                          t.contentElement ||
                            (t.getContent = function () {
                              return v.Fragment.empty;
                            });
                        } else t.contentElement = this.contentDOM;
                      else
                        t.getContent = function () {
                          return e.node.content;
                        };
                      return t;
                    },
                  },
                  {
                    key: "matchesNode",
                    value: function (e, t, n) {
                      return (
                        0 == this.dirty &&
                        e.eq(this.node) &&
                        Ae(t, this.outerDeco) &&
                        n.eq(this.innerDeco)
                      );
                    },
                  },
                  {
                    key: "size",
                    get: function () {
                      return this.node.nodeSize;
                    },
                  },
                  {
                    key: "border",
                    get: function () {
                      return this.node.isLeaf ? 0 : 1;
                    },
                  },
                  {
                    key: "updateChildren",
                    value: function (e, t) {
                      var n = this,
                        r = this.node.inlineContent,
                        o = t,
                        i = e.composing
                          ? this.localCompositionInfo(e, t)
                          : null,
                        s = i && i.pos > -1 ? i : null,
                        a = i && i.pos < 0,
                        l = new Pe(this, s && s.node, e);
                      !(function (e, t, n, r) {
                        var o = t.locals(e),
                          i = 0;
                        if (0 != o.length)
                          for (var s = 0, a = [], l = null, c = 0; ; ) {
                            if (s < o.length && o[s].to == i) {
                              for (
                                var u = o[s++], h = void 0;
                                s < o.length && o[s].to == i;

                              )
                                (h || (h = [u])).push(o[s++]);
                              if (h) {
                                h.sort(Ie);
                                for (var f = 0; f < h.length; f++)
                                  n(h[f], c, !!l);
                              } else n(u, c, !!l);
                            }
                            var d = void 0,
                              p = void 0;
                            if (l) (p = -1), (d = l), (l = null);
                            else {
                              if (!(c < e.childCount)) break;
                              (p = c), (d = e.child(c++));
                            }
                            for (var m = 0; m < a.length; m++)
                              a[m].to <= i && a.splice(m--, 1);
                            for (
                              ;
                              s < o.length && o[s].from <= i && o[s].to > i;

                            )
                              a.push(o[s++]);
                            var v = i + d.nodeSize;
                            if (d.isText) {
                              var g = v;
                              s < o.length && o[s].from < g && (g = o[s].from);
                              for (var y = 0; y < a.length; y++)
                                a[y].to < g && (g = a[y].to);
                              g < v &&
                                ((l = d.cut(g - i)),
                                (d = d.cut(0, g - i)),
                                (v = g),
                                (p = -1));
                            }
                            r(
                              d,
                              d.isInline && !d.isLeaf
                                ? a.filter(function (e) {
                                    return !e.inline;
                                  })
                                : a.slice(),
                              t.forChild(i, d),
                              p
                            ),
                              (i = v);
                          }
                        else
                          for (var k = 0; k < e.childCount; k++) {
                            var w = e.child(k);
                            r(w, o, t.forChild(i, w), k), (i += w.nodeSize); //original
                            // r(w, o, t.forChild(i, w), k), (i += w.content.size);
                          }
                      })(
                        this.node,
                        this.innerDeco,
                        function (t, i, s) {
                          t.spec.marks
                            ? l.syncToMarks(t.spec.marks, r, e)
                            : t.type.side >= 0 &&
                              !s &&
                              l.syncToMarks(
                                i == n.node.childCount
                                  ? v.Mark.none
                                  : n.node.child(i).marks,
                                r,
                                e
                              ),
                            l.placeWidget(t, e, o);
                        },
                        function (t, n, s, c) {
                          var u;
                          l.syncToMarks(t.marks, r, e),
                            l.findNodeMatch(t, n, s, c) ||
                              (a &&
                                e.state.selection.from > o &&
                                e.state.selection.to < o + t.nodeSize &&
                                (u = l.findIndexWithChild(i.node)) > -1 &&
                                l.updateNodeAt(t, n, s, u, e)) ||
                              l.updateNextNode(t, n, s, e, c) ||
                              l.addNode(t, n, s, e, o),
                            (o += t.nodeSize);
                        }
                      ),
                        l.syncToMarks([], r, e),
                        this.node.isTextblock && l.addTextblockHacks(),
                        l.destroyRest(),
                        (l.changed || 2 == this.dirty) &&
                          (s && this.protectLocalComposition(e, s),
                          Me(this.contentDOM, this.children, e),
                          J &&
                            (function (e) {
                              if ("UL" == e.nodeName || "OL" == e.nodeName) {
                                var t = e.style.cssText;
                                (e.style.cssText =
                                  t + "; list-style: square !important"),
                                  window.getComputedStyle(e).listStyle,
                                  (e.style.cssText = t);
                              }
                            })(this.dom));
                    },
                  },
                  {
                    key: "localCompositionInfo",
                    value: function (e, t) {
                      var n = e.state.selection,
                        r = n.from,
                        o = n.to;
                      if (
                        !(e.state.selection instanceof m.TextSelection) ||
                        r < t ||
                        o > t + this.node.content.size
                      )
                        return null;
                      var i = e.domSelectionRange(),
                        s = (function (e, t) {
                          for (;;) {
                            if (3 == e.nodeType) return e;
                            if (1 == e.nodeType && t > 0) {
                              if (
                                e.childNodes.length > t &&
                                3 == e.childNodes[t].nodeType
                              )
                                return e.childNodes[t];
                              t = O((e = e.childNodes[t - 1]));
                            } else {
                              if (!(1 == e.nodeType && t < e.childNodes.length))
                                return null;
                              (e = e.childNodes[t]), (t = 0);
                            }
                          }
                        })(i.focusNode, i.focusOffset);
                      if (!s || !this.dom.contains(s.parentNode)) return null;
                      if (this.node.inlineContent) {
                        var a = s.nodeValue,
                          l = (function (e, t, n, r) {
                            for (
                              var o = 0, i = 0;
                              o < e.childCount && i <= r;

                            ) {
                              var s = e.child(o++),
                                a = i;
                              if (((i += s.nodeSize), s.isText)) {
                                for (var l = s.text; o < e.childCount; ) {
                                  var c = e.child(o++);
                                  if (((i += c.nodeSize), !c.isText)) break;
                                  l += c.text;
                                }
                                if (i >= n) {
                                  var u =
                                    a < r ? l.lastIndexOf(t, r - a - 1) : -1;
                                  if (u >= 0 && u + t.length + a >= n)
                                    return a + u;
                                  if (
                                    n == r &&
                                    l.length >= r + t.length - a &&
                                    l.slice(r - a, r - a + t.length) == t
                                  )
                                    return r;
                                }
                              }
                            }
                            return -1;
                          })(this.node.content, a, r - t, o - t);
                        return l < 0 ? null : { node: s, pos: l, text: a };
                      }
                      return { node: s, pos: -1, text: "" };
                    },
                  },
                  {
                    key: "protectLocalComposition",
                    value: function (e, t) {
                      var n = t.node,
                        r = t.pos,
                        o = t.text;
                      if (!this.getDesc(n)) {
                        for (
                          var i = n;
                          i.parentNode != this.contentDOM;
                          i = i.parentNode
                        ) {
                          for (; i.previousSibling; )
                            i.parentNode.removeChild(i.previousSibling);
                          for (; i.nextSibling; )
                            i.parentNode.removeChild(i.nextSibling);
                          i.pmViewDesc && (i.pmViewDesc = void 0);
                        }
                        var s = new ge(this, i, n, o);
                        e.input.compositionNodes.push(s),
                          (this.children = ze(
                            this.children,
                            r,
                            r + o.length,
                            e,
                            s
                          ));
                      }
                    },
                  },
                  {
                    key: "update",
                    value: function (e, t, n, r) {
                      return !(
                        3 == this.dirty ||
                        !e.sameMarkup(this.node) ||
                        (this.updateInner(e, t, n, r), 0)
                      );
                    },
                  },
                  {
                    key: "updateInner",
                    value: function (e, t, n, r) {
                      this.updateOuterDeco(t),
                        (this.node = e),
                        (this.innerDeco = n),
                        this.contentDOM &&
                          this.updateChildren(r, this.posAtStart),
                        (this.dirty = 0);
                    },
                  },
                  {
                    key: "updateOuterDeco",
                    value: function (e) {
                      if (!Ae(e, this.outerDeco)) {
                        var t = 1 != this.nodeDOM.nodeType,
                          n = this.dom;
                        (this.dom = Te(
                          this.dom,
                          this.nodeDOM,
                          Ne(this.outerDeco, this.node, t),
                          Ne(e, this.node, t)
                        )),
                          this.dom != n &&
                            ((n.pmViewDesc = void 0),
                            (this.dom.pmViewDesc = this)),
                          (this.outerDeco = e);
                      }
                    },
                  },
                  {
                    key: "selectNode",
                    value: function () {
                      1 == this.nodeDOM.nodeType &&
                        this.nodeDOM.classList.add("ProseMirror-selectednode"),
                        (!this.contentDOM && this.node.type.spec.draggable) ||
                          (this.dom.draggable = !0);
                    },
                  },
                  {
                    key: "deselectNode",
                    value: function () {
                      1 == this.nodeDOM.nodeType &&
                        this.nodeDOM.classList.remove(
                          "ProseMirror-selectednode"
                        ),
                        (!this.contentDOM && this.node.type.spec.draggable) ||
                          this.dom.removeAttribute("draggable");
                    },
                  },
                  {
                    key: "domAtom",
                    get: function () {
                      return this.node.isAtom;
                    },
                  },
                ],
                [
                  {
                    key: "create",
                    value: function (e, t, r, o, i, s) {
                      var a,
                        l = i.nodeViews[t.type.name],
                        c =
                          l &&
                          l(
                            t,
                            i,
                            function () {
                              return a
                                ? a.parent
                                  ? a.parent.posBeforeChild(a)
                                  : void 0
                                : s;
                            },
                            r,
                            o
                          ),
                        u = c && c.dom,
                        h = c && c.contentDOM;
                      if (t.isText)
                        if (u) {
                          if (3 != u.nodeType)
                            throw new RangeError(
                              "Text must be rendered as a DOM text node"
                            );
                        } else u = document.createTextNode(t.text);
                      else if (!u) {
                        var f = v.DOMSerializer.renderSpec(
                          document,
                          t.type.spec.toDOM(t)
                        );
                        (u = f.dom), (h = f.contentDOM);
                      }
                      h ||
                        t.isText ||
                        "BR" == u.nodeName ||
                        (u.hasAttribute("contenteditable") ||
                          (u.contentEditable = "false"),
                        t.type.spec.draggable && (u.draggable = !0));
                      var d = u;
                      return (
                        (u = Ee(u, r, t)),
                        c
                          ? (a = new xe(
                              e,
                              t,
                              r,
                              o,
                              u,
                              h || null,
                              d,
                              c,
                              i,
                              s + 1
                            ))
                          : t.isText
                          ? new be(e, t, r, o, u, d, i)
                          : new n(e, t, r, o, u, h || null, d, i, s + 1)
                      );
                    },
                  },
                ]
              ),
              n
            );
          })(me);
        function we(e, t, n, r, o) {
          return Ee(r, t, e), new ke(void 0, e, t, n, r, r, r, o, 0);
        }
        var be = (function (e) {
            s(n, e);
            var t = l(n);
            function n(e, r, o, i, s, a, l) {
              return f(this, n), t.call(this, e, r, o, i, s, null, a, l, 0);
            }
            return (
              p(n, [
                {
                  key: "parseRule",
                  value: function () {
                    for (
                      var e = this.nodeDOM.parentNode;
                      e && e != this.dom && !e.pmIsDeco;

                    )
                      e = e.parentNode;
                    return { skip: e || !0 };
                  },
                },
                {
                  key: "update",
                  value: function (e, t, n, r) {
                    return !(
                      3 == this.dirty ||
                      (0 != this.dirty && !this.inParent()) ||
                      !e.sameMarkup(this.node) ||
                      (this.updateOuterDeco(t),
                      (0 == this.dirty && e.text == this.node.text) ||
                        e.text == this.nodeDOM.nodeValue ||
                        ((this.nodeDOM.nodeValue = e.text),
                        r.trackWrites == this.nodeDOM &&
                          (r.trackWrites = null)),
                      (this.node = e),
                      (this.dirty = 0),
                      0)
                    );
                  },
                },
                {
                  key: "inParent",
                  value: function () {
                    for (
                      var e = this.parent.contentDOM, t = this.nodeDOM;
                      t;
                      t = t.parentNode
                    )
                      if (t == e) return !0;
                    return !1;
                  },
                },
                {
                  key: "domFromPos",
                  value: function (e) {
                    return { node: this.nodeDOM, offset: e };
                  },
                },
                {
                  key: "localPosFromDOM",
                  value: function (e, t, r) {
                    return e == this.nodeDOM
                      ? this.posAtStart + Math.min(t, this.node.text.length)
                      : o(h(n.prototype), "localPosFromDOM", this).call(
                          this,
                          e,
                          t,
                          r
                        );
                  },
                },
                {
                  key: "ignoreMutation",
                  value: function (e) {
                    return "characterData" != e.type && "selection" != e.type;
                  },
                },
                {
                  key: "slice",
                  value: function (e, t, r) {
                    var o = this.node.cut(e, t),
                      i = document.createTextNode(o.text);
                    return new n(
                      this.parent,
                      o,
                      this.outerDeco,
                      this.innerDeco,
                      i,
                      i,
                      r
                    );
                  },
                },
                {
                  key: "markDirty",
                  value: function (e, t) {
                    o(h(n.prototype), "markDirty", this).call(this, e, t),
                      this.dom == this.nodeDOM ||
                        (0 != e && t != this.nodeDOM.nodeValue.length) ||
                        (this.dirty = 3);
                  },
                },
                {
                  key: "domAtom",
                  get: function () {
                    return !1;
                  },
                },
              ]),
              n
            );
          })(ke),
          Se = (function (e) {
            s(n, e);
            var t = l(n);
            function n() {
              return f(this, n), t.apply(this, arguments);
            }
            return (
              p(n, [
                {
                  key: "parseRule",
                  value: function () {
                    return { ignore: !0 };
                  },
                },
                {
                  key: "matchesHack",
                  value: function (e) {
                    return 0 == this.dirty && this.dom.nodeName == e;
                  },
                },
                {
                  key: "domAtom",
                  get: function () {
                    return !0;
                  },
                },
                {
                  key: "ignoreForCoords",
                  get: function () {
                    return "IMG" == this.dom.nodeName;
                  },
                },
              ]),
              n
            );
          })(me),
          xe = (function (e) {
            s(n, e);
            var t = l(n);
            function n(e, r, o, i, s, a, l, c, u, h) {
              var d;
              return (
                f(this, n),
                ((d = t.call(this, e, r, o, i, s, a, l, u, h)).spec = c),
                d
              );
            }
            return (
              p(n, [
                {
                  key: "update",
                  value: function (e, t, r, i) {
                    if (3 == this.dirty) return !1;
                    if (this.spec.update) {
                      var s = this.spec.update(e, t, r);
                      return s && this.updateInner(e, t, r, i), s;
                    }
                    return (
                      !(!this.contentDOM && !e.isLeaf) &&
                      o(h(n.prototype), "update", this).call(this, e, t, r, i)
                    );
                  },
                },
                {
                  key: "selectNode",
                  value: function () {
                    this.spec.selectNode
                      ? this.spec.selectNode()
                      : o(h(n.prototype), "selectNode", this).call(this);
                  },
                },
                {
                  key: "deselectNode",
                  value: function () {
                    this.spec.deselectNode
                      ? this.spec.deselectNode()
                      : o(h(n.prototype), "deselectNode", this).call(this);
                  },
                },
                {
                  key: "setSelection",
                  value: function (e, t, r, i) {
                    this.spec.setSelection
                      ? this.spec.setSelection(e, t, r)
                      : o(h(n.prototype), "setSelection", this).call(
                          this,
                          e,
                          t,
                          r,
                          i
                        );
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    this.spec.destroy && this.spec.destroy(),
                      o(h(n.prototype), "destroy", this).call(this);
                  },
                },
                {
                  key: "stopEvent",
                  value: function (e) {
                    return !!this.spec.stopEvent && this.spec.stopEvent(e);
                  },
                },
                {
                  key: "ignoreMutation",
                  value: function (e) {
                    return this.spec.ignoreMutation
                      ? this.spec.ignoreMutation(e)
                      : o(h(n.prototype), "ignoreMutation", this).call(this, e);
                  },
                },
              ]),
              n
            );
          })(ke);
        function Me(e, t, n) { //en esta funcion se valida lo ingresado en el div dvEditor (cuando se escribe o se ingresa un span o carga informacion)
          for (var r = e.firstChild, o = !1, i = 0; i < t.length; i++) {
            var s = t[i],
              a = s.dom;
              // a = s.dom.parentNode == null ? s.parent : s.dom;
            if (a.parentNode == e || a == e) {
              for (; a != r; ) (r = Re(r)), (o = !0);
              r = r.nextSibling;
            } 
            // else if (a.localName == 'p' || a.localName == 'strong')
            // {}
            else (o = !0), e.insertBefore(a, r);
            if (s instanceof ye) {
              var l = r ? r.previousSibling : e.lastChild;
              Me(s.contentDOM, s.children, n),
                (r = l ? l.nextSibling : e.firstChild);
            }
          }
          for (; r; ) (r = Re(r)), (o = !0);
          o && n.trackWrites == e && (n.trackWrites = null);
        }
        var Oe = function (e) {
          e && (this.nodeName = e);
        };
        Oe.prototype = Object.create(null);
        var Ce = [new Oe()];
        function Ne(e, t, n) {
          if (0 == e.length) return Ce;
          for (
            var r = n ? Ce[0] : new Oe(), o = [r], i = 0;
            i < e.length;
            i++
          ) {
            var s = e[i].type.attrs;
            if (s)
              for (var a in (s.nodeName && o.push((r = new Oe(s.nodeName))),
              s)) {
                var l = s[a];
                null != l &&
                  (n &&
                    1 == o.length &&
                    o.push((r = new Oe(t.isInline ? "span" : "div"))),
                  "class" == a
                    ? (r.class = (r.class ? r.class + " " : "") + l)
                    : "style" == a
                    ? (r.style = (r.style ? r.style + ";" : "") + l)
                    : "nodeName" != a && (r[a] = l));
              }
          }
          return o;
        }
        function Te(e, t, n, r) {
          if (n == Ce && r == Ce) return t;
          for (var o = t, i = 0; i < r.length; i++) {
            var s = r[i],
              a = n[i];
            if (i) {
              var l = void 0;
              (a &&
                a.nodeName == s.nodeName &&
                o != e &&
                (l = o.parentNode) &&
                l.nodeName.toLowerCase() == s.nodeName) ||
                (((l = document.createElement(s.nodeName)).pmIsDeco = !0),
                l.appendChild(o),
                (a = Ce[0])),
                (o = l);
            }
            De(o, a || Ce[0], s);
          }
          return o;
        }
        function De(e, t, n) {
          for (var r in t)
            "class" == r ||
              "style" == r ||
              "nodeName" == r ||
              r in n ||
              e.removeAttribute(r);
          for (var o in n)
            "class" != o &&
              "style" != o &&
              "nodeName" != o &&
              n[o] != t[o] &&
              e.setAttribute(o, n[o]);
          if (t.class != n.class) {
            for (
              var i = t.class ? t.class.split(" ").filter(Boolean) : [],
                s = n.class ? n.class.split(" ").filter(Boolean) : [],
                a = 0;
              a < i.length;
              a++
            )
              -1 == s.indexOf(i[a]) && e.classList.remove(i[a]);
            for (var l = 0; l < s.length; l++)
              -1 == i.indexOf(s[l]) && e.classList.add(s[l]);
            0 == e.classList.length && e.removeAttribute("class");
          }
          if (t.style != n.style) {
            if (t.style)
              for (
                var c,
                  u =
                    /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g;
                (c = u.exec(t.style));

              )
                e.style.removeProperty(c[1]);
            n.style && (e.style.cssText += n.style);
          }
        }
        function Ee(e, t, n) {
          return Te(e, e, Ce, Ne(t, n, 1 != e.nodeType));
        }
        function Ae(e, t) {
          if (e.length != t.length) return !1;
          for (var n = 0; n < e.length; n++)
            if (!e[n].type.eq(t[n].type)) return !1;
          return !0;
        }
        function Re(e) { //en esta funcion elimina las etiquetas segun validaciones del prosemirror, quitando estilos
          var t = e.nextSibling;
          // if(e.localName == 'p' || e.localName == 'strong' || e.localName == 'span')
          //   return false;
          // else
            return e.parentNode.removeChild(e), t;
        }
        var Pe = (function () {
          function e(t, n, r) {
            f(this, e),
              (this.lock = n),
              (this.view = r),
              (this.index = 0),
              (this.stack = []),
              (this.changed = !1),
              (this.top = t),
              (this.preMatch = (function (e, t) {
                var n = t,
                  r = n.children.length,
                  o = e.childCount,
                  i = new Map(),
                  s = [];
                e: for (; o > 0; ) {
                  for (var a = void 0; ; )
                    if (r) {
                      var l = n.children[r - 1];
                      if (!(l instanceof ye)) {
                        (a = l), r--;
                        break;
                      }
                      (n = l), (r = l.children.length);
                    } else {
                      if (n == t) break e;
                      (r = n.parent.children.indexOf(n)), (n = n.parent);
                    }
                  var c = a.node;
                  if (c) {
                    if (c != e.child(o - 1)) break;
                    --o, i.set(a, o), s.push(a);
                  }
                }
                return { index: o, matched: i, matches: s.reverse() };
              })(t.node.content, t));
          }
          return (
            p(e, [
              {
                key: "destroyBetween",
                value: function (e, t) {
                  if (e != t) {
                    for (var n = e; n < t; n++) this.top.children[n].destroy();
                    this.top.children.splice(e, t - e), (this.changed = !0);
                  }
                },
              },
              {
                key: "destroyRest",
                value: function () {
                  this.destroyBetween(this.index, this.top.children.length);
                },
              },
              {
                key: "syncToMarks",
                value: function (e, t, n) {
                  for (
                    var r = 0,
                      o = this.stack.length >> 1,
                      i = Math.min(o, e.length);
                    r < i &&
                    (r == o - 1
                      ? this.top
                      : this.stack[(r + 1) << 1]
                    ).matchesMark(e[r]) &&
                    !1 !== e[r].type.spec.spanning;

                  )
                    r++;
                  for (; r < o; )
                    this.destroyRest(),
                      (this.top.dirty = 0),
                      (this.index = this.stack.pop()),
                      (this.top = this.stack.pop()),
                      o--;
                  for (; o < e.length; ) {
                    this.stack.push(this.top, this.index + 1);
                    for (
                      var s = -1, a = this.index;
                      a < Math.min(this.index + 3, this.top.children.length);
                      a++
                    ) {
                      var l = this.top.children[a];
                      if (l.matchesMark(e[o]) && !this.isLocked(l.dom)) {
                        s = a;
                        break;
                      }
                    }
                    if (s > -1)
                      s > this.index &&
                        ((this.changed = !0),
                        this.destroyBetween(this.index, s)),
                        (this.top = this.top.children[this.index]);
                    else {
                      var c = ye.create(this.top, e[o], t, n);
                      this.top.children.splice(this.index, 0, c),
                        (this.top = c),
                        (this.changed = !0);
                    }
                    (this.index = 0), o++;
                  }
                },
              },
              {
                key: "findNodeMatch",
                value: function (e, t, n, r) {
                  var o,
                    i = -1;
                  if (
                    r >= this.preMatch.index &&
                    (o = this.preMatch.matches[r - this.preMatch.index])
                      .parent == this.top &&
                    o.matchesNode(e, t, n)
                  )
                    i = this.top.children.indexOf(o, this.index);
                  else
                    for (
                      var s = this.index,
                        a = Math.min(this.top.children.length, s + 5);
                      s < a;
                      s++
                    ) {
                      var l = this.top.children[s];
                      if (
                        l.matchesNode(e, t, n) &&
                        !this.preMatch.matched.has(l)
                      ) {
                        i = s;
                        break;
                      }
                    }
                  return !(
                    i < 0 ||
                    (this.destroyBetween(this.index, i), this.index++, 0)
                  );
                },
              },
              {
                key: "updateNodeAt",
                value: function (e, t, n, r, o) {
                  var i = this.top.children[r];
                  return (
                    3 == i.dirty && i.dom == i.contentDOM && (i.dirty = 2),
                    !!i.update(e, t, n, o) &&
                      (this.destroyBetween(this.index, r), this.index++, !0)
                  );
                },
              },
              {
                key: "findIndexWithChild",
                value: function (e) {
                  for (;;) {
                    var t = e.parentNode;
                    if (!t) return -1;
                    if (t == this.top.contentDOM) {
                      var n = e.pmViewDesc;
                      if (n)
                        for (
                          var r = this.index;
                          r < this.top.children.length;
                          r++
                        )
                          if (this.top.children[r] == n) return r;
                      return -1;
                    }
                    e = t;
                  }
                },
              },
              {
                key: "updateNextNode",
                value: function (e, t, n, r, o) {
                  for (var i = this.index; i < this.top.children.length; i++) {
                    var s = this.top.children[i];
                    if (s instanceof ke) {
                      var a = this.preMatch.matched.get(s);
                      if (null != a && a != o) return !1;
                      var l = s.dom;
                      if (
                        (!this.isLocked(l) ||
                          (e.isText &&
                            s.node &&
                            s.node.isText &&
                            s.nodeDOM.nodeValue == e.text &&
                            3 != s.dirty &&
                            Ae(t, s.outerDeco))) &&
                        s.update(e, t, n, r)
                      )
                        return (
                          this.destroyBetween(this.index, i),
                          s.dom != l && (this.changed = !0),
                          this.index++,
                          !0
                        );
                      break;
                    }
                  }
                  return !1;
                },
              },
              {
                key: "addNode",
                value: function (e, t, n, r, o) {
                  // console.log(e,t,n,r,o);//aqui ingresa todo lo que se esta agregando
                  this.top.children.splice(
                    this.index++,
                    0,
                    ke.create(this.top, e, t, n, r, o)
                  ),
                    (this.changed = !0);
                },
              },
              {
                key: "placeWidget",
                value: function (e, t, n) {
                  var r =
                    this.index < this.top.children.length
                      ? this.top.children[this.index]
                      : null;
                  if (
                    !r ||
                    !r.matchesWidget(e) ||
                    (e != r.widget && r.widget.type.toDOM.parentNode)
                  ) {
                    var o = new ve(this.top, e, t, n);
                    this.top.children.splice(this.index++, 0, o),
                      (this.changed = !0);
                  } else this.index++;
                },
              },
              {
                key: "addTextblockHacks",
                value: function () {
                  // console.log("fue llamado");
                  for (
                    var e = this.top.children[this.index - 1], t = this.top;
                    e instanceof ye;

                  )
                  // console.log(ye);
                    e = (t = e).children[t.children.length - 1];
                  (!e || !(e instanceof be) || /\n$/.test(e.node.text) || (this.view.requiresGeckoHackNode &&
                      /\s$/.test(e.node.text))) &&
                    ((L || j) &&
                      e &&
                      "false" == e.dom.contentEditable &&
                      this.addHackNode("IMG", t),
                    this.addHackNode("BR", this.top));
                },
              },
              {
                key: "addHackNode",
                value: function (e, t) {
                  // var insertaBR = document.getElementById("insertaBR").value;
               
                  if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
                  {
                  this.index++;                  
                  }
                  else {     
                  // if (insertaBR.Value == "0")
                  // {        
                         
                    var n = document.createElement(e);

                    // console.log(t);
                    // console.log(insertaBR);
                    // console.log(n);
                    // if(insertaBR == "0")
                    // {
                    "img" == e && ((n.className = "ProseMirror-separator"), (n.alt = "")),
                      "BR" == e && (n.className = "ProseMirror-trailingBreak");
                      // console.log("paso en main en 0");
                    // var r = new Se(thistop, [], n, null);
                    // }
                    // else
                    //   {
                    //     // console.log(n);
                    //     "IMG" == e && ((n.className = "ProseMirror-separator"), (n.alt = "")),
                    //     "BR" == e && (n.className = "Separador");
                    //     // console.log(n);
                    //     document.getElementById("insertaBR").value = "0";
                    //     console.log("paso en main");
                    //   }
                    var r = new Se(this.top, [], n, null);
                    t != this.top ? t.children.push(r) : t.children.splice(this.index++, 0, r), (this.changed = !0);
                  //     }
                  // else
                  // {
                  //   insertaBR.value = "0";
                  // }
                  }
                  
                },
              },
              {
                key: "isLocked",
                value: function (e) {
                  return (
                    this.lock &&
                    (e == this.lock ||
                      (1 == e.nodeType && e.contains(this.lock.parentNode)))
                  );
                },
              },
            ]),
            e
          );
        })();
        function Ie(e, t) {
          return e.type.side - t.type.side;
        }
        function ze(e, t, n, r, o) {
          for (var i = [], s = 0, a = 0; s < e.length; s++) {
            var l = e[s],
              c = a,
              u = (a += l.size);
            c >= n || u <= t
              ? i.push(l)
              : (c < t && i.push(l.slice(0, t - c, r)),
                o && (i.push(o), (o = void 0)),
                u > n && i.push(l.slice(n - c, l.size, r)));
          }
          return i;
        }
        function Fe(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null,
            n = e.domSelectionRange(),
            r = e.state.doc;
          if (!n.focusNode) return null;
          var o = e.docView.nearestDesc(n.focusNode),
            i = o && 0 == o.size,
            s = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
          if (s < 0) return null;
          var a,
            l,
            c = r.resolve(s);
          if (T(n)) {
            for (a = c; o && !o.node; ) o = o.parent;
            var u = o.node;
            if (
              o &&
              u.isAtom &&
              m.NodeSelection.isSelectable(u) &&
              o.parent &&
              (!u.isInline || !C(n.focusNode, n.focusOffset, o.dom))
            ) {
              var h = o.posBefore;
              l = new m.NodeSelection(s == h ? c : r.resolve(h));
            }
          } else {
            var f = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
            if (f < 0) return null;
            a = r.resolve(f);
          }
          if (!l) {
            var d =
              "pointer" == t || (e.state.selection.head < c.pos && !i) ? 1 : -1;
            l = He(e, a, c, d);
          }
          return l;
        }
        function Be(e) {
          return e.editable
            ? e.hasFocus()
            : Ge(e) &&
                document.activeElement &&
                document.activeElement.contains(e.dom);
        }
        function $e(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = e.state.selection;
          if ((We(e, n), Be(e))) {
            if (
              !t &&
              e.input.mouseDown &&
              e.input.mouseDown.allowDefault &&
              j
            ) {
              var r = e.domSelectionRange(),
                o = e.domObserver.currentSelection;
              if (
                r.anchorNode &&
                o.anchorNode &&
                S(r.anchorNode, r.anchorOffset, o.anchorNode, o.anchorOffset)
              )
                return (
                  (e.input.mouseDown.delayedSelectionSync = !0),
                  void e.domObserver.setCurSelection()
                );
            }
            if ((e.domObserver.disconnectSelection(), e.cursorWrapper)) _e(e);
            else {
              var i,
                s,
                a = n.anchor,
                l = n.head;
              !Ve ||
                n instanceof m.TextSelection ||
                (n.$from.parent.inlineContent || (i = je(e, n.from)),
                n.empty || n.$from.parent.inlineContent || (s = je(e, n.to))),
                e.docView.setSelection(a, l, e.root, t),
                Ve && (i && Le(i), s && Le(s)),
                n.visible
                  ? e.dom.classList.remove("ProseMirror-hideselection")
                  : (e.dom.classList.add("ProseMirror-hideselection"),
                    "onselectionchange" in document && Je(e));
            }
            e.domObserver.setCurSelection(), e.domObserver.connectSelection();
          }
        }
        var Ve = L || (j && q < 63);
        function je(e, t) {
          var n = e.docView.domFromPos(t, 0),
            r = n.node,
            o = n.offset,
            i = o < r.childNodes.length ? r.childNodes[o] : null,
            s = o ? r.childNodes[o - 1] : null;
          if (L && i && "false" == i.contentEditable) return qe(i);
          if (
            !(
              (i && "false" != i.contentEditable) ||
              (s && "false" != s.contentEditable)
            )
          ) {
            if (i) return qe(i);
            if (s) return qe(s);
          }
        }
        function qe(e) {
          return (
            (e.contentEditable = "true"),
            L && e.draggable && ((e.draggable = !1), (e.wasDraggable = !0)),
            e
          );
        }
        function Le(e) {
          (e.contentEditable = "false"),
            e.wasDraggable && ((e.draggable = !0), (e.wasDraggable = null));
        }
        function Je(e) {
          var t = e.dom.ownerDocument;
          t.removeEventListener("selectionchange", e.input.hideSelectionGuard);
          var n = e.domSelectionRange(),
            r = n.anchorNode,
            o = n.anchorOffset;
          t.addEventListener(
            "selectionchange",
            (e.input.hideSelectionGuard = function () {
              (n.anchorNode == r && n.anchorOffset == o) ||
                (t.removeEventListener(
                  "selectionchange",
                  e.input.hideSelectionGuard
                ),
                setTimeout(function () {
                  (Be(e) && !e.state.selection.visible) ||
                    e.dom.classList.remove("ProseMirror-hideselection");
                }, 20));
            })
          );
        }
        function _e(e) {
          var t = e.domSelection(),
            n = document.createRange(),
            r = e.cursorWrapper.dom,
            o = "IMG" == r.nodeName;
          o ? n.setEnd(r.parentNode, y(r) + 1) : n.setEnd(r, 0),
            n.collapse(!1),
            t.removeAllRanges(),
            t.addRange(n),
            !o &&
              !e.state.selection.visible &&
              F &&
              B <= 11 &&
              ((r.disabled = !0), (r.disabled = !1));
        }
        function We(e, t) {
          if (t instanceof m.NodeSelection) {
            var n = e.docView.descAt(t.from);
            n != e.lastSelectedViewDesc &&
              (Ke(e), n && n.selectNode(), (e.lastSelectedViewDesc = n));
          } else Ke(e);
        }
        function Ke(e) {
          e.lastSelectedViewDesc &&
            (e.lastSelectedViewDesc.parent &&
              e.lastSelectedViewDesc.deselectNode(),
            (e.lastSelectedViewDesc = void 0));
        }
        function He(e, t, n, r) {
          return (
            e.someProp("createSelectionBetween", function (r) {
              return r(e, t, n);
            }) || m.TextSelection.between(t, n, r)
          );
        }
        function Ue(e) {
          return !(e.editable && !e.hasFocus()) && Ge(e);
        }
        function Ge(e) {
          var t = e.domSelectionRange();
          if (!t.anchorNode) return !1;
          try {
            return (
              e.dom.contains(
                3 == t.anchorNode.nodeType
                  ? t.anchorNode.parentNode
                  : t.anchorNode
              ) &&
              (e.editable ||
                e.dom.contains(
                  3 == t.focusNode.nodeType
                    ? t.focusNode.parentNode
                    : t.focusNode
                ))
            );
          } catch (e) {
            return !1;
          }
        }
        function Ze(e, t) {
          var n = e.selection,
            r = n.$anchor,
            o = n.$head,
            i = t > 0 ? r.max(o) : r.min(o),
            s = i.parent.inlineContent
              ? i.depth
                ? e.doc.resolve(t > 0 ? i.after() : i.before())
                : null
              : i;
          return s && m.Selection.findFrom(s, t);
        }
        function Xe(e, t) {
          return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
        }
        function Ye(e, t, n) {
          var r = e.state.selection;
          if (!(r instanceof m.TextSelection)) {
            if (r instanceof m.NodeSelection && r.node.isInline)
              return Xe(e, new m.TextSelection(t > 0 ? r.$to : r.$from));
            var o = Ze(e.state, t);
            return !!o && Xe(e, o);
          }
          if (!r.empty || n.indexOf("s") > -1) return !1;
          if (e.endOfTextblock(t > 0 ? "right" : "left")) {
            var i = Ze(e.state, t);
            return !!(i && i instanceof m.NodeSelection) && Xe(e, i);
          }
          if (!(_ && n.indexOf("m") > -1)) {
            var s,
              a = r.$head,
              l = a.textOffset ? null : t < 0 ? a.nodeBefore : a.nodeAfter;
            if (!l || l.isText) return !1;
            var c = t < 0 ? a.pos - l.nodeSize : a.pos;
            return (
              !!(l.isAtom || ((s = e.docView.descAt(c)) && !s.contentDOM)) &&
              (m.NodeSelection.isSelectable(l)
                ? Xe(
                    e,
                    new m.NodeSelection(
                      t < 0 ? e.state.doc.resolve(a.pos - l.nodeSize) : a
                    )
                  )
                : !!K &&
                  Xe(
                    e,
                    new m.TextSelection(
                      e.state.doc.resolve(t < 0 ? c : c + l.nodeSize)
                    )
                  ))
            );
          }
        }
        function Qe(e) {
          return 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length;
        }
        function et(e) {
          var t = e.pmViewDesc;
          return t && 0 == t.size && (e.nextSibling || "BR" != e.nodeName);
        }
        function tt(e) {
          var t = e.domSelectionRange(),
            n = t.focusNode,
            r = t.focusOffset;
          if (n) {
            var o,
              i,
              s = !1;
            for (
              $ &&
              1 == n.nodeType &&
              r < Qe(n) &&
              et(n.childNodes[r]) &&
              (s = !0);
              ;

            )
              if (r > 0) {
                if (1 != n.nodeType) break;
                var a = n.childNodes[r - 1];
                if (et(a)) (o = n), (i = --r);
                else {
                  if (3 != a.nodeType) break;
                  r = (n = a).nodeValue.length;
                }
              } else {
                if (rt(n)) break;
                for (var l = n.previousSibling; l && et(l); )
                  (o = n.parentNode), (i = y(l)), (l = l.previousSibling);
                if (l) r = Qe((n = l));
                else {
                  if ((n = n.parentNode) == e.dom) break;
                  r = 0;
                }
              }
            s ? ot(e, n, r) : o && ot(e, o, i);
          }
        }
        function nt(e) {
          var t = e.domSelectionRange(),
            n = t.focusNode,
            r = t.focusOffset;
          if (n) {
            for (var o, i, s = Qe(n); ; )
              if (r < s) {
                if (1 != n.nodeType) break;
                if (!et(n.childNodes[r])) break;
                (o = n), (i = ++r);
              } else {
                if (rt(n)) break;
                for (var a = n.nextSibling; a && et(a); )
                  (o = a.parentNode), (i = y(a) + 1), (a = a.nextSibling);
                if (a) (r = 0), (s = Qe((n = a)));
                else {
                  if ((n = n.parentNode) == e.dom) break;
                  r = s = 0;
                }
              }
            o && ot(e, o, i);
          }
        }
        function rt(e) {
          var t = e.pmViewDesc;
          return t && t.node && t.node.isBlock;
        }
        function ot(e, t, n) {
          var r = e.domSelection();
          if (T(r)) {
            var o = document.createRange();
            o.setEnd(t, n),
              o.setStart(t, n),
              r.removeAllRanges(),
              r.addRange(o);
          } else r.extend && r.extend(t, n);
          e.domObserver.setCurSelection();
          var i = e.state;
          setTimeout(function () {
            e.state == i && $e(e);
          }, 50);
        }
        function it(e, t, n) {
          var r = e.state.selection;
          if ((r instanceof m.TextSelection && !r.empty) || n.indexOf("s") > -1)
            return !1;
          if (_ && n.indexOf("m") > -1) return !1;
          var o = r.$from,
            i = r.$to;
          if (
            !o.parent.inlineContent ||
            e.endOfTextblock(t < 0 ? "up" : "down")
          ) {
            var s = Ze(e.state, t);
            if (s && s instanceof m.NodeSelection) return Xe(e, s);
          }
          if (!o.parent.inlineContent) {
            var a = t < 0 ? o : i,
              l =
                r instanceof m.AllSelection
                  ? m.Selection.near(a, t)
                  : m.Selection.findFrom(a, t);
            return !!l && Xe(e, l);
          }
          return !1;
        }
        function st(e, t) {
          if (!(e.state.selection instanceof m.TextSelection)) return !0;
          var n = e.state.selection,
            r = n.$head,
            o = n.$anchor,
            i = n.empty;
          if (!r.sameParent(o)) return !0;
          if (!i) return !1;
          if (e.endOfTextblock(t > 0 ? "forward" : "backward")) return !0;
          var s = !r.textOffset && (t < 0 ? r.nodeBefore : r.nodeAfter);
          if (s && !s.isText) {
            var a = e.state.tr;
            return (
              t < 0
                ? a.delete(r.pos - s.nodeSize, r.pos)
                : a.delete(r.pos, r.pos + s.nodeSize),
              e.dispatch(a),
              !0
            );
          }
          return !1;
        }
        function at(e, t, n) {
          e.domObserver.stop(), (t.contentEditable = n), e.domObserver.start();
        }
        function lt(e, t) {
          e.someProp("transformCopied", function (n) {
            t = n(t, e);
          });
          for (
            var n = [], r = t, o = r.content, i = r.openStart, s = r.openEnd;
            i > 1 && s > 1 && 1 == o.childCount && 1 == o.firstChild.childCount;

          ) {
            i--, s--;
            var a = o.firstChild;
            n.push(
              a.type.name,
              a.attrs != a.type.defaultAttrs ? a.attrs : null
            ),
              (o = a.content);
          }
          var l =
              e.someProp("clipboardSerializer") ||
              v.DOMSerializer.fromSchema(e.state.schema),
            c = yt(),
            u = c.createElement("div");
          u.appendChild(l.serializeFragment(o, { document: c }));
          for (
            var h, f = u.firstChild, d = 0;
            f && 1 == f.nodeType && (h = vt[f.nodeName.toLowerCase()]);

          ) {
            for (var p = h.length - 1; p >= 0; p--) {
              for (var m = c.createElement(h[p]); u.firstChild; )
                m.appendChild(u.firstChild);
              u.appendChild(m), d++;
            }
            f = u.firstChild;
          }
          return (
            f &&
              1 == f.nodeType &&
              f.setAttribute(
                "data-pm-slice",
                ""
                  .concat(i, " ")
                  .concat(s)
                  .concat(d ? " -".concat(d) : "", " ")
                  .concat(JSON.stringify(n))
              ),
            {
              dom: u,
              text:
                e.someProp("clipboardTextSerializer", function (n) {
                  return n(t, e);
                }) || t.content.textBetween(0, t.content.size, "\n\n"),
            }
          );
        }
        function ct(e, t, n, o, i) {
          var s,
            a,
            l = i.parent.type.spec.code;
          if (!n && !t) return null;
          var c = t && (o || l || !n);
          if (c) {
            if (
              (e.someProp("transformPastedText", function (n) {
                t = n(t, l || o, e);
              }),
              l)
            )
              return t
                ? new v.Slice(
                    v.Fragment.from(
                      e.state.schema.text(t.replace(/\r\n?/g, "\n"))
                    ),
                    0,
                    0
                  )
                : v.Slice.empty;
            var u = e.someProp("clipboardTextParser", function (n) {
              return n(t, i, o, e);
            });
            if (u) a = u;
            else {
              var h = i.marks(),
                f = e.state.schema,
                d = v.DOMSerializer.fromSchema(f);
              (s = document.createElement("div")),
                t.split(/(?:\r\n?|\n)+/).forEach(function (e) {
                  var t = s.appendChild(document.createElement("p"));
                  
                  e && t.appendChild(d.serializeNode(f.text(e, h)));
                });
            }
          } else
            e.someProp("transformPastedHTML", function (t) {
              n = t(n, e);
            }),
              (s = (function (e) {
                var t = /^(\s*<meta [^>]*>)*/.exec(e);
                t && (e = e.slice(t[0].length));
                var n,
                  r = yt().createElement("div"),
                  o = /<([a-z][^>\s]+)/i.exec(e);
                if (
                  ((n = o && vt[o[1].toLowerCase()]) &&
                    (e =
                      n
                        .map(function (e) {
                          return "<" + e + ">";
                        })
                        .join("") +
                      e +
                      n
                        .map(function (e) {
                          return "</" + e + ">";
                        })
                        .reverse()
                        .join("")),
                  (r.innerHTML = e),
                  n)
                )
                  for (var i = 0; i < n.length; i++)
                    r = r.querySelector(n[i]) || r;
                return r;
              })(n)),
              K &&
                (function (e) {
                  for (
                    var t = e.querySelectorAll(
                        j
                          ? "span:not([class]):not([style])"
                          : "span.Apple-converted-space"
                      ),
                      n = 0;
                    n < t.length;
                    n++
                  ) {
                    var r = t[n];
                    1 == r.childNodes.length &&
                      " " == r.textContent &&
                      r.parentNode &&
                      r.parentNode.replaceChild(
                        e.ownerDocument.createTextNode(" "),
                        r
                      );
                  }
                })(s);
          var p = s && s.querySelector("[data-pm-slice]"),
            m =
              p &&
              /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(
                p.getAttribute("data-pm-slice") || ""
              );
          if (m && m[3])
            for (var g = +m[3]; g > 0; g--) {
              for (var y = s.firstChild; y && 1 != y.nodeType; )
                y = y.nextSibling;
              if (!y) break;
              s = y;
            }
          if (!a) {
            var k =
              e.someProp("clipboardParser") ||
              e.someProp("domParser") ||
              v.DOMParser.fromSchema(e.state.schema);
            a = k.parseSlice(s, {
              preserveWhitespace: !(!c && !m),
              context: i,
              ruleFromNode: function (e) {
                return "BR" != e.nodeName ||
                  e.nextSibling ||
                  !e.parentNode ||
                  ut.test(e.parentNode.nodeName)
                  ? null
                  : { ignore: !0 };
              },
            });
          }
          if (m)
            a = (function (e, t) {
              if (!e.size) return e;
              var n,
                r = e.content.firstChild.type.schema;
              try {
                n = JSON.parse(t);
              } catch (t) {
                return e;
              }
              for (
                var o = e.content,
                  i = e.openStart,
                  s = e.openEnd,
                  a = n.length - 2;
                a >= 0;
                a -= 2
              ) {
                var l = r.nodes[n[a]];
                if (!l || l.hasRequiredAttrs()) break;
                (o = v.Fragment.from(l.create(n[a + 1], o))), i++, s++;
              }
              return new v.Slice(o, i, s);
            })(mt(a, +m[1], +m[2]), m[4]);
          else if (
            ((a = v.Slice.maxOpen(
              (function (e, t) {
                if (e.childCount < 2) return e;
                for (
                  var n = function (n) {
                      var r = t.node(n).contentMatchAt(t.index(n)),
                        o = void 0,
                        i = [];
                      if (
                        (e.forEach(function (e) {
                          if (i) {
                            var t,
                              n = r.findWrapping(e.type);
                            if (!n) return (i = null);
                            if (
                              (t =
                                i.length &&
                                o.length &&
                                ft(n, o, e, i[i.length - 1], 0))
                            )
                              i[i.length - 1] = t;
                            else {
                              i.length &&
                                (i[i.length - 1] = dt(
                                  i[i.length - 1],
                                  o.length
                                ));
                              var s = ht(e, n);
                              i.push(s), (r = r.matchType(s.type)), (o = n);
                            }
                          }
                        }),
                        i)
                      )
                        return { v: v.Fragment.from(i) };
                    },
                    o = t.depth;
                  o >= 0;
                  o--
                ) {
                  var i = n(o);
                  if ("object" === r(i)) return i.v;
                }
                return e;
              })(a.content, i),
              !0
            )),
            a.openStart || a.openEnd)
          ) {
            for (
              var w = 0, b = 0, S = a.content.firstChild;
              w < a.openStart && !S.type.spec.isolating;
              w++, S = S.firstChild
            );
            for (
              var x = a.content.lastChild;
              b < a.openEnd && !x.type.spec.isolating;
              b++, x = x.lastChild
            );
            a = mt(a, w, b);
          }
          return (
            e.someProp("transformPasted", function (t) {
              a = t(a, e);
            }),
            a
          );
        }
        var ut =
          /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
        function ht(e, t) {
          for (
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 0,
              r = t.length - 1;
            r >= n;
            r--
          )
            e = t[r].create(null, v.Fragment.from(e));
          return e;
        }
        function ft(e, t, n, r, o) {
          if (o < e.length && o < t.length && e[o] == t[o]) {
            var i = ft(e, t, n, r.lastChild, o + 1);
            if (i) return r.copy(r.content.replaceChild(r.childCount - 1, i));
            if (
              r
                .contentMatchAt(r.childCount)
                .matchType(o == e.length - 1 ? n.type : e[o + 1])
            )
              return r.copy(r.content.append(v.Fragment.from(ht(n, e, o + 1))));
          }
        }
        function dt(e, t) {
          if (0 == t) return e;
          var n = e.content.replaceChild(
              e.childCount - 1,
              dt(e.lastChild, t - 1)
            ),
            r = e.contentMatchAt(e.childCount).fillBefore(v.Fragment.empty, !0);
          return e.copy(n.append(r));
        }
        function pt(e, t, n, r, o, i) {
          var s = t < 0 ? e.firstChild : e.lastChild,
            a = s.content;
          return (
            o < r - 1 && (a = pt(a, t, n, r, o + 1, i)),
            o >= n &&
              (a =
                t < 0
                  ? s
                      .contentMatchAt(0)
                      .fillBefore(a, e.childCount > 1 || i <= o)
                      .append(a)
                  : a.append(
                      s
                        .contentMatchAt(s.childCount)
                        .fillBefore(v.Fragment.empty, !0)
                    )),
            e.replaceChild(t < 0 ? 0 : e.childCount - 1, s.copy(a))
          );
        }
        function mt(e, t, n) {
          return (
            t < e.openStart &&
              (e = new v.Slice(
                pt(e.content, -1, t, e.openStart, 0, e.openEnd),
                t,
                e.openEnd
              )),
            n < e.openEnd &&
              (e = new v.Slice(
                pt(e.content, 1, n, e.openEnd, 0, 0),
                e.openStart,
                n
              )),
            e
          );
        }
        var vt = {
            thead: ["table"],
            tbody: ["table"],
            tfoot: ["table"],
            caption: ["table"],
            colgroup: ["table"],
            col: ["table", "colgroup"],
            tr: ["table", "tbody"],
            td: ["table", "tbody", "tr"],
            th: ["table", "tbody", "tr"],
          },
          gt = null;
        function yt() {
          return (
            gt || (gt = document.implementation.createHTMLDocument("title"))
          );
        }
        var kt = {},
          wt = {},
          bt = { touchstart: !0, touchmove: !0 },
          St = p(function e() {
            f(this, e),
              (this.shiftKey = !1),
              (this.mouseDown = null),
              (this.lastKeyCode = null),
              (this.lastKeyCodeTime = 0),
              (this.lastClick = { time: 0, x: 0, y: 0, type: "" }),
              (this.lastSelectionOrigin = null),
              (this.lastSelectionTime = 0),
              (this.lastIOSEnter = 0),
              (this.lastIOSEnterFallbackTimeout = -1),
              (this.lastFocus = 0),
              (this.lastTouch = 0),
              (this.lastAndroidDelete = 0),
              (this.composing = !1),
              (this.composingTimeout = -1),
              (this.compositionNodes = []),
              (this.compositionEndedAt = -2e8),
              (this.domChangeCount = 0),
              (this.eventHandlers = Object.create(null)),
              (this.hideSelectionGuard = null);
          });
        function xt(e, t) {
          (e.input.lastSelectionOrigin = t),
            (e.input.lastSelectionTime = Date.now());
        }
        function Mt(e) {
          e.someProp("handleDOMEvents", function (t) {
            for (var n in t)
              e.input.eventHandlers[n] ||
                e.dom.addEventListener(
                  n,
                  (e.input.eventHandlers[n] = function (t) {
                    return Ot(e, t);
                  })
                );
          });
        }
        function Ot(e, t) {
          return e.someProp("handleDOMEvents", function (n) {
            var r = n[t.type];
            return !!r && (r(e, t) || t.defaultPrevented);
          });
        }
        function Ct(e) {
          return { left: e.clientX, top: e.clientY };
        }
        function Nt(e, t, n, o, i) {
          if (-1 == o) return !1;
          for (
            var s = e.state.doc.resolve(o),
              a = function (r) {
                if (
                  e.someProp(t, function (t) {
                    return r > s.depth
                      ? t(e, n, s.nodeAfter, s.before(r), i, !0)
                      : t(e, n, s.node(r), s.before(r), i, !1);
                  })
                )
                  return { v: !0 };
              },
              l = s.depth + 1;
            l > 0;
            l--
          ) {
            var c = a(l);
            if ("object" === r(c)) return c.v;
          }
          return !1;
        }
        function Tt(e, t, n) {
          e.focused || e.focus();
          var r = e.state.tr.setSelection(t);
          "pointer" == n && r.setMeta("pointer", !0), e.dispatch(r);
        }
        function Dt(e, t, n, r) {
          return (
            Nt(e, "handleDoubleClickOn", t, n, r) ||
            e.someProp("handleDoubleClick", function (n) {
              return n(e, t, r);
            })
          );
        }
        function Et(e, t, n, r) {
          return (
            Nt(e, "handleTripleClickOn", t, n, r) ||
            e.someProp("handleTripleClick", function (n) {
              return n(e, t, r);
            }) ||
            (function (e, t, n) {
              if (0 != n.button) return !1;
              var r = e.state.doc;
              if (-1 == t)
                return (
                  !!r.inlineContent &&
                  (Tt(
                    e,
                    m.TextSelection.create(r, 0, r.content.size),
                    "pointer"
                  ),
                  !0)
                );
              for (var o = r.resolve(t), i = o.depth + 1; i > 0; i--) {
                var s = i > o.depth ? o.nodeAfter : o.node(i),
                  a = o.before(i);
                if (s.inlineContent)
                  Tt(
                    e,
                    m.TextSelection.create(r, a + 1, a + 1 + s.content.size),
                    "pointer"
                  );
                else {
                  if (!m.NodeSelection.isSelectable(s)) continue;
                  Tt(e, m.NodeSelection.create(r, a), "pointer");
                }
                return !0;
              }
            })(e, n, r)
          );
        }
        function At(e) {
          return $t(e);
        }
        (wt.keydown = function (e, t) {
          var n = t;
          if (
            ((e.input.shiftKey = 16 == n.keyCode || n.shiftKey),
            !It(e, n) &&
              ((e.input.lastKeyCode = n.keyCode),
              (e.input.lastKeyCodeTime = Date.now()),
              !W || !j || 13 != n.keyCode))
          )
            if (
              (229 != n.keyCode && e.domObserver.forceFlush(),
              !J || 13 != n.keyCode || n.ctrlKey || n.altKey || n.metaKey)
            )
              e.someProp("handleKeyDown", function (t) {
                return t(e, n);
              }) ||
              (function (e, t) {
                var n = t.keyCode,
                  r = (function (e) {
                    var t = "";
                    return (
                      e.ctrlKey && (t += "c"),
                      e.metaKey && (t += "m"),
                      e.altKey && (t += "a"),
                      e.shiftKey && (t += "s"),
                      t
                    );
                  })(t);
                return 8 == n || (_ && 72 == n && "c" == r)
                  ? st(e, -1) || tt(e)
                  : 46 == n || (_ && 68 == n && "c" == r)
                  ? st(e, 1) || nt(e)
                  : 13 == n ||
                    27 == n ||
                    (37 == n || (_ && 66 == n && "c" == r)
                      ? Ye(e, -1, r) || tt(e)
                      : 39 == n || (_ && 70 == n && "c" == r)
                      ? Ye(e, 1, r) || nt(e)
                      : 38 == n || (_ && 80 == n && "c" == r)
                      ? it(e, -1, r) || tt(e)
                      : 40 == n || (_ && 78 == n && "c" == r)
                      ? (function (e) {
                          if (!L || e.state.selection.$head.parentOffset > 0)
                            return !1;
                          var t = e.domSelectionRange(),
                            n = t.focusNode,
                            r = t.focusOffset;
                          if (
                            n &&
                            1 == n.nodeType &&
                            0 == r &&
                            n.firstChild &&
                            "false" == n.firstChild.contentEditable
                          ) {
                            var o = n.firstChild;
                            at(e, o, "true"),
                              setTimeout(function () {
                                return at(e, o, "false");
                              }, 20);
                          }
                          return !1;
                        })(e) ||
                        it(e, 1, r) ||
                        nt(e)
                      : r == (_ ? "m" : "c") &&
                        (66 == n || 73 == n || 89 == n || 90 == n));
              })(e, n)
                ? n.preventDefault()
                : xt(e, "key");
            else {
              var r = Date.now();
              (e.input.lastIOSEnter = r),
                (e.input.lastIOSEnterFallbackTimeout = setTimeout(function () {
                  e.input.lastIOSEnter == r &&
                    (e.someProp("handleKeyDown", function (t) {
                      return t(e, D(13, "Enter"));
                    }),
                    (e.input.lastIOSEnter = 0));
                }, 200));
            }
        }),
          (wt.keyup = function (e, t) {
            16 == t.keyCode && (e.input.shiftKey = !1);
          }),
          (wt.keypress = function (e, t) {
            var n = t;
            if (
              !(
                It(e, n) ||
                !n.charCode ||
                (n.ctrlKey && !n.altKey) ||
                (_ && n.metaKey)
              )
            )
              if (
                e.someProp("handleKeyPress", function (t) {
                  return t(e, n);
                })
              )
                n.preventDefault();
              else {
                var r = e.state.selection;
                if (
                  !(r instanceof m.TextSelection && r.$from.sameParent(r.$to))
                ) {
                  var o = String.fromCharCode(n.charCode);
                  /[\r\n]/.test(o) ||
                    e.someProp("handleTextInput", function (t) {
                      return t(e, r.$from.pos, r.$to.pos, o);
                    }) ||
                    e.dispatch(e.state.tr.insertText(o).scrollIntoView()),
                    n.preventDefault();
                }
              }
          });
        var Rt = _ ? "metaKey" : "ctrlKey";
        kt.mousedown = function (e, t) {
          var n = t;
          e.input.shiftKey = n.shiftKey;
          var r = At(e),
            o = Date.now(),
            i = "singleClick";
          o - e.input.lastClick.time < 500 &&
            (function (e, t) {
              var n = t.x - e.clientX,
                r = t.y - e.clientY;
              return n * n + r * r < 100;
            })(n, e.input.lastClick) &&
            !n[Rt] &&
            ("singleClick" == e.input.lastClick.type
              ? (i = "doubleClick")
              : "doubleClick" == e.input.lastClick.type && (i = "tripleClick")),
            (e.input.lastClick = {
              time: o,
              x: n.clientX,
              y: n.clientY,
              type: i,
            });
          var s = e.posAtCoords(Ct(n));
          s &&
            ("singleClick" == i
              ? (e.input.mouseDown && e.input.mouseDown.done(),
                (e.input.mouseDown = new Pt(e, s, n, !!r)))
              : ("doubleClick" == i ? Dt : Et)(e, s.pos, s.inside, n)
              ? n.preventDefault()
              : xt(e, "pointer"));
        };
        var Pt = (function () {
          function e(t, n, r, o) {
            var i,
              s,
              a = this;
            if (
              (f(this, e),
              (this.view = t),
              (this.pos = n),
              (this.event = r),
              (this.flushed = o),
              (this.delayedSelectionSync = !1),
              (this.mightDrag = null),
              (this.startDoc = t.state.doc),
              (this.selectNode = !!r[Rt]),
              (this.allowDefault = r.shiftKey),
              n.inside > -1)
            )
              (i = t.state.doc.nodeAt(n.inside)), (s = n.inside);
            else {
              var l = t.state.doc.resolve(n.pos);
              (i = l.parent), (s = l.depth ? l.before() : 0);
            }
            var c = o ? null : r.target,
              u = c ? t.docView.nearestDesc(c, !0) : null;
            this.target = u ? u.dom : null;
            var h = t.state.selection;
            ((0 == r.button &&
              i.type.spec.draggable &&
              !1 !== i.type.spec.selectable) ||
              (h instanceof m.NodeSelection && h.from <= s && h.to > s)) &&
              (this.mightDrag = {
                node: i,
                pos: s,
                addAttr: !(!this.target || this.target.draggable),
                setUneditable: !(
                  !this.target ||
                  !$ ||
                  this.target.hasAttribute("contentEditable")
                ),
              }),
              this.target &&
                this.mightDrag &&
                (this.mightDrag.addAttr || this.mightDrag.setUneditable) &&
                (this.view.domObserver.stop(),
                this.mightDrag.addAttr && (this.target.draggable = !0),
                this.mightDrag.setUneditable &&
                  setTimeout(function () {
                    a.view.input.mouseDown == a &&
                      a.target.setAttribute("contentEditable", "false");
                  }, 20),
                this.view.domObserver.start()),
              t.root.addEventListener(
                "mouseup",
                (this.up = this.up.bind(this))
              ),
              t.root.addEventListener(
                "mousemove",
                (this.move = this.move.bind(this))
              ),
              xt(t, "pointer");
          }
          return (
            p(e, [
              {
                key: "done",
                value: function () {
                  var e = this;
                  this.view.root.removeEventListener("mouseup", this.up),
                    this.view.root.removeEventListener("mousemove", this.move),
                    this.mightDrag &&
                      this.target &&
                      (this.view.domObserver.stop(),
                      this.mightDrag.addAttr &&
                        this.target.removeAttribute("draggable"),
                      this.mightDrag.setUneditable &&
                        this.target.removeAttribute("contentEditable"),
                      this.view.domObserver.start()),
                    this.delayedSelectionSync &&
                      setTimeout(function () {
                        return $e(e.view);
                      }),
                    (this.view.input.mouseDown = null);
                },
              },
              {
                key: "up",
                value: function (e) {
                  if ((this.done(), this.view.dom.contains(e.target))) {
                    var t = this.pos;
                    this.view.state.doc != this.startDoc &&
                      (t = this.view.posAtCoords(Ct(e))),
                      this.updateAllowDefault(e),
                      this.allowDefault || !t
                        ? xt(this.view, "pointer")
                        : (function (e, t, n, r, o) {
                            return (
                              Nt(e, "handleClickOn", t, n, r) ||
                              e.someProp("handleClick", function (n) {
                                return n(e, t, r);
                              }) ||
                              (o
                                ? (function (e, t) {
                                    if (-1 == t) return !1;
                                    var n,
                                      r,
                                      o = e.state.selection;
                                    o instanceof m.NodeSelection &&
                                      (n = o.node);
                                    for (
                                      var i = e.state.doc.resolve(t),
                                        s = i.depth + 1;
                                      s > 0;
                                      s--
                                    ) {
                                      var a =
                                        s > i.depth ? i.nodeAfter : i.node(s);
                                      if (m.NodeSelection.isSelectable(a)) {
                                        r =
                                          n &&
                                          o.$from.depth > 0 &&
                                          s >= o.$from.depth &&
                                          i.before(o.$from.depth + 1) ==
                                            o.$from.pos
                                            ? i.before(o.$from.depth)
                                            : i.before(s);
                                        break;
                                      }
                                    }
                                    return (
                                      null != r &&
                                      (Tt(
                                        e,
                                        m.NodeSelection.create(e.state.doc, r),
                                        "pointer"
                                      ),
                                      !0)
                                    );
                                  })(e, n)
                                : (function (e, t) {
                                    if (-1 == t) return !1;
                                    var n = e.state.doc.resolve(t),
                                      r = n.nodeAfter;
                                    return (
                                      !!(
                                        r &&
                                        r.isAtom &&
                                        m.NodeSelection.isSelectable(r)
                                      ) &&
                                      (Tt(e, new m.NodeSelection(n), "pointer"),
                                      !0)
                                    );
                                  })(e, n))
                            );
                          })(this.view, t.pos, t.inside, e, this.selectNode)
                        ? e.preventDefault()
                        : 0 == e.button &&
                          (this.flushed ||
                            (L &&
                              this.mightDrag &&
                              !this.mightDrag.node.isAtom) ||
                            (j &&
                              !this.view.state.selection.visible &&
                              Math.min(
                                Math.abs(
                                  t.pos - this.view.state.selection.from
                                ),
                                Math.abs(t.pos - this.view.state.selection.to)
                              ) <= 2))
                        ? (Tt(
                            this.view,
                            m.Selection.near(
                              this.view.state.doc.resolve(t.pos)
                            ),
                            "pointer"
                          ),
                          e.preventDefault())
                        : xt(this.view, "pointer");
                  }
                },
              },
              {
                key: "move",
                value: function (e) {
                  this.updateAllowDefault(e),
                    xt(this.view, "pointer"),
                    0 == e.buttons && this.done();
                },
              },
              {
                key: "updateAllowDefault",
                value: function (e) {
                  !this.allowDefault &&
                    (Math.abs(this.event.x - e.clientX) > 4 ||
                      Math.abs(this.event.y - e.clientY) > 4) &&
                    (this.allowDefault = !0);
                },
              },
            ]),
            e
          );
        })();
        function It(e, t) {
          return (
            !!e.composing ||
            (!!(
              L && Math.abs(t.timeStamp - e.input.compositionEndedAt) < 500
            ) &&
              ((e.input.compositionEndedAt = -2e8), !0))
          );
        }
        (kt.touchstart = function (e) {
          (e.input.lastTouch = Date.now()), At(e), xt(e, "pointer");
        }),
          (kt.touchmove = function (e) {
            (e.input.lastTouch = Date.now()), xt(e, "pointer");
          }),
          (kt.contextmenu = function (e) {
            return At(e);
          });
        var zt = W ? 5e3 : -1;
        function Ft(e, t) {
          clearTimeout(e.input.composingTimeout),
            t > -1 &&
              (e.input.composingTimeout = setTimeout(function () {
                return $t(e);
              }, t));
        }
        function Bt(e) {
          var t;
          for (
            e.composing &&
            ((e.input.composing = !1),
            (e.input.compositionEndedAt =
              ((t = document.createEvent("Event")).initEvent("event", !0, !0),
              t.timeStamp)));
            e.input.compositionNodes.length > 0;

          )
            e.input.compositionNodes.pop().markParentsDirty();
        }
        function $t(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          if (!(W && e.domObserver.flushingSoon >= 0)) {
            if (
              (e.domObserver.forceFlush(),
              Bt(e),
              t || (e.docView && e.docView.dirty))
            ) {
              var n = Fe(e);
              return (
                n && !n.eq(e.state.selection)
                  ? e.dispatch(e.state.tr.setSelection(n))
                  : e.updateState(e.state),
                !0
              );
            }
            return !1;
          }
        }
        (wt.compositionstart = wt.compositionupdate =
          function (e) {
            if (!e.composing) {
              e.domObserver.flush();
              var t = e.state,
                n = t.selection.$from;
              if (
                t.selection.empty &&
                (t.storedMarks ||
                  (!n.textOffset &&
                    n.parentOffset &&
                    n.nodeBefore.marks.some(function (e) {
                      return !1 === e.type.spec.inclusive;
                    })))
              )
                (e.markCursor = e.state.storedMarks || n.marks()),
                  $t(e, !0),
                  (e.markCursor = null);
              else if (
                ($t(e),
                $ &&
                  t.selection.empty &&
                  n.parentOffset &&
                  !n.textOffset &&
                  n.nodeBefore.marks.length)
              )
                for (
                  var r = e.domSelectionRange(),
                    o = r.focusNode,
                    i = r.focusOffset;
                  o && 1 == o.nodeType && 0 != i;

                ) {
                  var s = i < 0 ? o.lastChild : o.childNodes[i - 1];
                  if (!s) break;
                  if (3 == s.nodeType) {
                    e.domSelection().collapse(s, s.nodeValue.length);
                    break;
                  }
                  (o = s), (i = -1);
                }
              e.input.composing = !0;
            }
            Ft(e, zt);
          }),
          (wt.compositionend = function (e, t) {
            e.composing &&
              ((e.input.composing = !1),
              (e.input.compositionEndedAt = t.timeStamp),
              Ft(e, 20));
          });
        var Vt = (F && B < 15) || (J && H < 604);
        function jt(e, t, n, r, o) {
          var i = ct(e, t, n, r, e.state.selection.$from);
          if (
            e.someProp("handlePaste", function (t) {
              return t(e, o, i || v.Slice.empty);
            })
          )
            return !0;
          if (!i) return !1;
          var s = (function (e) {
              return 0 == e.openStart &&
                0 == e.openEnd &&
                1 == e.content.childCount
                ? e.content.firstChild
                : null;
            })(i),
            a = s
              ? e.state.tr.replaceSelectionWith(s, e.input.shiftKey)
              : e.state.tr.replaceSelection(i);
          return (
            e.dispatch(
              a
                .scrollIntoView()
                .setMeta("paste", !0)
                .setMeta("uiEvent", "paste")
            ),
            !0
          );
        }
        (kt.copy = wt.cut =
          function (e, t) {
            var n = t,
              r = e.state.selection,
              o = "cut" == n.type;
            if (!r.empty) {
              var i = Vt ? null : n.clipboardData,
                s = lt(e, r.content()),
                a = s.dom,
                l = s.text;
              i
                ? (n.preventDefault(),
                  i.clearData(),
                  i.setData("text/html", a.innerHTML),
                  i.setData("text/plain", l))
                : (function (e, t) {
                    if (e.dom.parentNode) {
                      var n = e.dom.parentNode.appendChild(
                        document.createElement("div")
                      );
                      n.appendChild(t),
                        (n.style.cssText =
                          "position: fixed; left: -10000px; top: 10px");
                      var r = getSelection(),
                        o = document.createRange();
                      o.selectNodeContents(t),
                        e.dom.blur(),
                        r.removeAllRanges(),
                        r.addRange(o),
                        setTimeout(function () {
                          n.parentNode && n.parentNode.removeChild(n),
                            e.focus();
                        }, 50);
                    }
                  })(e, a),
                o &&
                  e.dispatch(
                    e.state.tr
                      .deleteSelection()
                      .scrollIntoView()
                      .setMeta("uiEvent", "cut")
                  );
            }
          }),
          (wt.paste = function (e, t) {
            var n = t;
            if (!e.composing || W) {
              var r = Vt ? null : n.clipboardData;
              r &&
              jt(
                e,
                r.getData("text/plain"),
                r.getData("text/html"),
                e.input.shiftKey,
                n
              )
                ? n.preventDefault()
                : (function (e, t) {
                    if (e.dom.parentNode) {
                      var n =
                          e.input.shiftKey ||
                          e.state.selection.$from.parent.type.spec.code,
                        r = e.dom.parentNode.appendChild(
                          document.createElement(n ? "textarea" : "div")
                        );
                      n || (r.contentEditable = "true"),
                        (r.style.cssText =
                          "position: fixed; left: -10000px; top: 10px"),
                        r.focus(),
                        setTimeout(function () {
                          e.focus(),
                            r.parentNode && r.parentNode.removeChild(r),
                            n
                              ? jt(e, r.value, null, e.input.shiftKey, t)
                              : jt(
                                  e,
                                  r.textContent,
                                  r.innerHTML,
                                  e.input.shiftKey,
                                  t
                                );
                        }, 50);
                    }
                  })(e, n);
            }
          });
        var qt = p(function e(t, n) {
            f(this, e), (this.slice = t), (this.move = n);
          }),
          Lt = _ ? "altKey" : "ctrlKey";
        for (var Jt in ((kt.dragstart = function (e, t) {
          var n = t,
            r = e.input.mouseDown;
          if ((r && r.done(), n.dataTransfer)) {
            var o = e.state.selection,
              i = o.empty ? null : e.posAtCoords(Ct(n));
            if (
              i &&
              i.pos >= o.from &&
              i.pos <= (o instanceof m.NodeSelection ? o.to - 1 : o.to)
            );
            else if (r && r.mightDrag)
              e.dispatch(
                e.state.tr.setSelection(
                  m.NodeSelection.create(e.state.doc, r.mightDrag.pos)
                )
              );
            else if (n.target && 1 == n.target.nodeType) {
              var s = e.docView.nearestDesc(n.target, !0);
              s &&
                s.node.type.spec.draggable &&
                s != e.docView &&
                e.dispatch(
                  e.state.tr.setSelection(
                    m.NodeSelection.create(e.state.doc, s.posBefore)
                  )
                );
            }
            var a = e.state.selection.content(),
              l = lt(e, a),
              c = l.dom,
              u = l.text;
            n.dataTransfer.clearData(),
              n.dataTransfer.setData(Vt ? "Text" : "text/html", c.innerHTML),
              (n.dataTransfer.effectAllowed = "copyMove"),
              Vt || n.dataTransfer.setData("text/plain", u),
              (e.dragging = new qt(a, !n[Lt]));
          }
        }),
        (kt.dragend = function (e) {
          var t = e.dragging;
          window.setTimeout(function () {
            e.dragging == t && (e.dragging = null);
          }, 50);
        }),
        (wt.dragover = wt.dragenter =
          function (e, t) {
            return t.preventDefault();
          }),
        (wt.drop = function (e, t) {
          var n = t,
            r = e.dragging;
          if (((e.dragging = null), n.dataTransfer)) {
            var o = e.posAtCoords(Ct(n));
            if (o) {
              var i = e.state.doc.resolve(o.pos),
                s = r && r.slice;
              s
                ? e.someProp("transformPasted", function (t) {
                    s = t(s, e);
                  })
                : (s = ct(
                    e,
                    n.dataTransfer.getData(Vt ? "Text" : "text/plain"),
                    Vt ? null : n.dataTransfer.getData("text/html"),
                    !1,
                    i
                  ));
              var a = !(!r || n[Lt]);
              if (
                e.someProp("handleDrop", function (t) {
                  return t(e, n, s || v.Slice.empty, a);
                })
              )
                n.preventDefault();
              else if (s) {
                n.preventDefault();
                var l = s ? g.dropPoint(e.state.doc, i.pos, s) : i.pos;
                null == l && (l = i.pos);
                var c = e.state.tr;
                a && c.deleteSelection();
                var u = c.mapping.map(l),
                  h =
                    0 == s.openStart &&
                    0 == s.openEnd &&
                    1 == s.content.childCount,
                  f = c.doc;
                if (
                  (h
                    ? c.replaceRangeWith(u, u, s.content.firstChild)
                    : c.replaceRange(u, u, s),
                  !c.doc.eq(f))
                ) {
                  var d = c.doc.resolve(u);
                  if (
                    h &&
                    m.NodeSelection.isSelectable(s.content.firstChild) &&
                    d.nodeAfter &&
                    d.nodeAfter.sameMarkup(s.content.firstChild)
                  )
                    c.setSelection(new m.NodeSelection(d));
                  else {
                    var p = c.mapping.map(l);
                    c.mapping.maps[c.mapping.maps.length - 1].forEach(function (
                      e,
                      t,
                      n,
                      r
                    ) {
                      return (p = r);
                    }),
                      c.setSelection(He(e, d, c.doc.resolve(p)));
                  }
                  e.focus(), e.dispatch(c.setMeta("uiEvent", "drop"));
                }
              }
            }
          }
        }),
        (kt.focus = function (e) {
          (e.input.lastFocus = Date.now()),
            e.focused ||
              (e.domObserver.stop(),
              e.dom.classList.add("ProseMirror-focused"),
              e.domObserver.start(),
              (e.focused = !0),
              setTimeout(function () {
                e.docView &&
                  e.hasFocus() &&
                  !e.domObserver.currentSelection.eq(e.domSelectionRange()) &&
                  $e(e);
              }, 20));
        }),
        (kt.blur = function (e, t) {
          var n = t;
          e.focused &&
            (e.domObserver.stop(),
            e.dom.classList.remove("ProseMirror-focused"),
            e.domObserver.start(),
            n.relatedTarget &&
              e.dom.contains(n.relatedTarget) &&
              e.domObserver.currentSelection.clear(),
            (e.focused = !1));
        }),
        (kt.beforeinput = function (e, t) {
          if (j && W && "deleteContentBackward" == t.inputType) {
            e.domObserver.flushSoon();
            var n = e.input.domChangeCount;
            setTimeout(function () {
              if (
                e.input.domChangeCount == n &&
                (e.dom.blur(),
                e.focus(),
                !e.someProp("handleKeyDown", function (t) {
                  return t(e, D(8, "Backspace"));
                }))
              ) {
                var t = e.state.selection.$cursor;
                t &&
                  t.pos > 0 &&
                  e.dispatch(
                    e.state.tr.delete(t.pos - 1, t.pos).scrollIntoView()
                  );
              }
            }, 50);
          }
        }),
        wt))
          kt[Jt] = wt[Jt];
        function _t(e, t) {
          if (e == t) return !0;
          for (var n in e) if (e[n] !== t[n]) return !1;
          for (var r in t) if (!(r in e)) return !1;
          return !0;
        }
        var Wt = (function () {
            function e(t, n) {
              f(this, e),
                (this.toDOM = t),
                (this.spec = n || Zt),
                (this.side = this.spec.side || 0);
            }
            return (
              p(e, [
                {
                  key: "map",
                  value: function (e, t, n, r) {
                    var o = e.mapResult(t.from + r, this.side < 0 ? -1 : 1),
                      i = o.pos;
                    return o.deleted ? null : new Ut(i - n, i - n, this);
                  },
                },
                {
                  key: "valid",
                  value: function () {
                    return !0;
                  },
                },
                {
                  key: "eq",
                  value: function (t) {
                    return (
                      this == t ||
                      (t instanceof e &&
                        ((this.spec.key && this.spec.key == t.spec.key) ||
                          (this.toDOM == t.toDOM && _t(this.spec, t.spec))))
                    );
                  },
                },
                {
                  key: "destroy",
                  value: function (e) {
                    this.spec.destroy && this.spec.destroy(e);
                  },
                },
              ]),
              e
            );
          })(),
          Kt = (function () {
            function e(t, n) {
              f(this, e), (this.attrs = t), (this.spec = n || Zt);
            }
            return (
              p(
                e,
                [
                  {
                    key: "map",
                    value: function (e, t, n, r) {
                      var o =
                          e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) -
                          n,
                        i =
                          e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
                      return o >= i ? null : new Ut(o, i, this);
                    },
                  },
                  {
                    key: "valid",
                    value: function (e, t) {
                      return t.from < t.to;
                    },
                  },
                  {
                    key: "eq",
                    value: function (t) {
                      return (
                        this == t ||
                        (t instanceof e &&
                          _t(this.attrs, t.attrs) &&
                          _t(this.spec, t.spec))
                      );
                    },
                  },
                  { key: "destroy", value: function () {} },
                ],
                [
                  {
                    key: "is",
                    value: function (t) {
                      return t.type instanceof e;
                    },
                  },
                ]
              ),
              e
            );
          })(),
          Ht = (function () {
            function e(t, n) {
              f(this, e), (this.attrs = t), (this.spec = n || Zt);
            }
            return (
              p(e, [
                {
                  key: "map",
                  value: function (e, t, n, r) {
                    var o = e.mapResult(t.from + r, 1);
                    if (o.deleted) return null;
                    var i = e.mapResult(t.to + r, -1);
                    return i.deleted || i.pos <= o.pos
                      ? null
                      : new Ut(o.pos - n, i.pos - n, this);
                  },
                },
                {
                  key: "valid",
                  value: function (e, t) {
                    var n,
                      r = e.content.findIndex(t.from),
                      o = r.index,
                      i = r.offset;
                    return (
                      i == t.from &&
                      !(n = e.child(o)).isText &&
                      i + n.nodeSize == t.to
                    );
                  },
                },
                {
                  key: "eq",
                  value: function (t) {
                    return (
                      this == t ||
                      (t instanceof e &&
                        _t(this.attrs, t.attrs) &&
                        _t(this.spec, t.spec))
                    );
                  },
                },
                { key: "destroy", value: function () {} },
              ]),
              e
            );
          })(),
          Ut = (function () {
            function e(t, n, r) {
              f(this, e), (this.from = t), (this.to = n), (this.type = r);
            }
            return (
              p(
                e,
                [
                  {
                    key: "copy",
                    value: function (t, n) {
                      return new e(t, n, this.type);
                    },
                  },
                  {
                    key: "eq",
                    value: function (e) {
                      var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : 0;
                      return (
                        this.type.eq(e.type) &&
                        this.from + t == e.from &&
                        this.to + t == e.to
                      );
                    },
                  },
                  {
                    key: "map",
                    value: function (e, t, n) {
                      return this.type.map(e, this, t, n);
                    },
                  },
                  {
                    key: "spec",
                    get: function () {
                      return this.type.spec;
                    },
                  },
                  {
                    key: "inline",
                    get: function () {
                      return this.type instanceof Kt;
                    },
                  },
                ],
                [
                  {
                    key: "widget",
                    value: function (t, n, r) {
                      return new e(t, t, new Wt(n, r));
                    },
                  },
                  {
                    key: "inline",
                    value: function (t, n, r, o) {
                      return new e(t, n, new Kt(r, o));
                    },
                  },
                  {
                    key: "node",
                    value: function (t, n, r, o) {
                      return new e(t, n, new Ht(r, o));
                    },
                  },
                ]
              ),
              e
            );
          })(),
          Gt = [],
          Zt = {},
          Xt = (function () {
            function e(t, n) {
              f(this, e),
                (this.local = t.length ? t : Gt),
                (this.children = n.length ? n : Gt);
            }
            return (
              p(
                e,
                [
                  {
                    key: "find",
                    value: function (e, t, n) {
                      var r = [];
                      return (
                        this.findInner(
                          null == e ? 0 : e,
                          null == t ? 1e9 : t,
                          r,
                          0,
                          n
                        ),
                        r
                      );
                    },
                  },
                  {
                    key: "findInner",
                    value: function (e, t, n, r, o) {
                      for (var i = 0; i < this.local.length; i++) {
                        var s = this.local[i];
                        s.from <= t &&
                          s.to >= e &&
                          (!o || o(s.spec)) &&
                          n.push(s.copy(s.from + r, s.to + r));
                      }
                      for (var a = 0; a < this.children.length; a += 3)
                        if (this.children[a] < t && this.children[a + 1] > e) {
                          var l = this.children[a] + 1;
                          this.children[a + 2].findInner(
                            e - l,
                            t - l,
                            n,
                            r + l,
                            o
                          );
                        }
                    },
                  },
                  {
                    key: "map",
                    value: function (e, t, n) {
                      return this == Yt || 0 == e.maps.length
                        ? this
                        : this.mapInner(e, t, 0, 0, n || Zt);
                    },
                  },
                  {
                    key: "mapInner",
                    value: function (t, n, r, o, i) {
                      for (var s, a = 0; a < this.local.length; a++) {
                        var l = this.local[a].map(t, r, o);
                        l && l.type.valid(n, l)
                          ? (s || (s = [])).push(l)
                          : i.onRemove && i.onRemove(this.local[a].spec);
                      }
                      return this.children.length
                        ? en(this.children, s || [], t, n, r, o, i)
                        : s
                        ? new e(s.sort(sn), Gt)
                        : Yt;
                    },
                  },
                  {
                    key: "add",
                    value: function (t, n) {
                      return n.length
                        ? this == Yt
                          ? e.create(t, n)
                          : this.addInner(t, n, 0)
                        : this;
                    },
                  },
                  {
                    key: "addInner",
                    value: function (t, n, r) {
                      var o,
                        i = this,
                        s = 0;
                      t.forEach(function (e, t) {
                        var a,
                          l = t + r;
                        if ((a = nn(n, e, l))) {
                          for (
                            o || (o = i.children.slice());
                            s < o.length && o[s] < t;

                          )
                            s += 3;
                          o[s] == t
                            ? (o[s + 2] = o[s + 2].addInner(e, a, l + 1))
                            : o.splice(
                                s,
                                0,
                                t,
                                t + e.nodeSize,
                                on(a, e, l + 1, Zt)
                              ),
                            (s += 3);
                        }
                      });
                      for (
                        var a = tn(s ? rn(n) : n, -r), l = 0;
                        l < a.length;
                        l++
                      )
                        a[l].type.valid(t, a[l]) || a.splice(l--, 1);
                      return new e(
                        a.length ? this.local.concat(a).sort(sn) : this.local,
                        o || this.children
                      );
                    },
                  },
                  {
                    key: "remove",
                    value: function (e) {
                      return 0 == e.length || this == Yt
                        ? this
                        : this.removeInner(e, 0);
                    },
                  },
                  {
                    key: "removeInner",
                    value: function (t, n) {
                      for (
                        var r = this.children, o = this.local, i = 0;
                        i < r.length;
                        i += 3
                      ) {
                        for (
                          var s,
                            a = void 0,
                            l = r[i] + n,
                            c = r[i + 1] + n,
                            u = 0;
                          u < t.length;
                          u++
                        )
                          (s = t[u]) &&
                            s.from > l &&
                            s.to < c &&
                            ((t[u] = null), (a || (a = [])).push(s));
                        if (a) {
                          r == this.children && (r = this.children.slice());
                          var h = r[i + 2].removeInner(a, l + 1);
                          h != Yt ? (r[i + 2] = h) : (r.splice(i, 3), (i -= 3));
                        }
                      }
                      if (o.length)
                        for (var f, d = 0; d < t.length; d++)
                          if ((f = t[d]))
                            for (var p = 0; p < o.length; p++)
                              o[p].eq(f, n) &&
                                (o == this.local && (o = this.local.slice()),
                                o.splice(p--, 1));
                      return r == this.children && o == this.local
                        ? this
                        : o.length || r.length
                        ? new e(o, r)
                        : Yt;
                    },
                  },
                  {
                    key: "forChild",
                    value: function (t, n) {
                      if (this == Yt) return this;
                      if (n.isLeaf) return e.empty;
                      for (var r, o, i = 0; i < this.children.length; i += 3)
                        if (this.children[i] >= t) {
                          this.children[i] == t && (r = this.children[i + 2]);
                          break;
                        }
                      for (
                        var s = t + 1, a = s + n.content.size, l = 0;
                        l < this.local.length;
                        l++
                      ) {
                        var c = this.local[l];
                        if (c.from < a && c.to > s && c.type instanceof Kt) {
                          var u = Math.max(s, c.from) - s,
                            h = Math.min(a, c.to) - s;
                          u < h && (o || (o = [])).push(c.copy(u, h));
                        }
                      }
                      if (o) {
                        var f = new e(o.sort(sn), Gt);
                        return r ? new Qt([f, r]) : f;
                      }
                      return r || Yt;
                    },
                  },
                  {
                    key: "eq",
                    value: function (t) {
                      if (this == t) return !0;
                      if (
                        !(t instanceof e) ||
                        this.local.length != t.local.length ||
                        this.children.length != t.children.length
                      )
                        return !1;
                      for (var n = 0; n < this.local.length; n++)
                        if (!this.local[n].eq(t.local[n])) return !1;
                      for (var r = 0; r < this.children.length; r += 3)
                        if (
                          this.children[r] != t.children[r] ||
                          this.children[r + 1] != t.children[r + 1] ||
                          !this.children[r + 2].eq(t.children[r + 2])
                        )
                          return !1;
                      return !0;
                    },
                  },
                  {
                    key: "locals",
                    value: function (e) {
                      return an(this.localsInner(e));
                    },
                  },
                  {
                    key: "localsInner",
                    value: function (e) {
                      if (this == Yt) return Gt;
                      if (e.inlineContent || !this.local.some(Kt.is))
                        return this.local;
                      for (var t = [], n = 0; n < this.local.length; n++)
                        this.local[n].type instanceof Kt ||
                          t.push(this.local[n]);
                      return t;
                    },
                  },
                ],
                [
                  {
                    key: "create",
                    value: function (e, t) {
                      return t.length ? on(t, e, 0, Zt) : Yt;
                    },
                  },
                ]
              ),
              e
            );
          })();
        (Xt.empty = new Xt([], [])), (Xt.removeOverlap = an);
        var Yt = Xt.empty,
          Qt = (function () {
            function e(t) {
              f(this, e), (this.members = t);
            }
            return (
              p(
                e,
                [
                  {
                    key: "map",
                    value: function (t, n) {
                      var r = this.members.map(function (e) {
                        return e.map(t, n, Zt);
                      });
                      return e.from(r);
                    },
                  },
                  {
                    key: "forChild",
                    value: function (t, n) {
                      if (n.isLeaf) return Xt.empty;
                      for (var r = [], o = 0; o < this.members.length; o++) {
                        var i = this.members[o].forChild(t, n);
                        i != Yt &&
                          (i instanceof e
                            ? (r = r.concat(i.members))
                            : r.push(i));
                      }
                      return e.from(r);
                    },
                  },
                  {
                    key: "eq",
                    value: function (t) {
                      if (
                        !(t instanceof e) ||
                        t.members.length != this.members.length
                      )
                        return !1;
                      for (var n = 0; n < this.members.length; n++)
                        if (!this.members[n].eq(t.members[n])) return !1;
                      return !0;
                    },
                  },
                  {
                    key: "locals",
                    value: function (e) {
                      for (var t, n = !0, r = 0; r < this.members.length; r++) {
                        var o = this.members[r].localsInner(e);
                        if (o.length)
                          if (t) {
                            n && ((t = t.slice()), (n = !1));
                            for (var i = 0; i < o.length; i++) t.push(o[i]);
                          } else t = o;
                      }
                      return t ? an(n ? t : t.sort(sn)) : Gt;
                    },
                  },
                ],
                [
                  {
                    key: "from",
                    value: function (t) {
                      switch (t.length) {
                        case 0:
                          return Yt;
                        case 1:
                          return t[0];
                        default:
                          return new e(
                            t.every(function (e) {
                              return e instanceof Xt;
                            })
                              ? t
                              : t.reduce(function (e, t) {
                                  return e.concat(
                                    t instanceof Xt ? t : t.members
                                  );
                                }, [])
                          );
                      }
                    },
                  },
                ]
              ),
              e
            );
          })();
        function en(e, t, n, r, o, i, s) {
          for (
            var a = e.slice(),
              l = function (e, t) {
                var r = 0;
                n.maps[e].forEach(function (e, n, i, s) {
                  for (var l = s - i - (n - e), c = 0; c < a.length; c += 3) {
                    var u = a[c + 1];
                    if (!(u < 0 || e > u + t - r)) {
                      var h = a[c] + t - r;
                      n >= h
                        ? (a[c + 1] = e <= h ? -2 : -1)
                        : i >= o && l && ((a[c] += l), (a[c + 1] += l));
                    }
                  }
                  r += l;
                }),
                  (t = n.maps[e].map(t, -1)),
                  (u = t);
              },
              c = 0,
              u = i;
            c < n.maps.length;
            c++
          )
            l(c, u);
          for (var h = !1, f = 0; f < a.length; f += 3)
            if (a[f + 1] < 0) {
              if (-2 == a[f + 1]) {
                (h = !0), (a[f + 1] = -1);
                continue;
              }
              var d = n.map(e[f] + i),
                p = d - o;
              if (p < 0 || p >= r.content.size) {
                h = !0;
                continue;
              }
              var m = n.map(e[f + 1] + i, -1) - o,
                v = r.content.findIndex(p),
                g = v.index,
                y = v.offset,
                k = r.maybeChild(g);
              if (k && y == p && y + k.nodeSize == m) {
                var w = a[f + 2].mapInner(n, k, d + 1, e[f] + i + 1, s);
                w != Yt
                  ? ((a[f] = p), (a[f + 1] = m), (a[f + 2] = w))
                  : ((a[f + 1] = -2), (h = !0));
              } else h = !0;
            }
          if (h) {
            var b = (function (e, t, n, r, o, i, s) {
                function a(e, t) {
                  for (var i = 0; i < e.local.length; i++) {
                    var l = e.local[i].map(r, o, t);
                    l ? n.push(l) : s.onRemove && s.onRemove(e.local[i].spec);
                  }
                  for (var c = 0; c < e.children.length; c += 3)
                    a(e.children[c + 2], e.children[c] + t + 1);
                }
                for (var l = 0; l < e.length; l += 3)
                  -1 == e[l + 1] && a(e[l + 2], t[l] + i + 1);
                return n;
              })(a, e, t, n, o, i, s),
              S = on(b, r, 0, s);
            t = S.local;
            for (var x = 0; x < a.length; x += 3)
              a[x + 1] < 0 && (a.splice(x, 3), (x -= 3));
            for (var M = 0, O = 0; M < S.children.length; M += 3) {
              for (var C = S.children[M]; O < a.length && a[O] < C; ) O += 3;
              a.splice(
                O,
                0,
                S.children[M],
                S.children[M + 1],
                S.children[M + 2]
              );
            }
          }
          return new Xt(t.sort(sn), a);
        }
        function tn(e, t) {
          if (!t || !e.length) return e;
          for (var n = [], r = 0; r < e.length; r++) {
            var o = e[r];
            n.push(new Ut(o.from + t, o.to + t, o.type));
          }
          return n;
        }
        function nn(e, t, n) {
          if (t.isLeaf) return null;
          for (var r, o = n + t.nodeSize, i = null, s = 0; s < e.length; s++)
            (r = e[s]) &&
              r.from > n &&
              r.to < o &&
              ((i || (i = [])).push(r), (e[s] = null));
          return i;
        }
        function rn(e) {
          for (var t = [], n = 0; n < e.length; n++)
            null != e[n] && t.push(e[n]);
          return t;
        }
        function on(e, t, n, r) {
          var o = [],
            i = !1;
          t.forEach(function (t, s) {
            var a = nn(e, t, s + n);
            if (a) {
              i = !0;
              var l = on(a, t, n + s + 1, r);
              l != Yt && o.push(s, s + t.nodeSize, l);
            }
          });
          for (var s = tn(i ? rn(e) : e, -n).sort(sn), a = 0; a < s.length; a++)
            s[a].type.valid(t, s[a]) ||
              (r.onRemove && r.onRemove(s[a].spec), s.splice(a--, 1));
          return s.length || o.length ? new Xt(s, o) : Yt;
        }
        function sn(e, t) {
          return e.from - t.from || e.to - t.to;
        }
        function an(e) {
          for (var t = e, n = 0; n < t.length - 1; n++) {
            var r = t[n];
            if (r.from != r.to)
              for (var o = n + 1; o < t.length; o++) {
                var i = t[o];
                if (i.from != r.from) {
                  i.from < r.to &&
                    (t == e && (t = e.slice()),
                    (t[n] = r.copy(r.from, i.from)),
                    ln(t, o, r.copy(i.from, r.to)));
                  break;
                }
                i.to != r.to &&
                  (t == e && (t = e.slice()),
                  (t[o] = i.copy(i.from, r.to)),
                  ln(t, o + 1, i.copy(r.to, i.to)));
              }
          }
          return t;
        }
        function ln(e, t, n) {
          for (; t < e.length && sn(n, e[t]) > 0; ) t++;
          e.splice(t, 0, n);
        }
        function cn(e) {
          var t = [];
          return (
            e.someProp("decorations", function (n) {
              var r = n(e.state);
              r && r != Yt && t.push(r);
            }),
            e.cursorWrapper &&
              t.push(Xt.create(e.state.doc, [e.cursorWrapper.deco])),
            Qt.from(t)
          );
        }
        var un = {
            childList: !0,
            characterData: !0,
            characterDataOldValue: !0,
            attributes: !0,
            attributeOldValue: !0,
            subtree: !0,
          },
          hn = F && B <= 11,
          fn = (function () {
            function e() {
              f(this, e),
                (this.anchorNode = null),
                (this.anchorOffset = 0),
                (this.focusNode = null),
                (this.focusOffset = 0);
            }
            return (
              p(e, [
                {
                  key: "set",
                  value: function (e) {
                    (this.anchorNode = e.anchorNode),
                      (this.anchorOffset = e.anchorOffset),
                      (this.focusNode = e.focusNode),
                      (this.focusOffset = e.focusOffset);
                  },
                },
                {
                  key: "clear",
                  value: function () {
                    this.anchorNode = this.focusNode = null;
                  },
                },
                {
                  key: "eq",
                  value: function (e) {
                    return (
                      e.anchorNode == this.anchorNode &&
                      e.anchorOffset == this.anchorOffset &&
                      e.focusNode == this.focusNode &&
                      e.focusOffset == this.focusOffset
                    );
                  },
                },
              ]),
              e
            );
          })(),
          dn = (function () {
            function e(t, n) {
              var r = this;
              f(this, e),
                (this.view = t),
                (this.handleDOMChange = n),
                (this.queue = []),
                (this.flushingSoon = -1),
                (this.observer = null),
                (this.currentSelection = new fn()),
                (this.onCharData = null),
                (this.suppressingSelectionUpdates = !1),
                (this.observer =
                  window.MutationObserver &&
                  new window.MutationObserver(function (e) {
                    for (var t = 0; t < e.length; t++) r.queue.push(e[t]);
                    F &&
                    B <= 11 &&
                    e.some(function (e) {
                      return (
                        ("childList" == e.type && e.removedNodes.length) ||
                        ("characterData" == e.type &&
                          e.oldValue.length > e.target.nodeValue.length)
                      );
                    })
                      ? r.flushSoon()
                      : r.flush();
                  })),
                hn &&
                  (this.onCharData = function (e) {
                    r.queue.push({
                      target: e.target,
                      type: "characterData",
                      oldValue: e.prevValue,
                    }),
                      r.flushSoon();
                  }),
                (this.onSelectionChange = this.onSelectionChange.bind(this));
            }
            return (
              p(e, [
                {
                  key: "flushSoon",
                  value: function () {
                    var e = this;
                    this.flushingSoon < 0 &&
                      (this.flushingSoon = window.setTimeout(function () {
                        (e.flushingSoon = -1), e.flush();
                      }, 20));
                  },
                },
                {
                  key: "forceFlush",
                  value: function () {
                    this.flushingSoon > -1 &&
                      (window.clearTimeout(this.flushingSoon),
                      (this.flushingSoon = -1),
                      this.flush());
                  },
                },
                {
                  key: "start",
                  value: function () {
                    this.observer &&
                      (this.observer.takeRecords(),
                      this.observer.observe(this.view.dom, un)),
                      this.onCharData &&
                        this.view.dom.addEventListener(
                          "DOMCharacterDataModified",
                          this.onCharData
                        ),
                      this.connectSelection();
                  },
                },
                {
                  key: "stop",
                  value: function () {
                    var e = this;
                    if (this.observer) {
                      var t = this.observer.takeRecords();
                      if (t.length) {
                        for (var n = 0; n < t.length; n++)
                          this.queue.push(t[n]);
                        window.setTimeout(function () {
                          return e.flush();
                        }, 20);
                      }
                      this.observer.disconnect();
                    }
                    this.onCharData &&
                      this.view.dom.removeEventListener(
                        "DOMCharacterDataModified",
                        this.onCharData
                      ),
                      this.disconnectSelection();
                  },
                },
                {
                  key: "connectSelection",
                  value: function () {
                    this.view.dom.ownerDocument.addEventListener(
                      "selectionchange",
                      this.onSelectionChange
                    );
                  },
                },
                {
                  key: "disconnectSelection",
                  value: function () {
                    this.view.dom.ownerDocument.removeEventListener(
                      "selectionchange",
                      this.onSelectionChange
                    );
                  },
                },
                {
                  key: "suppressSelectionUpdates",
                  value: function () {
                    var e = this;
                    (this.suppressingSelectionUpdates = !0),
                      setTimeout(function () {
                        return (e.suppressingSelectionUpdates = !1);
                      }, 50);
                  },
                },
                {
                  key: "onSelectionChange",
                  value: function () {
                    if (Ue(this.view)) {
                      if (this.suppressingSelectionUpdates)
                        return $e(this.view);
                      if (F && B <= 11 && !this.view.state.selection.empty) {
                        var e = this.view.domSelectionRange();
                        if (
                          e.focusNode &&
                          S(
                            e.focusNode,
                            e.focusOffset,
                            e.anchorNode,
                            e.anchorOffset
                          )
                        )
                          return this.flushSoon();
                      }
                      this.flush();
                    }
                  },
                },
                {
                  key: "setCurSelection",
                  value: function () {
                    this.currentSelection.set(this.view.domSelectionRange());
                  },
                },
                {
                  key: "ignoreSelectionChange",
                  value: function (e) {
                    if (!e.focusNode) return !0;
                    for (var t, n = new Set(), r = e.focusNode; r; r = k(r))
                      n.add(r);
                    for (var o = e.anchorNode; o; o = k(o))
                      if (n.has(o)) {
                        t = o;
                        break;
                      }
                    var i = t && this.view.docView.nearestDesc(t);
                    return i &&
                      i.ignoreMutation({
                        type: "selection",
                        target: 3 == t.nodeType ? t.parentNode : t,
                      })
                      ? (this.setCurSelection(), !0)
                      : void 0;
                  },
                },
                {
                  key: "flush",
                  value: function () {
                    var e = this.view;
                    if (e.docView && !(this.flushingSoon > -1)) {
                      var t = this.observer ? this.observer.takeRecords() : [];
                      this.queue.length &&
                        ((t = this.queue.concat(t)), (this.queue.length = 0));
                      var n = e.domSelectionRange(),
                        r =
                          !this.suppressingSelectionUpdates &&
                          !this.currentSelection.eq(n) &&
                          Ue(e) &&
                          !this.ignoreSelectionChange(n),
                        o = -1,
                        i = -1,
                        s = !1,
                        a = [];
                      if (e.editable)
                        for (var l = 0; l < t.length; l++) {
                          var c = this.registerMutation(t[l], a);
                          c &&
                            ((o = o < 0 ? c.from : Math.min(c.from, o)),
                            (i = i < 0 ? c.to : Math.max(c.to, i)),
                            c.typeOver && (s = !0));
                        }
                      if ($ && a.length > 1) {
                        var u = a.filter(function (e) {
                          return "BR" == e.nodeName;
                        });
                        if (2 == u.length) {
                          var h = u[0],
                            f = u[1];
                          h.parentNode &&
                          h.parentNode.parentNode == f.parentNode
                            ? f.remove()
                            : h.remove();
                        }
                      }
                      var d = null;
                      o < 0 &&
                      r &&
                      e.input.lastFocus > Date.now() - 200 &&
                      e.input.lastTouch < Date.now() - 300 &&
                      T(n) &&
                      (d = Fe(e)) &&
                      d.eq(m.Selection.near(e.state.doc.resolve(0), 1))
                        ? ((e.input.lastFocus = 0),
                          $e(e),
                          this.currentSelection.set(n),
                          e.scrollToSelection())
                        : (o > -1 || r) &&
                          (o > -1 &&
                            (e.docView.markDirty(o, i),
                            (function (e) {
                              if (
                                !pn.has(e) &&
                                (pn.set(e, null),
                                -1 !==
                                  ["normal", "nowrap", "pre-line"].indexOf(
                                    getComputedStyle(e.dom).whiteSpace
                                  ))
                              ) {
                                if (((e.requiresGeckoHackNode = $), mn)) return;
                                console.warn(
                                  "ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."
                                ),
                                  (mn = !0);
                              }
                            })(e)),
                          this.handleDOMChange(o, i, s, a),
                          e.docView && e.docView.dirty
                            ? e.updateState(e.state)
                            : this.currentSelection.eq(n) || $e(e),
                          this.currentSelection.set(n));
                    }
                  },
                },
                {
                  key: "registerMutation",
                  value: function (e, t) {
                    if (t.indexOf(e.target) > -1) return null;
                    var n = this.view.docView.nearestDesc(e.target);
                    if (
                      "attributes" == e.type &&
                      (n == this.view.docView ||
                        "contenteditable" == e.attributeName ||
                        ("style" == e.attributeName &&
                          !e.oldValue &&
                          !e.target.getAttribute("style")))
                    )
                      return null;
                    if (!n || n.ignoreMutation(e)) return null;
                    if ("childList" == e.type) {
                      for (var r = 0; r < e.addedNodes.length; r++)
                        t.push(e.addedNodes[r]);
                      if (
                        n.contentDOM &&
                        n.contentDOM != n.dom &&
                        !n.contentDOM.contains(e.target)
                      )
                        return { from: n.posBefore, to: n.posAfter };
                      var o = e.previousSibling,
                        i = e.nextSibling;
                      if (F && B <= 11 && e.addedNodes.length)
                        for (var s = 0; s < e.addedNodes.length; s++) {
                          var a = e.addedNodes[s],
                            l = a.previousSibling,
                            c = a.nextSibling;
                          (!l ||
                            Array.prototype.indexOf.call(e.addedNodes, l) <
                              0) &&
                            (o = l),
                            (!c ||
                              Array.prototype.indexOf.call(e.addedNodes, c) <
                                0) &&
                              (i = c);
                        }
                      var u = o && o.parentNode == e.target ? y(o) + 1 : 0,
                        h = n.localPosFromDOM(e.target, u, -1),
                        f =
                          i && i.parentNode == e.target
                            ? y(i)
                            : e.target.childNodes.length;
                      return { from: h, to: n.localPosFromDOM(e.target, f, 1) };
                    }
                    return "attributes" == e.type
                      ? {
                          from: n.posAtStart - n.border,
                          to: n.posAtEnd + n.border,
                        }
                      : {
                          from: n.posAtStart,
                          to: n.posAtEnd,
                          typeOver: e.target.nodeValue == e.oldValue,
                        };
                  },
                },
              ]),
              e
            );
          })(),
          pn = new WeakMap(),
          mn = !1;
        function vn(e) {
          var t = e.pmViewDesc;
          if (t) return t.parseRule();
          if ("BR" == e.nodeName && e.parentNode) {
            if (L && /^(ul|ol)$/i.test(e.parentNode.nodeName)) {
              var n = document.createElement("div");
              return n.appendChild(document.createElement("li")), { skip: n };
            }
            if (
              e.parentNode.lastChild == e ||
              (L && /^(tr|table)$/i.test(e.parentNode.nodeName))
            )
              return { ignore: !0 };
          } else if ("IMG" == e.nodeName && e.getAttribute("mark-placeholder"))
            return { ignore: !0 };
          return null;
        }
        function gn(e, t, n) {
          return Math.max(n.anchor, n.head) > t.content.size
            ? null
            : He(e, t.resolve(n.anchor), t.resolve(n.head));
        }
        function yn(e, t, n) {
          for (
            var r = e.depth, o = t ? e.end() : e.pos;
            r > 0 && (t || e.indexAfter(r) == e.node(r).childCount);

          )
            r--, o++, (t = !1);
          if (n)
            for (
              var i = e.node(r).maybeChild(e.indexAfter(r));
              i && !i.isLeaf;

            )
              (i = i.firstChild), o++;
          return o;
        }
        var kn = lt,
          wn = ct,
          bn = $t,
          Sn = (function () {
            function e(t, n) {
              var r = this;
              f(this, e),
                (this._root = null),
                (this.focused = !1),
                (this.trackWrites = null),
                (this.mounted = !1),
                (this.markCursor = null),
                (this.cursorWrapper = null),
                (this.lastSelectedViewDesc = void 0),
                (this.input = new St()),
                (this.prevDirectPlugins = []),
                (this.pluginViews = []),
                (this.requiresGeckoHackNode = !1),
                (this.dragging = null),
                (this._props = n),
                (this.state = n.state),
                (this.directPlugins = n.plugins || []),
                this.directPlugins.forEach(Nn),
                (this.dispatch = this.dispatch.bind(this)),
                (this.dom = (t && t.mount) || document.createElement("div")),
                t &&
                  (t.appendChild
                    ? t.appendChild(this.dom)
                    : "function" == typeof t
                    ? t(this.dom)
                    : t.mount && (this.mounted = !0)),
                (this.editable = On(this)),
                Mn(this),
                (this.nodeViews = Cn(this)),
                (this.docView = we( //aqui crea el dvEditor
                  this.state.doc,
                  xn(this),
                  cn(this),
                  this.dom,
                  this
                )),
                (this.domObserver = new dn(this, function (e, t, n, o) {
                  return (function (e, t, n, r, o) {
                    if (t < 0) {
                      var i =
                          e.input.lastSelectionTime > Date.now() - 50
                            ? e.input.lastSelectionOrigin
                            : null,
                        s = Fe(e, i);
                      if (s && !e.state.selection.eq(s)) {
                        if (
                          j &&
                          W &&
                          13 === e.input.lastKeyCode &&
                          Date.now() - 100 < e.input.lastKeyCodeTime &&
                          e.someProp("handleKeyDown", function (t) {
                            return t(e, D(13, "Enter"));
                          })
                        )
                          return;
                        var a = e.state.tr.setSelection(s);
                        "pointer" == i
                          ? a.setMeta("pointer", !0)
                          : "key" == i && a.scrollIntoView(),
                          e.dispatch(a);
                      }
                    } else {
                      var l = e.state.doc.resolve(t),
                        c = l.sharedDepth(n);
                      (t = l.before(c + 1)),
                        (n = e.state.doc.resolve(n).after(c + 1));
                      var u,
                        h,
                        f = e.state.selection,
                        d = (function (e, t, n) {
                          var r,
                            o = e.docView.parseRange(t, n),
                            i = o.node,
                            s = o.fromOffset,
                            a = o.toOffset,
                            l = o.from,
                            c = o.to,
                            u = e.domSelectionRange(),
                            h = u.anchorNode;
                          if (
                            (h &&
                              e.dom.contains(
                                1 == h.nodeType ? h : h.parentNode
                              ) &&
                              ((r = [{ node: h, offset: u.anchorOffset }]),
                              T(u) ||
                                r.push({
                                  node: u.focusNode,
                                  offset: u.focusOffset,
                                })),
                            j && 8 === e.input.lastKeyCode)
                          )
                            for (var f = a; f > s; f--) {
                              var d = i.childNodes[f - 1],
                                p = d.pmViewDesc;
                              if ("BR" == d.nodeName && !p) {
                                a = f;
                                break;
                              }
                              if (!p || p.size) break;
                            }
                          var m = e.state.doc,
                            g =
                              e.someProp("domParser") ||
                              v.DOMParser.fromSchema(e.state.schema),
                            y = m.resolve(l),
                            k = null,
                            w = g.parse(i, {
                              topNode: y.parent,
                              topMatch: y.parent.contentMatchAt(y.index()),
                              topOpen: !0,
                              from: s,
                              to: a,
                              preserveWhitespace:
                                "pre" != y.parent.type.whitespace || "full",
                              findPositions: r,
                              ruleFromNode: vn,
                              context: y,
                            });
                          if (r && null != r[0].pos) {
                            var b = r[0].pos,
                              S = r[1] && r[1].pos;
                            null == S && (S = b),
                              (k = { anchor: b + l, head: S + l });
                          }
                          return { doc: w, sel: k, from: l, to: c };
                        })(e, t, n),
                        p = e.state.doc,
                        g = p.slice(d.from, d.to);
                      8 === e.input.lastKeyCode &&
                      Date.now() - 100 < e.input.lastKeyCodeTime
                        ? ((u = e.state.selection.to), (h = "end"))
                        : ((u = e.state.selection.from), (h = "start")),
                        (e.input.lastKeyCode = null);
                      var y = (function (e, t, n, r, o) {
                        var i = e.findDiffStart(t, n);
                        if (null == i) return null;
                        var s = e.findDiffEnd(t, n + e.size, n + t.size),
                          a = s.a,
                          l = s.b;
                        return (
                          "end" == o &&
                            (r -= a + Math.max(0, i - Math.min(a, l)) - i),
                          a < i && e.size < t.size
                            ? ((l =
                                (i -= r <= i && r >= a ? i - r : 0) + (l - a)),
                              (a = i))
                            : l < i &&
                              ((a =
                                (i -= r <= i && r >= l ? i - r : 0) + (a - l)),
                              (l = i)),
                          { start: i, endA: a, endB: l }
                        );
                      })(g.content, d.doc.content, d.from, u, h);
                      if (
                        ((J && e.input.lastIOSEnter > Date.now() - 225) || W) &&
                        o.some(function (e) {
                          return (
                            "DIV" == e.nodeName ||
                            "P" == e.nodeName ||
                            "LI" == e.nodeName
                          );
                        }) &&
                        (!y || y.endA >= y.endB) &&
                        e.someProp("handleKeyDown", function (t) {
                          return t(e, D(13, "Enter"));
                        })
                      )
                        e.input.lastIOSEnter = 0;
                      else {
                        if (!y) {
                          if (
                            !(
                              r &&
                              f instanceof m.TextSelection &&
                              !f.empty &&
                              f.$head.sameParent(f.$anchor)
                            ) ||
                            e.composing ||
                            (d.sel && d.sel.anchor != d.sel.head)
                          ) {
                            if (d.sel) {
                              var k = gn(e, e.state.doc, d.sel);
                              k &&
                                !k.eq(e.state.selection) &&
                                e.dispatch(e.state.tr.setSelection(k));
                            }
                            return;
                          }
                          y = { start: f.from, endA: f.to, endB: f.to };
                        }
                        if (
                          j &&
                          e.cursorWrapper &&
                          d.sel &&
                          d.sel.anchor == e.cursorWrapper.deco.from &&
                          d.sel.head == d.sel.anchor
                        ) {
                          var w = y.endB - y.start;
                          d.sel = {
                            anchor: d.sel.anchor + w,
                            head: d.sel.anchor + w,
                          };
                        }
                        e.input.domChangeCount++,
                          e.state.selection.from < e.state.selection.to &&
                            y.start == y.endB &&
                            e.state.selection instanceof m.TextSelection &&
                            (y.start > e.state.selection.from &&
                            y.start <= e.state.selection.from + 2 &&
                            e.state.selection.from >= d.from
                              ? (y.start = e.state.selection.from)
                              : y.endA < e.state.selection.to &&
                                y.endA >= e.state.selection.to - 2 &&
                                e.state.selection.to <= d.to &&
                                ((y.endB += e.state.selection.to - y.endA),
                                (y.endA = e.state.selection.to))),
                          F &&
                            B <= 11 &&
                            y.endB == y.start + 1 &&
                            y.endA == y.start &&
                            y.start > d.from &&
                            "  " ==
                              d.doc.textBetween(
                                y.start - d.from - 1,
                                y.start - d.from + 1
                              ) &&
                            (y.start--, y.endA--, y.endB--);
                        var b,
                          S = d.doc.resolveNoCache(y.start - d.from),
                          x = d.doc.resolveNoCache(y.endB - d.from),
                          M = p.resolve(y.start),
                          O =
                            S.sameParent(x) &&
                            S.parent.inlineContent &&
                            M.end() >= y.endA;
                        if (
                          ((J &&
                            e.input.lastIOSEnter > Date.now() - 225 &&
                            (!O ||
                              o.some(function (e) {
                                return "DIV" == e.nodeName || "P" == e.nodeName;
                              }))) ||
                            (!O &&
                              S.pos < d.doc.content.size &&
                              (b = m.Selection.findFrom(
                                d.doc.resolve(S.pos + 1),
                                1,
                                !0
                              )) &&
                              b.head == x.pos)) &&
                          e.someProp("handleKeyDown", function (t) {
                            return t(e, D(13, "Enter"));
                          })
                        )
                          e.input.lastIOSEnter = 0;
                        else if (
                          e.state.selection.anchor > y.start &&
                          (function (e, t, n, r, o) {
                            if (
                              !r.parent.isTextblock ||
                              n - t <= o.pos - r.pos ||
                              yn(r, !0, !1) < o.pos
                            )
                              return !1;
                            var i = e.resolve(t);
                            if (
                              i.parentOffset < i.parent.content.size ||
                              !i.parent.isTextblock
                            )
                              return !1;
                            var s = e.resolve(yn(i, !0, !0));
                            return (
                              !(
                                !s.parent.isTextblock ||
                                s.pos > n ||
                                yn(s, !0, !1) < n
                              ) &&
                              r.parent.content
                                .cut(r.parentOffset)
                                .eq(s.parent.content)
                            );
                          })(p, y.start, y.endA, S, x) &&
                          e.someProp("handleKeyDown", function (t) {
                            return t(e, D(8, "Backspace"));
                          })
                        )
                          W && j && e.domObserver.suppressSelectionUpdates();
                        else {
                          j &&
                            W &&
                            y.endB == y.start &&
                            (e.input.lastAndroidDelete = Date.now()),
                            W &&
                              !O &&
                              S.start() != x.start() &&
                              0 == x.parentOffset &&
                              S.depth == x.depth &&
                              d.sel &&
                              d.sel.anchor == d.sel.head &&
                              d.sel.head == y.endA &&
                              ((y.endB -= 2),
                              (x = d.doc.resolveNoCache(y.endB - d.from)),
                              setTimeout(function () {
                                e.someProp("handleKeyDown", function (t) {
                                  return t(e, D(13, "Enter"));
                                });
                              }, 20));
                          var C,
                            N,
                            E,
                            A = y.start,
                            R = y.endA;
                          if (O)
                            if (S.pos == x.pos)
                              F &&
                                B <= 11 &&
                                0 == S.parentOffset &&
                                (e.domObserver.suppressSelectionUpdates(),
                                setTimeout(function () {
                                  return $e(e);
                                }, 20)),
                                (C = e.state.tr.delete(A, R)),
                                (N = p
                                  .resolve(y.start)
                                  .marksAcross(p.resolve(y.endA)));
                            else if (
                              y.endA == y.endB &&
                              (E = (function (e, t) {
                                for (
                                  var n,
                                    r,
                                    o,
                                    i = e.firstChild.marks,
                                    s = t.firstChild.marks,
                                    a = i,
                                    l = s,
                                    c = 0;
                                  c < s.length;
                                  c++
                                )
                                  a = s[c].removeFromSet(a);
                                for (var u = 0; u < i.length; u++)
                                  l = i[u].removeFromSet(l);
                                if (1 == a.length && 0 == l.length)
                                  (r = a[0]),
                                    (n = "add"),
                                    (o = function (e) {
                                      return e.mark(r.addToSet(e.marks));
                                    });
                                else {
                                  if (0 != a.length || 1 != l.length)
                                    return null;
                                  (r = l[0]),
                                    (n = "remove"),
                                    (o = function (e) {
                                      return e.mark(r.removeFromSet(e.marks));
                                    });
                                }
                                for (var h = [], f = 0; f < t.childCount; f++)
                                  h.push(o(t.child(f)));
                                if (v.Fragment.from(h).eq(e))
                                  return { mark: r, type: n };
                              })(
                                S.parent.content.cut(
                                  S.parentOffset,
                                  x.parentOffset
                                ),
                                M.parent.content.cut(
                                  M.parentOffset,
                                  y.endA - M.start()
                                )
                              ))
                            )
                              (C = e.state.tr),
                                "add" == E.type
                                  ? C.addMark(A, R, E.mark)
                                  : C.removeMark(A, R, E.mark);
                            else if (
                              S.parent.child(S.index()).isText &&
                              S.index() == x.index() - (x.textOffset ? 0 : 1)
                            ) {
                              var P = S.parent.textBetween(
                                S.parentOffset,
                                x.parentOffset
                              );
                              if (
                                e.someProp("handleTextInput", function (t) {
                                  return t(e, A, R, P);
                                })
                              )
                                return;
                              C = e.state.tr.insertText(P, A, R);
                            }
                          if (
                            (C ||
                              (C = e.state.tr.replace(
                                A,
                                R,
                                d.doc.slice(y.start - d.from, y.endB - d.from)
                              )),
                            d.sel)
                          ) {
                            var I = gn(e, C.doc, d.sel);
                            I &&
                              !(
                                (j &&
                                  W &&
                                  e.composing &&
                                  I.empty &&
                                  (y.start != y.endB ||
                                    e.input.lastAndroidDelete <
                                      Date.now() - 100) &&
                                  (I.head == A ||
                                    I.head == C.mapping.map(R) - 1)) ||
                                (F && I.empty && I.head == A)
                              ) &&
                              C.setSelection(I);
                          }
                          N && C.ensureMarks(N), e.dispatch(C.scrollIntoView());
                        }
                      }
                    }
                  })(r, e, t, n, o);
                })),
                this.domObserver.start(),
                (function (e) {
                  var t = function (t) {
                    var n = kt[t];
                    // console.log(t);
                    e.dom.addEventListener(
                      t,
                      (e.input.eventHandlers[t] = function (t) {
                        oculto.value = ""; //se deja vacio para que no cambie ninguna configuracion del usuario
                        // if(t.target.tagName === "P" || t.target.id.length === 0) t.target.id = "pid";
                        !(function (e, t) {
                          if (!t.bubbles) return !0;
                          if (t.defaultPrevented) return !1;
                          for (var n = t.target; n != e.dom; n = n.parentNode)
                            if (
                              !n ||
                              11 == n.nodeType ||
                              (n.pmViewDesc && n.pmViewDesc.stopEvent(t))
                            )
                              return !1;
                          return !0;
                        })(e, t) ||
                          Ot(e, t) ||
                          (!e.editable && t.type in wt) ||
                          n(e, t);
                      }),
                      bt[t] ? { passive: !0 } : void 0
                    );
                  };
                  for (var n in kt) t(n);
                  L &&
                    e.dom.addEventListener("input", function () {
                      
                      return null;
                    }),
                    Mt(e);
                })(this),
                this.updatePluginViews();
            }
            return (
              p(e, [
                {
                  key: "composing",
                  get: function () {
                    return this.input.composing;
                  },
                },
                {
                  key: "props",
                  get: function () {
                    if (this._props.state != this.state) {
                      var e = this._props;
                      for (var t in ((this._props = {}), e))
                        this._props[t] = e[t];
                      this._props.state = this.state;
                    }
                    return this._props;
                  },
                },
                {
                  key: "update",
                  value: function (e) {
                    e.handleDOMEvents != this._props.handleDOMEvents &&
                      Mt(this);
                    var t = this._props;
                    (this._props = e),
                      e.plugins &&
                        (e.plugins.forEach(Nn),
                        (this.directPlugins = e.plugins)),
                      this.updateStateInner(e.state, t);
                  },
                },
                {
                  key: "setProps",
                  value: function (e) {
                    var t = {};
                    for (var n in this._props) t[n] = this._props[n];
                    for (var r in ((t.state = this.state), e)) t[r] = e[r];
                    this.update(t);
                  },
                },
                {
                  key: "updateState",
                  value: function (e) {
                    this.updateStateInner(e, this._props);
                  },
                },
                {
                  key: "updateStateInner",
                  value: function (e, t) {
                    var n = this.state,
                      r = !1,
                      o = !1;
                    e.storedMarks && this.composing && (Bt(this), (o = !0)),
                      (this.state = e);
                    var i =
                      n.plugins != e.plugins ||
                      this._props.plugins != t.plugins;
                    if (
                      i ||
                      this._props.plugins != t.plugins ||
                      this._props.nodeViews != t.nodeViews
                    ) {
                      var s = Cn(this);
                      (function (e, t) {
                        var n = 0,
                          r = 0;
                        for (var o in e) {
                          if (e[o] != t[o]) return !0;
                          n++;
                        }
                        for (var i in t) r++;
                        return n != r;
                      })(s, this.nodeViews) && ((this.nodeViews = s), (r = !0));
                    }
                    (i || t.handleDOMEvents != this._props.handleDOMEvents) &&
                      Mt(this),
                      (this.editable = On(this)),
                      Mn(this);
                    var a = cn(this),
                      l = xn(this),
                      c =
                        n.plugins == e.plugins || n.doc.eq(e.doc)
                          ? e.scrollToSelection > n.scrollToSelection
                            ? "to selection"
                            : "preserve"
                          : "reset",
                      u = r || !this.docView.matchesNode(e.doc, l, a);
                    (!u && e.selection.eq(n.selection)) || (o = !0);
                    // console.log(l);
                    var h,
                      f,
                      d,
                      p,
                      m,
                      v,
                      g,
                      y,
                      k,
                      w,
                      b =
                        "preserve" == c &&
                        o &&
                        null == this.dom.style.overflowAnchor &&
                        (function (e) {
                          for (
                            var t,
                              n,
                              r = e.dom.getBoundingClientRect(),
                              o = Math.max(0, r.top),
                              i = (r.left + r.right) / 2,
                              s = o + 1;
                            s < Math.min(innerHeight, r.bottom);
                            s += 5
                          ) {
                            var a = e.root.elementFromPoint(i, s);
                            if (a && a != e.dom && e.dom.contains(a)) {
                              var l = a.getBoundingClientRect();
                              if (l.top >= o - 20) {
                                (t = a), (n = l.top);
                                break;
                              }
                            }
                          }
                          return { refDOM: t, refTop: n, stack: Y(e.dom) };
                        })(this);
                    if (o) {
                      this.domObserver.stop();
                      var x =
                        u &&
                        (F || j) &&
                        !this.composing &&
                        !n.selection.empty &&
                        !e.selection.empty &&
                        ((p = n.selection),
                        (m = e.selection),
                        (v = Math.min(
                          p.$anchor.sharedDepth(p.head),
                          m.$anchor.sharedDepth(m.head)
                        )),
                        p.$anchor.start(v) != m.$anchor.start(v));
                      if (u) {
                        var M = j
                          ? (this.trackWrites =
                              this.domSelectionRange().focusNode)
                          : null;
                        (!r && this.docView.update(e.doc, l, a, this)) ||
                          (this.docView.updateOuterDeco([]),
                          this.docView.destroy(),
                          (this.docView = we(e.doc, l, a, this.dom, this))),
                          M && !this.trackWrites && (x = !0);
                      }
                      x ||
                      !(
                        this.input.mouseDown &&
                        this.domObserver.currentSelection.eq(
                          this.domSelectionRange()
                        ) &&
                        ((h = this),
                        (f = h.docView.domFromPos(h.state.selection.anchor, 0)),
                        (d = h.domSelectionRange()),
                        S(f.node, f.offset, d.anchorNode, d.anchorOffset))
                      )
                        ? $e(this, x)
                        : (We(this, e.selection),
                          this.domObserver.setCurSelection()),
                        this.domObserver.start();
                    }
                    this.updatePluginViews(n),
                      "reset" == c
                        ? (this.dom.scrollTop = 0)
                        : "to selection" == c
                        ? this.scrollToSelection()
                        : b &&
                          ((y = (g = b).refDOM),
                          (k = g.refTop),
                          Q(
                            g.stack,
                            0 == (w = y ? y.getBoundingClientRect().top : 0)
                              ? 0
                              : w - k
                          ));
                  },
                },
                {
                  key: "scrollToSelection",
                  value: function () {
                    var e = this,
                      t = this.domSelectionRange().focusNode;
                    if (
                      this.someProp("handleScrollToSelection", function (t) {
                        return t(e);
                      })
                    );
                    else if (this.state.selection instanceof m.NodeSelection) {
                      var n = this.docView.domAfterPos(
                        this.state.selection.from
                      );
                      1 == n.nodeType && X(this, n.getBoundingClientRect(), t);
                    } else
                      X(
                        this,
                        this.coordsAtPos(this.state.selection.head, 1),
                        t
                      );
                  },
                },
                {
                  key: "destroyPluginViews",
                  value: function () {
                    for (var e; (e = this.pluginViews.pop()); )
                      e.destroy && e.destroy();
                  },
                },
                {
                  key: "updatePluginViews",
                  value: function (e) {
                    if (
                      e &&
                      e.plugins == this.state.plugins &&
                      this.directPlugins == this.prevDirectPlugins
                    )
                      for (var t = 0; t < this.pluginViews.length; t++) {
                        var n = this.pluginViews[t];
                        n.update && n.update(this, e);
                      }
                    else {
                      (this.prevDirectPlugins = this.directPlugins),
                        this.destroyPluginViews();
                      for (var r = 0; r < this.directPlugins.length; r++) {
                        var o = this.directPlugins[r];
                        o.spec.view && this.pluginViews.push(o.spec.view(this));
                      }
                      for (var i = 0; i < this.state.plugins.length; i++) {
                        var s = this.state.plugins[i];
                        s.spec.view && this.pluginViews.push(s.spec.view(this));
                      }
                    }
                  },
                },
                {
                  key: "someProp",
                  value: function (e, t) {
                    var n,
                      r = this._props && this._props[e];
                    if (null != r && (n = t ? t(r) : r)) return n;
                    for (var o = 0; o < this.directPlugins.length; o++) {
                      var i = this.directPlugins[o].props[e];
                      if (null != i && (n = t ? t(i) : i)) return n;
                    }
                    var s = this.state.plugins;
                    if (s)
                      for (var a = 0; a < s.length; a++) {
                        var l = s[a].props[e];
                        if (null != l && (n = t ? t(l) : l)) return n;
                      }
                  },
                },
                {
                  key: "hasFocus",
                  value: function () {
                    if (F) {
                      var e = this.root.activeElement;
                      if (e == this.dom) return !0;
                      if (!e || !this.dom.contains(e)) return !1;
                      for (; e && this.dom != e && this.dom.contains(e); ) {
                        if ("false" == e.contentEditable) return !1;
                        e = e.parentElement;
                      }
                      return !0;
                    }
                    return this.root.activeElement == this.dom;
                  },
                },
                {
                  key: "focus",
                  value: function () {
                    // console.log("focusid")
                    this.domObserver.stop(),
                      this.editable &&
                        (function (e) {
                          if (e.setActive) return e.setActive();
                          if (ee) return e.focus(ee);
                          var t = Y(e);
                          e.focus(
                            null == ee
                              ? {
                                  get preventScroll() {
                                    return (ee = { preventScroll: !0 }), !0;
                                  },
                                }
                              : void 0
                          ),
                            ee || ((ee = !1), Q(t, 0));
                        })(this.dom),
                      $e(this),
                      this.domObserver.start();
                  },
                },
                {
                  key: "root",
                  get: function () {
                    var e = this,
                      t = this._root;
                    if (null == t)
                      for (
                        var n = function (t) {
                            if (9 == t.nodeType || (11 == t.nodeType && t.host))
                              return (
                                t.getSelection ||
                                  (Object.getPrototypeOf(t).getSelection =
                                    function () {
                                      return t.ownerDocument.getSelection();
                                    }),
                                { v: (e._root = t) }
                              );
                          },
                          o = this.dom.parentNode;
                        o;
                        o = o.parentNode
                      ) {
                        var i = n(o);
                        if ("object" === r(i)) return i.v;
                      }
                    return t || document;
                  },
                },
                {
                  key: "posAtCoords",
                  value: function (e) {
                    return oe(this, e);
                  },
                },
                {
                  key: "coordsAtPos",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 1;
                    return ae(this, e, t);
                  },
                },
                {
                  key: "domAtPos",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 0;
                    return this.docView.domFromPos(e, t);
                  },
                },
                {
                  key: "nodeDOM",
                  value: function (e) {
                    var t = this.docView.descAt(e);
                    return t ? t.nodeDOM : null;
                  },
                },
                {
                  key: "posAtDOM",
                  value: function (e, t) {
                    var n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : -1,
                      r = this.docView.posFromDOM(e, t, n);
                    if (null == r)
                      throw new RangeError(
                        "DOM position not inside the editor"
                      );
                    return r;
                  },
                },
                {
                  key: "endOfTextblock",
                  value: function (e, t) {
                    return (function (e, t, n) {
                      return fe == t && de == n
                        ? pe
                        : ((fe = t),
                          (de = n),
                          (pe =
                            "up" == n || "down" == n
                              ? (function (e, t, n) {
                                  var r = t.selection,
                                    o = "up" == n ? r.$from : r.$to;
                                  return ue(e, t, function () {
                                    for (
                                      var t = e.docView.domFromPos(
                                        o.pos,
                                        "up" == n ? -1 : 1
                                      ).node;
                                      ;

                                    ) {
                                      var r = e.docView.nearestDesc(t, !0);
                                      if (!r) break;
                                      if (r.node.isBlock) {
                                        t = r.contentDOM || r.dom;
                                        break;
                                      }
                                      t = r.dom.parentNode;
                                    }
                                    for (
                                      var i = ae(e, o.pos, 1), s = t.firstChild;
                                      s;
                                      s = s.nextSibling
                                    ) {
                                      var a = void 0;
                                      if (1 == s.nodeType)
                                        a = s.getClientRects();
                                      else {
                                        if (3 != s.nodeType) continue;
                                        a = b(
                                          s,
                                          0,
                                          s.nodeValue.length
                                        ).getClientRects();
                                      }
                                      for (var l = 0; l < a.length; l++) {
                                        var c = a[l];
                                        if (
                                          c.bottom > c.top + 1 &&
                                          ("up" == n
                                            ? i.top - c.top >
                                              2 * (c.bottom - i.top)
                                            : c.bottom - i.bottom >
                                              2 * (i.bottom - c.top))
                                        )
                                          return !1;
                                      }
                                    }
                                    return !0;
                                  });
                                })(e, t, n)
                              : (function (e, t, n) {
                                  var r = t.selection.$head;
                                  if (!r.parent.isTextblock) return !1;
                                  var o = r.parentOffset,
                                    i = !o,
                                    s = o == r.parent.content.size,
                                    a = e.domSelection();
                                  return he.test(r.parent.textContent) &&
                                    a.modify
                                    ? ue(e, t, function () {
                                        var t = e.domSelectionRange(),
                                          o = t.focusNode,
                                          i = t.focusOffset,
                                          s = t.anchorNode,
                                          l = t.anchorOffset,
                                          c = a.caretBidiLevel;
                                        a.modify("move", n, "character");
                                        var u = r.depth
                                            ? e.docView.domAfterPos(r.before())
                                            : e.dom,
                                          h = e.domSelectionRange(),
                                          f = h.focusNode,
                                          d = h.focusOffset,
                                          p =
                                            (f &&
                                              !u.contains(
                                                1 == f.nodeType
                                                  ? f
                                                  : f.parentNode
                                              )) ||
                                            (o == f && i == d);
                                        try {
                                          a.collapse(s, l),
                                            o &&
                                              (o != s || i != l) &&
                                              a.extend &&
                                              a.extend(o, i);
                                        } catch (e) {}
                                        return (
                                          null != c && (a.caretBidiLevel = c), p
                                        );
                                      })
                                    : "left" == n || "backward" == n
                                    ? i
                                    : s;
                                })(e, t, n)));
                    })(this, t || this.state, e);
                  },
                },
                {
                  key: "pasteHTML",
                  value: function (e, t) {
                    return jt(
                      this,
                      "",
                      e,
                      !1,
                      t || new ClipboardEvent("paste")
                    );
                  },
                },
                {
                  key: "pasteText",
                  value: function (e, t) {
                    return jt(
                      this,
                      e,
                      null,
                      !0,
                      t || new ClipboardEvent("paste")
                    );
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    this.docView &&
                      ((function (e) {
                        for (var t in (e.domObserver.stop(),
                        e.input.eventHandlers))
                          e.dom.removeEventListener(
                            t,
                            e.input.eventHandlers[t]
                          );
                        clearTimeout(e.input.composingTimeout),
                          clearTimeout(e.input.lastIOSEnterFallbackTimeout);
                      })(this),
                      this.destroyPluginViews(),
                      this.mounted
                        ? (this.docView.update(
                            this.state.doc,
                            [],
                            cn(this),
                            this
                          ),
                          (this.dom.textContent = ""))
                        : this.dom.parentNode &&
                          this.dom.parentNode.removeChild(this.dom),
                      this.docView.destroy(),
                      (this.docView = null));
                  },
                },
                {
                  key: "isDestroyed",
                  get: function () {
                    return null == this.docView;
                  },
                },
                {
                  key: "dispatchEvent",
                  value: function (e) {
                    return (function (e, t) {
                      Ot(e, t) ||
                        !kt[t.type] ||
                        (!e.editable && t.type in wt) ||
                        kt[t.type](e, t);
                    })(this, e);
                  },
                },
                {
                  key: "dispatch",
                  value: function (e) {
                    var t = this._props.dispatchTransaction;
                    t ? t.call(this, e) : this.updateState(this.state.apply(e));
                  },
                },
                {
                  key: "domSelectionRange",
                  value: function () {
                    return L &&
                      11 === this.root.nodeType &&
                      (function (e) {
                        for (var t = e.activeElement; t && t.shadowRoot; )
                          t = t.shadowRoot.activeElement;
                        return t;
                      })(this.dom.ownerDocument) == this.dom
                      ? (function (e) {
                          var t;
                          function n(e) {
                            e.preventDefault(),
                              e.stopImmediatePropagation(),
                              (t = e.getTargetRanges()[0]);
                          }
                          e.dom.addEventListener("beforeinput", n, !0),
                            document.execCommand("indent"),
                            e.dom.removeEventListener("beforeinput", n, !0);
                            
                          var r = t.startContainer,
                            o = t.startOffset,
                            i = t.endContainer,
                            s = t.endOffset,
                            a = e.domAtPos(e.state.selection.anchor);
                          if (S(a.node, a.offset, i, s)) {
                            var l = [i, s, r, o];
                            (r = l[0]), (o = l[1]), (i = l[2]), (s = l[3]);
                          }
                          return {
                            anchorNode: r,
                            anchorOffset: o,
                            focusNode: i,
                            focusOffset: s,
                          };
                        })(this)
                      : this.domSelection();
                  },
                },
                {
                  key: "domSelection",
                  value: function () {
                    return this.root.getSelection();
                  },
                },
              ]),
              e
            );
          })();
        function xn(e, identificador) {
          // if(e.dom.localName == "div" && e.dom.id == "")
          // {
          //   var dvprincipal = e.dom;
          //   console.log(dvprincipal);
          // }
          var t = Object.create(null);
          // console.log(t);
          return (
            (t.id = (identificador == null) ? "dvEditor" : identificador),
            (t.class = "ProseMirror"),
            (t.contenteditable = String(e.editable)),
            (t.translate = "no"),            
            e.someProp("attributes", function (n) {
              if (("function" == typeof n && (n = n(e.state)), n))
                for (var r in n)
                  "class" == r && (t.class += " " + n[r]),
                    "style" == r
                      ? (t.style = (t.style ? t.style + ";" : "") + n[r])
                      : t[r] ||
                        "contenteditable" == r ||
                        "nodeName" == r ||
                        (t[r] = String(n[r]));
            }),
            [Ut.node(0, e.state.doc.content.size, t)]
          );          
        }
        function Mn(e) {
          if (e.markCursor) {
            var t = document.createElement("img");
            (t.className = "ProseMirror-separator"),
              t.setAttribute("mark-placeholder", "true"),
              t.setAttribute("alt", ""),
              (e.cursorWrapper = {
                dom: t,
                deco: Ut.widget(e.state.selection.head, t, {
                  raw: !0,
                  marks: e.markCursor,
                }),
              });
          } else e.cursorWrapper = null;
        }
        function On(e) {
          return !e.someProp("editable", function (t) {
            return !1 === t(e.state);
          });
        }
        function Cn(e) {
          var t = Object.create(null);
          function n(e) {
            for (var n in e)
              Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
          }
          return e.someProp("nodeViews", n), e.someProp("markViews", n), t;
        }
        function Nn(e) {
          if (
            e.spec.state ||
            e.spec.filterTransaction ||
            e.spec.appendTransaction
          )
            throw new RangeError(
              "Plugins passed directly to the view must not have a state component"
            );
        }
        (t.Decoration = Ut),
          (t.DecorationSet = Xt),
          (t.EditorView = Sn),
          (t.__endComposition = bn),
          (t.__parseFromClipboard = wn),
          (t.__serializeForClipboard = kn);
      },
      691: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        for (
          var n = {
              8: "Backspace",
              9: "Tab",
              10: "Enter",
              12: "NumLock",
              13: "Enter",
              16: "Shift",
              17: "Control",
              18: "Alt",
              20: "CapsLock",
              27: "Escape",
              32: " ",
              33: "PageUp",
              34: "PageDown",
              35: "End",
              36: "Home",
              37: "ArrowLeft",
              38: "ArrowUp",
              39: "ArrowRight",
              40: "ArrowDown",
              44: "PrintScreen",
              45: "Insert",
              46: "Delete",
              59: ";",
              61: "=",
              91: "Meta",
              92: "Meta",
              106: "*",
              107: "+",
              108: ",",
              109: "-",
              110: ".",
              111: "/",
              144: "NumLock",
              145: "ScrollLock",
              160: "Shift",
              161: "Shift",
              162: "Control",
              163: "Control",
              164: "Alt",
              165: "Alt",
              173: "-",
              186: ";",
              187: "=",
              188: ",",
              189: "-",
              190: ".",
              191: "/",
              192: "`",
              219: "[",
              220: "\\",
              221: "]",
              222: "'",
            },
            r = {
              48: ")",
              49: "!",
              50: "@",
              51: "#",
              52: "$",
              53: "%",
              54: "^",
              55: "&",
              56: "*",
              57: "(",
              59: ":",
              61: "+",
              173: "_",
              186: ":",
              187: "+",
              188: "<",
              189: "_",
              190: ">",
              191: "?",
              192: "~",
              219: "{",
              220: "|",
              221: "}",
              222: '"',
            },
            o =
              "undefined" != typeof navigator &&
              /Chrome\/(\d+)/.exec(navigator.userAgent),
            i =
              ("undefined" != typeof navigator &&
                /Gecko\/\d+/.test(navigator.userAgent),
              "undefined" != typeof navigator &&
                /Mac/.test(navigator.platform)),
            s =
              "undefined" != typeof navigator &&
              /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(
                navigator.userAgent
              ),
            a = i || (o && +o[1] < 57),
            l = 0;
          l < 10;
          l++
        )
          n[48 + l] = n[96 + l] = String(l);
        for (l = 1; l <= 24; l++) n[l + 111] = "F" + l;
        for (l = 65; l <= 90; l++)
          (n[l] = String.fromCharCode(l + 32)), (r[l] = String.fromCharCode(l));
        for (var c in n) r.hasOwnProperty(c) || (r[c] = n[c]);
        (t.base = n),
          (t.keyName = function (e) {
            var t =
              (!(
                (a && (e.ctrlKey || e.altKey || e.metaKey)) ||
                (s && e.shiftKey && e.key && 1 == e.key.length) ||
                "Unidentified" == e.key
              ) &&
                e.key) ||
              (e.shiftKey ? r : n)[e.keyCode] ||
              e.key ||
              "Unidentified";
            return (
              "Esc" == t && (t = "Escape"),
              "Del" == t && (t = "Delete"),
              "Left" == t && (t = "ArrowLeft"),
              "Up" == t && (t = "ArrowUp"),
              "Right" == t && (t = "ArrowRight"),
              "Down" == t && (t = "ArrowDown"),
              t
            );
          }),
          (t.shift = r);
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = (t[r] = { id: r, exports: {} });
    return e[r](i, i.exports, n), i.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.nc = void 0),
    (() => {
      var e = n(443),
        t = n(190),
        r = n(391),
        o = n(222),
        i = n(750),
        s = n(966),
        a = n(717),
        l = n(141),
        c = n(394),
        u = n(209);
      n(662), n(340), n(611);

      var h = new e.Schema({
          nodes:  (0, a.agregarNodosListas)
                  ((0, i.addTagNodes)((0, i.addMentionNodes)(t.schema.spec.nodes)),
            "paragraph block*",
            "block"
          ),
          marks: (0, u.agregarMarcaTipoFuente)(
            (0, c.agregarMarcaTamanioFuente)(t.schema.spec.marks)
          ),
        }),
        f = (0, s.crearMenu)(h);
      f.unshift(
        (0, l.crearPluginMenciones)
        (creamenciones())        
        // ([
        //   { name: "Jorge Lu", id: 107, email: "jlu@canella.com.gt" },
        //   { name: "Juan Pérez", id: 108, email: "jperez@canella.com.gt" },
        // ])
      );


      var d = r.EditorState.create({ schema: h, plugins: f });
      new o.EditorView(document.body, { state: d });
    })();
})();
