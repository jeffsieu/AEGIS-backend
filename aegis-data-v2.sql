PGDMP                         z            postgres    14.4 (Debian 14.4-1.pgdg110+1)    14.4 =    ;           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            <           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            =           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            >           1262    13757    postgres    DATABASE     \   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE postgres;
             
   flypgadmin    false            ?           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                
   flypgadmin    false    3390            T           1247    17244    enum_Requests_type    TYPE     P   CREATE TYPE public."enum_Requests_type" AS ENUM (
    'Work',
    'Personal'
);
 '   DROP TYPE public."enum_Requests_type";
       public          postgres    false            �            1259    17207    Duties    TABLE       CREATE TABLE public."Duties" (
    id integer NOT NULL,
    date date NOT NULL,
    "memberId" integer,
    "roleInstanceId" integer NOT NULL,
    "scheduleId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Duties";
       public         heap    postgres    false            �            1259    17206    Duties_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Duties_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Duties_id_seq";
       public          postgres    false    218            @           0    0    Duties_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Duties_id_seq" OWNED BY public."Duties".id;
          public          postgres    false    217            �            1259    17165    Members    TABLE     "  CREATE TABLE public."Members" (
    id integer NOT NULL,
    callsign character varying(255) NOT NULL,
    sqn character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Members";
       public         heap    postgres    false            �            1259    17164    Members_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Members_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Members_id_seq";
       public          postgres    false    210            A           0    0    Members_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Members_id_seq" OWNED BY public."Members".id;
          public          postgres    false    209            �            1259    17228    Qualifications    TABLE     �   CREATE TABLE public."Qualifications" (
    "memberId" integer NOT NULL,
    "roleId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 $   DROP TABLE public."Qualifications";
       public         heap    postgres    false            �            1259    17250    Requests    TABLE     p  CREATE TABLE public."Requests" (
    id integer NOT NULL,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    reason character varying(255) NOT NULL,
    "memberId" integer NOT NULL,
    type public."enum_Requests_type" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Requests";
       public         heap    postgres    false    852            �            1259    17249    Requests_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Requests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Requests_id_seq";
       public          postgres    false    221            B           0    0    Requests_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Requests_id_seq" OWNED BY public."Requests".id;
          public          postgres    false    220            �            1259    17185    RoleInstances    TABLE     �   CREATE TABLE public."RoleInstances" (
    id integer NOT NULL,
    "roleId" integer NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."RoleInstances";
       public         heap    postgres    false            �            1259    17184    RoleInstances_id_seq    SEQUENCE     �   CREATE SEQUENCE public."RoleInstances_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."RoleInstances_id_seq";
       public          postgres    false    214            C           0    0    RoleInstances_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."RoleInstances_id_seq" OWNED BY public."RoleInstances".id;
          public          postgres    false    213            �            1259    17176    Roles    TABLE     �   CREATE TABLE public."Roles" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Roles";
       public         heap    postgres    false            �            1259    17175    Roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Roles_id_seq";
       public          postgres    false    212            D           0    0    Roles_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;
          public          postgres    false    211            �            1259    17197 	   Schedules    TABLE     �   CREATE TABLE public."Schedules" (
    id integer NOT NULL,
    "isPublished" boolean DEFAULT false,
    month date NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Schedules";
       public         heap    postgres    false            �            1259    17196    Schedules_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Schedules_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Schedules_id_seq";
       public          postgres    false    216            E           0    0    Schedules_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Schedules_id_seq" OWNED BY public."Schedules".id;
          public          postgres    false    215            �           2604    17210 	   Duties id    DEFAULT     j   ALTER TABLE ONLY public."Duties" ALTER COLUMN id SET DEFAULT nextval('public."Duties_id_seq"'::regclass);
 :   ALTER TABLE public."Duties" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218                       2604    17168 
   Members id    DEFAULT     l   ALTER TABLE ONLY public."Members" ALTER COLUMN id SET DEFAULT nextval('public."Members_id_seq"'::regclass);
 ;   ALTER TABLE public."Members" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            �           2604    17253    Requests id    DEFAULT     n   ALTER TABLE ONLY public."Requests" ALTER COLUMN id SET DEFAULT nextval('public."Requests_id_seq"'::regclass);
 <   ALTER TABLE public."Requests" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    17188    RoleInstances id    DEFAULT     x   ALTER TABLE ONLY public."RoleInstances" ALTER COLUMN id SET DEFAULT nextval('public."RoleInstances_id_seq"'::regclass);
 A   ALTER TABLE public."RoleInstances" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    17179    Roles id    DEFAULT     h   ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);
 9   ALTER TABLE public."Roles" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    17200    Schedules id    DEFAULT     p   ALTER TABLE ONLY public."Schedules" ALTER COLUMN id SET DEFAULT nextval('public."Schedules_id_seq"'::regclass);
 =   ALTER TABLE public."Schedules" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            5          0    17207    Duties 
   TABLE DATA           r   COPY public."Duties" (id, date, "memberId", "roleInstanceId", "scheduleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   ;I       -          0    17165    Members 
   TABLE DATA           V   COPY public."Members" (id, callsign, sqn, type, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   �P       6          0    17228    Qualifications 
   TABLE DATA           Z   COPY public."Qualifications" ("memberId", "roleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   ZS       8          0    17250    Requests 
   TABLE DATA           t   COPY public."Requests" (id, "startDate", "endDate", reason, "memberId", type, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   U       1          0    17185    RoleInstances 
   TABLE DATA           ^   COPY public."RoleInstances" (id, "roleId", description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   )V       /          0    17176    Roles 
   TABLE DATA           E   COPY public."Roles" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   �V       3          0    17197 	   Schedules 
   TABLE DATA           Y   COPY public."Schedules" (id, "isPublished", month, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   	W       F           0    0    Duties_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Duties_id_seq"', 684, true);
          public          postgres    false    217            G           0    0    Members_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Members_id_seq"', 41, true);
          public          postgres    false    209            H           0    0    Requests_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Requests_id_seq"', 14, true);
          public          postgres    false    220            I           0    0    RoleInstances_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."RoleInstances_id_seq"', 8, true);
          public          postgres    false    213            J           0    0    Roles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Roles_id_seq"', 3, true);
          public          postgres    false    211            K           0    0    Schedules_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Schedules_id_seq"', 3, true);
          public          postgres    false    215            �           2606    17212    Duties Duties_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Duties"
    ADD CONSTRAINT "Duties_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Duties" DROP CONSTRAINT "Duties_pkey";
       public            postgres    false    218            �           2606    17174    Members Members_callsign_key 
   CONSTRAINT     _   ALTER TABLE ONLY public."Members"
    ADD CONSTRAINT "Members_callsign_key" UNIQUE (callsign);
 J   ALTER TABLE ONLY public."Members" DROP CONSTRAINT "Members_callsign_key";
       public            postgres    false    210            �           2606    17172    Members Members_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Members"
    ADD CONSTRAINT "Members_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Members" DROP CONSTRAINT "Members_pkey";
       public            postgres    false    210            �           2606    17232 "   Qualifications Qualifications_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Qualifications"
    ADD CONSTRAINT "Qualifications_pkey" PRIMARY KEY ("memberId", "roleId");
 P   ALTER TABLE ONLY public."Qualifications" DROP CONSTRAINT "Qualifications_pkey";
       public            postgres    false    219    219            �           2606    17255    Requests Requests_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Requests"
    ADD CONSTRAINT "Requests_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Requests" DROP CONSTRAINT "Requests_pkey";
       public            postgres    false    221            �           2606    17190     RoleInstances RoleInstances_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."RoleInstances"
    ADD CONSTRAINT "RoleInstances_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."RoleInstances" DROP CONSTRAINT "RoleInstances_pkey";
       public            postgres    false    214            �           2606    17183    Roles Roles_name_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key" UNIQUE (name);
 B   ALTER TABLE ONLY public."Roles" DROP CONSTRAINT "Roles_name_key";
       public            postgres    false    212            �           2606    17181    Roles Roles_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Roles" DROP CONSTRAINT "Roles_pkey";
       public            postgres    false    212            �           2606    17205    Schedules Schedules_month_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Schedules"
    ADD CONSTRAINT "Schedules_month_key" UNIQUE (month);
 K   ALTER TABLE ONLY public."Schedules" DROP CONSTRAINT "Schedules_month_key";
       public            postgres    false    216            �           2606    17203    Schedules Schedules_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Schedules"
    ADD CONSTRAINT "Schedules_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Schedules" DROP CONSTRAINT "Schedules_pkey";
       public            postgres    false    216            �           2606    17213    Duties Duties_memberId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Duties"
    ADD CONSTRAINT "Duties_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES public."Members"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public."Duties" DROP CONSTRAINT "Duties_memberId_fkey";
       public          postgres    false    3209    218    210            �           2606    17218 !   Duties Duties_roleInstanceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Duties"
    ADD CONSTRAINT "Duties_roleInstanceId_fkey" FOREIGN KEY ("roleInstanceId") REFERENCES public."RoleInstances"(id) ON UPDATE CASCADE;
 O   ALTER TABLE ONLY public."Duties" DROP CONSTRAINT "Duties_roleInstanceId_fkey";
       public          postgres    false    214    3215    218            �           2606    17223    Duties Duties_scheduleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Duties"
    ADD CONSTRAINT "Duties_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES public."Schedules"(id) ON UPDATE CASCADE;
 K   ALTER TABLE ONLY public."Duties" DROP CONSTRAINT "Duties_scheduleId_fkey";
       public          postgres    false    216    218    3219            �           2606    17233 +   Qualifications Qualifications_memberId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Qualifications"
    ADD CONSTRAINT "Qualifications_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES public."Members"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public."Qualifications" DROP CONSTRAINT "Qualifications_memberId_fkey";
       public          postgres    false    3209    210    219            �           2606    17238 )   Qualifications Qualifications_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Qualifications"
    ADD CONSTRAINT "Qualifications_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public."Qualifications" DROP CONSTRAINT "Qualifications_roleId_fkey";
       public          postgres    false    219    212    3213            �           2606    17256    Requests Requests_memberId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Requests"
    ADD CONSTRAINT "Requests_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES public."Members"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."Requests" DROP CONSTRAINT "Requests_memberId_fkey";
       public          postgres    false    221    210    3209            �           2606    17191 '   RoleInstances RoleInstances_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RoleInstances"
    ADD CONSTRAINT "RoleInstances_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Roles"(id) ON UPDATE CASCADE;
 U   ALTER TABLE ONLY public."RoleInstances" DROP CONSTRAINT "RoleInstances_roleId_fkey";
       public          postgres    false    214    3213    212            5   ?  x��[K��8\�O�� �Է�2�?�X.:.�@�]ЧX,Rl�� �;��A�G<����+ԟ ?�|��OI?�߹�_�$���\HPJ��.�zA�yi �@�bI��vX|P�,��4v��j��NKՇu]�F�����B�+TR@	�|�Ae@)|L>���'�Z��C]��I���^��+T��'�h�.,[U���BE`剦��%�*L��R�-����ч(?R��O�U�]���L ��;We�k��p�$���@��S�u�Rm8q�	BZ�_�(.��'pb�U�8��@A��êxޥ����*�3�8�,{QД��u#�����ng�˖EQ�A]X C#��aA\X���|�C�]PИN�#�	ڰ��N����.(HC��1�rC=܊������S�T��;�N;T|Xv���}��A��u�ߖ	1,�z�5�W�A!��'|��i�n(${��	�e�H
�O�ƅ��E����^(_$��h	P>��e�ET]y��ЙĜX8�D�?����a�[&��m�{C�]&ҷ]C]:�\K�����P�a���^�J ���%�����L���.�Pԑ��ɻEP�L�=K>,����ջ,�D�#mD�	�<�b��Ϗ�;6���J�m<��L����½&�����O��!�=ԇ��;�P��2�<��C}�>�߲�u�<��]bX h��,�5��}&���~��R0,e^�ʘ.��]b^;��/&���,�$}`�%V��-*1"�j̃�,42�t���X2�˷�NhbNl{-��=jfNl�o�BS�D�7H�Nhe~m7�B�^�\��^��>������"!��w&��O֮�(tk�iWyl��Z�RJ��хڄ���?��a!�B�ӒM񺡬�|\�6�˂�1#V��<����:��J">��
a���Uɹ�B(�P9�ǹa��j4�m�Uޱ.�I\r�������b	�&�{ރ
�~��$ɧ6�j�J^�c($�FIC�OX�%�9���a�W$дM�P��M�m������X;,���Ç-���'M;���w]�z�Q�ӹx��w���u-+��Y��b�@�^7�e5���K��`��xZA�C,�wwhX�J!|�Ӓ9�d׺,�P]v:�eT�k��p?$B�����
,"}�pa��*s�i΋�Սe�J-⾟�6�Mu��߅Pm]iª>!���G���U��%�>��O~y�P�Tʎ�)�%r�c2������G�m���=z���Z׭�pj4|j��g��M��b�|�LE3ə��v�Ѱ��Ne�Yi�TU��f�r�T���X��&s�$��%6�2'OW���R�Ҭmjm���_��vuа�Wg�o��[Rm�}����K*�9��X^��5��e�+]&�ӻ��?�c���Cmg��'ST�e���[�y8/��Z���TT�<5��4ʦ����M������DH&�Ĉ2�ѥ]fI$��ZǴ��P�~y�Ⱦ�kjju�8Ly&��jX�׻�K��p��x%K������8A�$:&3=�:(ũ��Q	?���1:޶�Jz�K�g]l���g3�76�L1~���b�5	)6�Hr#�AAT@R&�;Ym6�&5�w����'���X�c�T�8ǀl���(ˑ��D�X�ɺ����1�҄}�G� Ҕ{�$�=�j3�E_i`)����l�Nndw
��MB����z��"�Rܯ��RIv^�/�P@����ћ��������.��������],��Y��:�����c�NjX�)���Ec7��P4�ں�y�ʬ��
�[�ز�`ܮ2
}AJ��~= S���������      -   �  x���Ko�0����}���%ٽ�]�\�-	:��K�ژ��lȿ��T����N���(��\ӷ�}��l~5[��R^p{��n/9��	�F~�<�P�Uۀ�h�fB�iK@��hKiL��2L�˷�뎞O���_'�3�R�B����fc��& 40k^|]c�f9QW@h�&/w>��aY&8��a
7�z��VfY��sB��;+A�,�%�
�ۼ�U�1Qʤ!�	������e������r�
	��xGg�k�^�B���\�9cJ"��P$�wu--c�Д�Phx<ԴF�p߻S�Ba��k�ح�-�:�Baa���Q�`<�j�B_ѷ�ܭ˪��Ȓ����š/j$b������b�i��"������V�R���ے�)C�!���t�����q5Ց#�Ry��D�R�}����L`Y>�sd�M��4'�Rò�~��ч'LfDa�4�l�r����
���y(]t��/qd�LaUt�ծ�f����f���`Uֱ�6LP�*�v��fc��D6������]��_ ��e<!\����s3���^z#�<�U��2���P%�x��J�R�v�J�s�<�5Y��ʀ0|X�'c"#<��ޡ��ELڀP�ޡ�Eyg�N_�w�*�W�Êxq���cc����*_���6~�L�>U5�[;F�X�-���e���D7��d��'�da      6   �  x���Kn1��)���wΒ��#���"�X�.� ��ny�C��3�g*����DX%����ijP�5��Q�5����M�goy�3�{7�
'̜��qD-0KԪ�i�^O���R:6M��9�����ȼI�je�s�%�9D�ʽ���`��S
n�	{�҂#rD�s;Xr0����+=RkP�E�w�T\�@�/Fk�P�h���3u��U8'��F�0���:"8�r�AUG�p�ʹ�{�h���#���;!Ͱ��b���HK��u�T��
ï���C߈'�p��&��smE�u�T��
W��C-R/�T\������9:%GKEU�T�������RQ�#���5Z.����F玶�������T�Z��"���R�3�Y����g���ɇ� nD7��;x#ʿ#a��׽��?}1}��!&      8     x����j�0�g�)��I�{�۵t��%C(�!����{�ԿA�x0:�|�tP��Z2@�97 �e�B^�lcl�a���>o�4��/�xZַ?��G.F�:|��$IID��E��㺍��E�u_�a*d�#6����^�Y2l����%���X A>�ǻ:�9���:$�h�1����$i���}��D����b8��Ӿ�_�9���c���"FG�J�!������d.IĂ�T"� <�HU��J�.�O�R~,�>�      1   o   x���1� ��=���BE�<�����gp��XA��/-X &fMA�(
�(�3�~"���=����^^��h��'�,����m�\x��8'x������sO/9;�/���P[u      /   Q   x�3�t7Qp��u�4202�50�50U00�20�25�352�60�#�eԏU����V��1��y=#KK�ZaR\1z\\\ �$"�      3   <   x�3�,�4202�50�50D0M̭��M�,�̴P�,����z�&@)�=... ~     