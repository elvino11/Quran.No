import{_ as b,o,c as r,a as t,r as f,b as u,w as x,d as p,v as m,F as d,e as g,t as c,f as C,p as I,g as T,h as V,i as w}from"./index.b757cf8a.js";const S={},q={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-info-circle",viewBox:"0 0 16 16"},L=t("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"},null,-1),A=t("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"},null,-1),N=[L,A];function j(e,a){return o(),r("svg",q,N)}var D=b(S,[["render",j]]);const R={},z={},B={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-book",viewBox:"0 0 16 16"},E=t("path",{d:"M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"},null,-1),G=[E];function M(e,a){return o(),r("svg",B,G)}var U=b(z,[["render",M]]),$="/Quran.No/assets/bismillah.ab602267.png",F="/Quran.No/assets/logo.da9b9095.svg";const H={name:"Surah",components:{IconBook:U,Navbar:R,IconInfo:D},data(){return{no:this.$route.params.no,chapter:null,verses:[],audio_file:null,chapters:[],translations:[],data:[],languages:[],langCode:this.$route.params.langCode,recitations:[],reciId:7,transId:33}},methods:{search(){this.no>=115||this.no<=0?(alert("Surat hanya 1 sampai 114"),this.no=1,this.getVerses(),this.getChapter(),this.getAudio(),this.getTranslation(),this.getData(),this.getLanguage(),this.getRecitation()):(this.getVerses(),this.getChapter(),this.getAudio(),this.getTranslation(),this.getData(),this.getLanguage(),this.getRecitation())},filter(){this.getVerses(),this.getChapter(),this.getAudio(),this.getTranslation(),this.getData(),this.getLanguage(),this.getRecitation()},next(){this.no++,this.no>=115?(alert("Surat hanya 114"),this.no=1,this.getVerses(),this.getChapter(),this.getAudio(),this.getTranslation(),this.getData(),this.getLanguage(),this.getRecitation()):(this.getVerses(),this.getChapter(),this.getAudio(),this.getTranslation(),this.getData(),this.getLanguage(),this.getRecitation())},prev(){this.no--,this.no<=0?(alert("Surat dimulai dari 1"),this.no=114,this.getVerses(),this.getChapter(),this.getAudio(),this.getTranslation(),this.getData(),this.getLanguage(),this.getRecitation()):(this.getVerses(),this.getChapter(),this.getAudio(),this.getTranslation(),this.getData(),this.getLanguage(),this.getRecitation())},async getData(){switch(this.langCode){case"en":this.transId=131;break;case"ur":this.transId=234;break;case"bn":this.transId=161;break;case"tr":this.transId=210;break;case"id":this.transId=33;break;case"es":this.transId=140;break;case"ml":this.transId=224;break;case"fr":this.transId=779;break;case"ja":this.transId=218;break;case"yo":this.transId=125;break;default:this.transId=131}const a=await(await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${this.no}`)).json(),k=await(await fetch(`https://api.quran.com/api/v4/quran/translations/${this.transId}?chapter_number=${this.no}`)).json(),n=await(await fetch(`https://api.quran.com/api/v4/quran/recitations/${this.reciId}?chapter_number=${this.no}`)).json(),h=a.verses.map(function(_,v){return{id:_.id,textArab:_.text_uthmani,key:_.verse_key,translate:k.translations[v].text,audioUrl:n.audio_files[v].url}});this.data=h,console.log(this.data)},async getChapter(){fetch("https://api.quran.com/api/v4/chapters/"+this.no+"?language="+this.langCode,{method:"GET"}).then(e=>{if(e.ok)return e.json()}).then(e=>{this.chapter=e.chapter}),console.log(this.langCode)},async getLanguage(){fetch("https://api.quran.com/api/v4/resources/languages",{method:"GET"}).then(e=>{if(e.ok)return e.json()}).then(e=>{this.languages=e.languages})},async getRecitation(){fetch("https://api.quran.com/api/v4/resources/recitations",{method:"GET"}).then(e=>{if(e)return e.json()}).then(e=>{this.recitations=e.recitations})},async getChapters(){fetch("https://api.quran.com/api/v4/chapters?language=en",{method:"GET"}).then(e=>{if(e.ok)return e.json()}).then(e=>{this.chapters=e.chapters})},async getTranslation(){fetch("https://api.quran.com/api/v4/quran/translations/174?chapter_number="+this.no,{method:"GET"}).then(e=>{if(e.ok)return e.json()}).then(e=>{this.translations=e.translations})},async getVerses(){fetch("https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number="+this.no,{method:"GET"}).then(e=>{if(e.ok)return e.json()}).then(e=>{this.verses=e.verses})},async getAudio(){fetch("https://api.quran.com/api/v4/chapter_recitations/"+this.reciId+"/"+this.no,{method:"GET"}).then(e=>{if(e.ok)return e.json()}).then(e=>{this.audio_file=e.audio_file})}},async getTafsir(){fetch(`https://api.quran.com/api/v4/quran/tafsirs/92?chapter_number=${this.no}&verse_key=1%3A1`)},mounted(){this.getChapter(),this.getVerses(),this.getAudio(),this.getChapters(),this.getTranslation(),this.getData(),this.getLanguage(),this.getRecitation()}},l=e=>(I("data-v-023cb4be"),e=e(),T(),e),Q={class:"navbar"},P={class:"navbar navbar-light bg-light fixed-top"},J={class:"container-fluid"},K=l(()=>t("a",{class:"navbar-brand"}," Quran.No",-1)),O=l(()=>t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasNavbar","aria-controls":"offcanvasNavbar"},[t("span",{class:"navbar-toggler-icon"})],-1)),W={class:"offcanvas offcanvas-end",tabindex:"-1",id:"offcanvasNavbar","aria-labelledby":"offcanvasNavbarLabel"},X=l(()=>t("div",{class:"offcanvas-header"},[t("h5",{class:"offcanvas-title",id:"offcanvasNavbarLabel"},"Settings"),t("button",{type:"button",class:"btn-close text-reset","data-bs-dismiss":"offcanvas","aria-label":"Close"})],-1)),Y={class:"offcanvas-body"},Z={class:"navbar-nav justify-content-end flex-grow-1 pe-3"},tt=l(()=>t("li",{class:"nav-item"},[t("a",{class:"nav-link active","aria-current":"page",href:"/"},"Home")],-1)),et=l(()=>t("li",{class:"nav-title nav-item"}," Language ",-1)),st={class:"nav-item dropdown"},at=["value"],nt=l(()=>t("li",{class:"nav-title nav-item"}," Audio Recitation ",-1)),it={class:"nav-item dropdown"},ot=["value"],rt={class:"list"},ct=["value"],ht=V('<div class="image-surah" align="center" data-v-023cb4be><img src="'+$+'" class="bismillah" data-v-023cb4be></div><div class="up" data-v-023cb4be><a href="#" class="up-icon" data-v-023cb4be><img src="'+F+'" style="width:50px;height:30px;" data-v-023cb4be></a></div>',2),lt={class:"content"},dt={key:0,class:"judul"},ut={style:{color:"white"}},_t={style:{color:"white"}},gt={key:1,class:"text-start"},vt=["src"],pt=w(" Info Surah"),mt=l(()=>t("hr",null,null,-1)),ft={class:"isi"},bt={class:"text-end",style:{color:"white","font-weight":"bold"}},kt=["innerHTML"],xt=["src"],yt={class:"toTafsir"},Ct=w(" Tafisr"),wt={class:"list-down"},It=["value"];function Tt(e,a,y,k,i,n){const h=f("RouterLink"),_=f("IconInfo"),v=f("IconBook");return o(),r(d,null,[t("div",Q,[t("nav",P,[t("div",J,[u(h,{to:{name:"home",params:{langCode:i.langCode}}},{default:x(()=>[K]),_:1},8,["to"]),O,t("div",W,[X,t("div",Y,[t("ul",Z,[tt,et,t("li",st,[p(t("select",{class:"form-select form-select-sm","aria-label":".form-select-sm example","onUpdate:modelValue":a[0]||(a[0]=s=>this.langCode=s)},[(o(!0),r(d,null,g(i.languages,s=>(o(),r("option",{value:s.iso_code},c(s.name),9,at))),256))],512),[[m,this.langCode]])]),nt,t("li",it,[p(t("select",{class:"form-select form-select-sm","aria-label":".form-select-sm example","onUpdate:modelValue":a[1]||(a[1]=s=>this.reciId=s)},[(o(!0),r(d,null,g(i.recitations,s=>(o(),r("option",{value:s.id},c(s.reciter_name),9,ot))),256))],512),[[m,this.reciId]])])]),t("button",{class:"btn btn-success",onClick:a[2]||(a[2]=(...s)=>n.filter&&n.filter(...s))},"Filter")])])])])]),t("div",rt,[t("button",{onClick:a[3]||(a[3]=(...s)=>n.prev&&n.prev(...s)),class:"prev btn btn-danger"},"Prev"),p(t("select",{class:"form form-select form-select-sm-1","onUpdate:modelValue":a[4]||(a[4]=s=>this.no=s)},[(o(!0),r(d,null,g(i.chapters,s=>(o(),r("option",{value:s.id},c(s.id)+". "+c(s.name_complex),9,ct))),256))],512),[[m,this.no]]),t("button",{onClick:a[5]||(a[5]=(...s)=>n.search&&n.search(...s)),class:"search btn btn-success"},"Search"),t("button",{onClick:a[6]||(a[6]=(...s)=>n.next&&n.next(...s)),class:"next btn btn-info"},"Next")]),ht,t("section",lt,[i.chapter?(o(),r("div",dt,[t("h1",ut,c(i.chapter.name_arabic),1),t("h4",_t,c(i.chapter.translated_name.name),1)])):C("",!0),i.audio_file?(o(),r("div",gt,[t("audio",{src:i.audio_file.audio_url,controls:"",class:"audio-utama"},null,8,vt),t("h5",null,[u(h,{to:{name:"info",params:{no:i.no,langCode:i.langCode}}},{default:x(()=>[u(_),pt]),_:1},8,["to"])])])):C("",!0),mt]),t("section",ft,[(o(!0),r(d,null,g(i.data,s=>(o(),r("div",null,[t("h3",bt,c(s.textArab)+" "+c(s.key),1),t("p",{innerHTML:s.translate,class:"text-start",style:{color:"white","font-size":"16px"}},null,8,kt),t("audio",{src:`https://verses.quran.com/${s.audioUrl}`,controls:"",class:"audio"},null,8,xt),t("h6",yt,[u(h,{to:{name:"tafsir",params:{key:s.key,no:i.no}}},{default:x(()=>[u(v),Ct]),_:2},1032,["to"])])]))),256))]),t("div",wt,[t("button",{onClick:a[7]||(a[7]=(...s)=>n.prev&&n.prev(...s)),class:"prev btn btn-danger"},"Prev"),p(t("select",{class:"form form-select form-select-sm-1","onUpdate:modelValue":a[8]||(a[8]=s=>this.no=s)},[(o(!0),r(d,null,g(i.chapters,s=>(o(),r("option",{value:s.id},c(s.id)+". "+c(s.name_complex),9,It))),256))],512),[[m,this.no]]),t("button",{onClick:a[9]||(a[9]=(...s)=>n.search&&n.search(...s)),class:"search btn btn-success"},"Search"),t("button",{onClick:a[10]||(a[10]=(...s)=>n.next&&n.next(...s)),class:"next btn btn-info"},"Next")])],64)}var Vt=b(H,[["render",Tt],["__scopeId","data-v-023cb4be"]]);const St={components:{Surah:Vt}},qt={class:"about"};function Lt(e,a,y,k,i,n){const h=f("Surah");return o(),r("div",qt,[t("main",null,[u(h)])])}var Nt=b(St,[["render",Lt]]);export{Nt as default};